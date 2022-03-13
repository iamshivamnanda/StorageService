const Image = require("../model/Image");
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, getFileStream } = require('./s3')

exports.index = (req, res, next) => {
    Image.find()
        // .select('title price -_id')
        // .populate('userId', 'name')
        .then((images) => {
            // console.log(images);
            res.render("index", {
                pageTitle: "HOME",
                images: images,
            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/error");
        });
};

exports.getUploadImage = (req, res, next) => {
    res.render("uploadImage", {
        pageTitle: "Upload Image",
    });
};

exports.postUploadImage = async (req, res, next) => {
    const label = req.body.label;
    const image = req.file;
    const description = req.body.desc;
    if (!image) {
        res.redirect("/uploadimage");
    }
    const imageUrl = image.path;
    console.log(
        "GOT IMAGE WITH " +
            " LABEL " +
            label +
            "  DESCTIPTION " +
            description +
            "IMAGEURLPATH" +
            imageUrl
    );
    const file = req.file;
    console.log(file);

    // apply filter
    // resize

    const result = await uploadFile(file);
    await unlinkFile(file.path);
    console.log(result);
    const imageCreated = new Image({
        label: label,
        description: description,
        imageUrl: `/images/${result.Key}`,
    });

    imageCreated
        .save()
        .then((result) => {
            console.log("ImageMODAL SAVED");
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/imageupload");
        });
};

exports.updaeImage = (req, res, next) => {
    const label = req.body.label;
    const id = req.body.id;

    const description = req.body.desc;

    Image.findById(id)
        .then((image) => {
            image.label = label;
            image.description = description;
            return image.save().then((result) => {
                console.log("Image Updated!");
                res.redirect("/");
            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/");
        });
};
