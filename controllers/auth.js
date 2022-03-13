exports.getLogin = (req, res, next) => {
    res.render("auth/signin", {
        path: "/signin",
        pageTitle: "SignIn",
    });
};

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.pswd;
    const resEmail = validateEmail(email);
    if(password.length <8){
        return res.redirect('/signin');
    }
    console.log("REGISTERED WITH " + email +"/n"+password);
    res.redirect('/');
    
}