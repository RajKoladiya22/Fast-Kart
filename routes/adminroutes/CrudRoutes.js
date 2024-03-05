const express = require('express');
const routes = express.Router();
const CrudController = require('../../controller/admincontroller/CrudController');
const multer = require('multer');

const fileUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            let img = Date.now() + "-" + file.originalname;
            cb(null, img);
        },
    }),
}).single('cat_img');

const productfile = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/product');
        },
        filename: (req, file, cb) => {
            let img = Date.now() + "-" + file.originalname;
            cb(null, img);
        },
    }),
}).fields([
    { name: 'pro_Thumb', maxCount: 4 },
    { name: 'pro_imgs', maxCount: 5 },
    { name: 'pro_video', maxCount: 1 }
]);

//API
routes.post('/addcategoryapi', fileUpload, CrudController.AddcategoryAPI);
routes.post('/addsubcategoryapi', fileUpload, CrudController.AddsubcategoryAPI);


//ADD DATA
routes.post('/addcategorydata', fileUpload, CrudController.Addcategory);
routes.post('/addsubcategorydata', fileUpload, CrudController.Addsubcategory);

routes.post('/productadd', productfile, CrudController.Addproduct);
//DELETE DATA
routes.get('/deleteData',CrudController.deleteCategoryData);
routes.get('/deleteSubData',CrudController.deleteSubcatData);
//EDIT DATA
routes.post('/editcategory',fileUpload,CrudController.editcategory)

module.exports=routes;