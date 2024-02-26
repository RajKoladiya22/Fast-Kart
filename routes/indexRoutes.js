const express = require('express');

const routes = express.Router();

const pageController = require('../controller/pageController');

routes.get('/index',pageController.HomePage);

module.exports=routes;