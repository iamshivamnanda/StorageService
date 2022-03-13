const MONGODB_URI =  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uq80n.mongodb.net/uploadImage?retryWrites=true&w=majority`;



const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');


const app = express();
const { uploadFile, getFileStream } = require('./controllers/s3');

app.set('view engine', 'ejs');
app.set('views', 'views');

const indexController = require('./controllers/index');
const errorController = require('./controllers/error');
const authController = require('./controllers/auth');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null,new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };



app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
  );
app.use(express.static(path.join(__dirname, 'public')));
app.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})
// app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/',indexController.index);
app.get('/uploadimage',indexController.getUploadImage);
app.post('/uploadimage',indexController.postUploadImage);

app.post('/updateimage',indexController.updaeImage);


app.get('/signin',authController.getLogin);
app.post('/signin',authController.postLogin);

app.use(errorController.get404);


mongoose
  .connect(MONGODB_URI,{ useNewUrlParser: true ,useUnifiedTopology: true })
  .then(result => {
    app.listen(process.env.PORT ||3000);
  })
  .catch(err => {
    console.log(err);
  });

