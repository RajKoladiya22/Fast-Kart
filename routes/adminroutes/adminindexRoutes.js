const express = require('express');

const routes = express.Router();
const admincontroller = require('../../controller/admincontroller/admincontroller');

routes.get('/admin',admincontroller.AdminPage);
routes.get('/addproduct',admincontroller.AddProductPage);
routes.get('/addcategory',admincontroller.categoryPage);
routes.get('/addcategorylist',admincontroller.categorylistpage);
routes.get('/deleteData',admincontroller.deleteData);


module.exports=routes;