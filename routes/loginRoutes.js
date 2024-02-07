const express = require('express');

const routes = express.Router();
const LodinController = require('../controller/loginController');
const passport = require('passport');



routes.get('/',LodinController.loginPage);
routes.get('/signup',LodinController.RegisterPage);
routes.post('/addUser',LodinController.AddUser);
routes.post('/loginUser',passport.authenticate('local',{failureRedirect : '/'}),LodinController.loginUser);
routes.get('/logout',LodinController.LogOut)
//forgot password
routes.get('/forgotpage',LodinController.ForgotPage)
routes.get('/otp',LodinController.OtpPage);
routes.post('/SendOtp',LodinController.SendOtp);
routes.post('/postOtp',LodinController.postOtp)  

routes.get('/index',passport.chekUser,LodinController.IndexPage);

module.exports=routes;