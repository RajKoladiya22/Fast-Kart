const { default: mongoose } = require('mongoose');
const CategoryModel = require('../../models/categorymodel');
const SubcategoryModel = require('../../models/subcategorymodel');
const ProductModel = require('../../models/productmodel');


const Addcategory = async(req, res)=>{
    try{
        const {cat_name, cat_icon}=req.body;
        let Add = await CategoryModel.create({
            cat_name, 
            cat_img : req.file.path,
            cat_icon
        });
        if(Add){
            console.log('Category Added');
            req.flash('msg', `${cat_name} Added !!`)
            return res.redirect('/addcategorylist');
        }
    } catch(err){
        console.log(err);
        return false;
    }
}

const Addsubcategory = async(req, res)=>{
    try{
        const {cat_name, subcat_name}=req.body;
        let Add = await SubcategoryModel.create({
            cat_name,
            categoryId : cat_name,
            subcat_name, 
        });
        if(Add){
            console.log('Subcategory Added');
            return res.redirect('back');
        }
    } catch(err){
        console.log(err);
        return false;
    }
}

const Addproduct = async(req, res)=>{
    try{
        console.log("Form Data:", req.body);
        console.log("File Data:", req.files);
        const {cat_name, sub_name, pro_name, pro_unit, pro_tags,  pro_cprice, pro_oprice} = req.body;

        let Product = await ProductModel.create({
            cat_id : cat_name,
            sub_id : sub_name, 
            pro_name , 
            pro_unit, 
            pro_tags, 
            pro_Thumb: req.files['pro_Thumb'].map(file => file.path),
            pro_imgs: req.files['pro_imgs'].map(file => file.path),
            pro_video: req.files['pro_video'][0].path,
            pro_cprice, 
            pro_oprice
        });
        if(Product){
            req.flash('msg', `${pro_name} Added!!`);
            return res.redirect('/products');
        }
    }catch(err){
        console.log(err);
        return false
    }
}

module.exports={
    Addcategory,
    Addsubcategory,
    Addproduct,
}