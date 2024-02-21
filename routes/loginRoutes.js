const express = require('express');

const routes = express.Router();
const LoginController = require('../controller/loginController');
const passport = require('passport');



routes.get('/',LoginController.loginPage);
routes.get('/signup',LoginController.RegisterPage);
routes.post('/addUser',LoginController.AddUser);
routes.post('/loginUser',passport.authenticate('local',{failureRedirect : '/'}),LoginController.loginUser);
routes.get('/logout',LoginController.LogOut)
//forgot password
routes.get('/forgotpassword',LoginController.ForgotPasswordPage);
routes.post('/SendOtp',LoginController.SendOtp);
routes.get('/otp',LoginController.OtpPage);
routes.post('/postOtp',LoginController.postOtp);
routes.get('/NewPassword',LoginController.NewPasswordPage);
routes.post('/newpassword',LoginController.newpassword);

routes.get('/index',passport.chekUser,LoginController.IndexPage);

module.exports=routes;