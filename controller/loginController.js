const SignUpModel = require("../models/signupmodel");
const CategoryModel = require("../models/categorymodel");
const Subcategory = require("../models/subcategorymodel");
const nodemailer = require("nodemailer");


const loginPage = async (req, res) => {
  if (res.locals.users) {
    return res.redirect("/index");
  }
  return res.render("login");
};

const RegisterPage = async (req, res) => {
  return res.render("register");
};

const ForgotPage = async (req, res)=>{
    try{
        return res.render('Forgot-Password')
    }catch(err){
        console.log(err);
        return false
    }
}

const OtpPage = async (req, res) => {
  try {
    return res.render("otp");
  } catch (err) {
    console.log(err);
    return false;
  }
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
  return res.redirect("/index");
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

const SendOtp = async (req, res) => {
  try {
    let email = req.body.useremail;
    let checkEmail = await SignUpModel.findOne({ email: email });
    if (checkEmail) {
      let otp = Math.floor(Math.random() * 1000000);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "rwn3developer11@gmail.com",
          pass: "ypvx btil psoi avsd",
        },
      });
      var mailOptions = {
        from: "rwn3developer11@gmail.com",
        to: email,
        subject: `Otp`,
        text: `Dear ${checkEmail.name} Your Otp :- ${otp}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response + otp);
          res.cookie("otp", {
            otp: otp,
            email: email,
          });
          return res.redirect("/otp");
        }
      });
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const postOtp = async (req, res) => {
    try {
        let userOtp = req.body.otp;
        let otpCookie = req.cookies.otp;

        console.log('otpCookie:', otpCookie);

        if (!otpCookie || otpCookie.otp !== userOtp) {
            console.log("Otp is wrong or not provided");
            return res.redirect('back');
        }
        if(userOtp == otpCookie){
            console.log(`OTP Match`);
            res.clearCookie('otp');
            return res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};



const IndexPage = async (req, res) => {
  let subcategories = await Subcategory.find({}).populate("categoryId");
  let category = await CategoryModel.find({}).sort({ lastUpdateTime: -1 });
  return res.render("index", { category, subcategories });
};

module.exports = {
  loginPage,
  RegisterPage,
  AddUser,
  loginUser,
  ForgotPage,
  OtpPage,
  LogOut,
  SendOtp,
  postOtp,

  IndexPage,
};
