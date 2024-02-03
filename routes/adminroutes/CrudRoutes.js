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

routes.post('/category', fileUpload, CrudController.Addcategory);
routes.post('/subcategory', fileUpload, CrudController.Addsubcategory);

module.exports=routes;