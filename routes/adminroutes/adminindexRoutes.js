const express = require('express');


const routes = express.Router();
const admincontroller = require('../../controller/admincontroller/admincontroller');

routes.get('/admin',admincontroller.AdminPage);
routes.get('/addproduct',admincontroller.AddProductPage);
routes.get('/product',admincontroller.ProductPage);
routes.get('/addcategory',admincontroller.categoryPage);
routes.get('/addsubcategory',admincontroller.subcategoryPage);
routes.get('/subcategory',admincontroller.Viewsubcategory);
routes.get('/addcategorylist',admincontroller.categorylistpage);
routes.get('/api/subcategories', admincontroller.SelectOptionHendal);

routes.get('/EditData',admincontroller.EditData)



module.exports=routes;