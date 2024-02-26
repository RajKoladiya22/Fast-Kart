const SignUpModel = require("../models/signupmodel");
const CategoryModel = require("../models/categorymodel");
const Subcategory = require("../models/subcategorymodel");
const nodemailer = require("nodemailer");
const flash = require('connect-flash'); 


const loginPage = async (req, res) => {
  if (res.locals.users) {
    return res.redirect("/admin");
  }
  return res.render("login",{ msg:req.flash('msg')});
};

const RegisterPage = async (req, res) => {
  return res.render("register");
};

const AddUser = async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    if (password !== cpassword) {
      console.log("Password not match");
      return false;
    }
    let Add = await SignUpModel.create({
      name,
      email,
      password,
      cpassword,
    });
    if (Add) {
      console.log(`User Registered`);
      return res.redirect("/");
    }
  } catch (err) {
    if (err) {
      console.log(err);
      return false;
    }
  }
};

const loginUser = async (req, res) => {
  return res.redirect("/admin");
};

const LogOut = async (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return false;
    }
    console.log(`User Logout`);
    return res.redirect("/");
  });
};

//forgot password
const ForgotPasswordPage = async(req, res)=>{
  try{
    return res.render('ForgotPassword',{msg : req.flash('msg')})
  }catch(err){
    console.log(err);
    return false;
  }
}

const SendOtp = async(req, res)=>{
  try{
    let CheckEmail = await SignUpModel.findOne({email : req.body.useremail});
    if(CheckEmail){
      let otp = Math.floor(Math.random()*10000);

      let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
          user : 'decora.evnt@gmail.com',
          pass : 'qtib rcyz jxkv neeb'
        }
      });

      let mailOptions = {
        from : 'decora.evnt@gmail.com',
        to : req.body.useremail,
        html : `Dear ${CheckEmail.name} Your OTP is : ${otp}`
      };

      transporter.sendMail(mailOptions, async (err)=>{
        if(err){
          console.log(err);
          return res.status(500).send('Failed to send OTP email');
        }
        req.flash('msg',`OTP Sent on ${CheckEmail.email}`);
        res.cookie('otp',{
          otp : otp,
          email : req.body.useremail
        },{maxAge: 900000, httpOnly: true});
        console.log('OTP cookie set successfully');
        return res.redirect('/otp')
      })

    }
  }catch(err){
    console.log(err);
    return false;
  }
}

const OtpPage = async (req, res) => {
  try {
    //let email = res.cookie.face;
    return res.render("otp" ,{msg : req.flash('msg')});
  } catch (err) {
    console.log(err);
    return false;
  }
};

const postOtp = async(req, res)=>{
  try{
    let userOtp = req.body.otp;
    if(req.cookies.otp.otp == userOtp){
      return res.redirect('/newpassword')
    }
  }catch(err){
    console.log(err);
    return false;
  }
}

const NewPasswordPage = async(req, res)=>{
  try{
    return res.render('NewPassword',{msg : req.flash('msg')})
  }catch(err){
    console.log(err);
    return false;
  }
}

const newpassword = async(req, res)=>{
  try{
      const password = req.body.password;
      const cpassword = req.body.cpassword;

      if(password == cpassword){
        let Up = await SignUpModel.findOneAndUpdate({ email: req.cookies.otp.email }, {
          password: password
        });

        if(Up){
          req.flash('msg', `Password Updated !!`);
          return res.redirect('/');
        }
      }else{
        req.flash('msg', `Passwords do not match !!`);
        return res.redirect('back')
      }
  }catch(err){
    console.log(err);
    return false;
  }
}

const adminindexPage = async (req, res) => {
  let subcategories = await Subcategory.find({}).populate("categoryId");
  let category = await CategoryModel.find({}).sort({ lastUpdateTime: -1 });
  return res.render("admin/adminindex", { category, subcategories });
};

module.exports = {
  loginPage,
  RegisterPage,
  AddUser,
  loginUser,
  LogOut,
  //forgot password
  ForgotPasswordPage,
  SendOtp,
  OtpPage,
  postOtp,
  NewPasswordPage,
  newpassword,

  adminindexPage,
};
