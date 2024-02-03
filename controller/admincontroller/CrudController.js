const { default: mongoose } = require('mongoose');
const CategoryModel = require('../../models/categorymodel');
const SubcategoryModel = require('../../models/subcategorymodel');


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

module.exports={
    Addcategory,
    Addsubcategory,
}