const express = require('express');


const routes = express.Router();
const admincontroller = require('../../controller/admincontroller/admincontroller');

routes.get('/admin',admincontroller.AdminPage);
routes.get('/addproduct',admincontroller.AddProductPage);
routes.get('/addcategory',admincontroller.categoryPage);
routes.get('/addsubcategory',admincontroller.subcategoryPage);
routes.get('/subcategory',admincontroller.Viewsubcategory);
routes.get('/addcategorylist',admincontroller.categorylistpage);
routes.get('/deleteData',admincontroller.deleteData);
routes.get('/deleteSubData',admincontroller.deleteSubData);
routes.get('/api/subcategories', admincontroller.SelectOptionHendal);



module.exports=routes;