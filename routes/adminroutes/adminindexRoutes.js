const express = require('express');


const routes = express.Router();
const admincontroller = require('../../controller/admincontroller/admincontroller');

//API
routes.get('/categorylist',admincontroller.Viewcategorylist);
routes.get('/subcategory',admincontroller.Viewsubcategory);
routes.get('/product',admincontroller.Viewproduct);

//API CALLING 
routes.get('/categorydata', admincontroller.ViewcategoryPage);
routes.get('/subcategorydata', admincontroller.ViewsubcategoryPage);
routes.get('/productdata', admincontroller.ViewproductPage);

routes.get('/admin',admincontroller.AdminPage);
routes.get('/addproduct',admincontroller.AddProductPage);
routes.get('/product',admincontroller.ProductPage);
routes.get('/addcategory',admincontroller.categoryPage);
routes.get('/addsubcategory',admincontroller.subcategoryPage);
routes.get('/api/subcategories', admincontroller.SelectOptionHendal);

routes.get('/EditData',admincontroller.EditData)



module.exports=routes;