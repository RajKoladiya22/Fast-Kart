const express = require('express');

const routes = express.Router();
const LodinController = require('../controller/loginController');
const passport = require('passport');

routes.get('/',LodinController.loginPage);
routes.get('/signup',LodinController.RegisterPage);
routes.post('/addUser',LodinController.AddUser);
routes.post('/loginUser',passport.authenticate('local',{failureRedirect : '/'}),LodinController.loginUser);

routes.get('/index',passport.chekUser,LodinController.IndexPage);

module.exports=routes;