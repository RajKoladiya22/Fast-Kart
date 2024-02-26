const { default: mongoose } = require('mongoose');
const CategoryModel = require('../../models/categorymodel');
const SubcategoryModel = require('../../models/subcategorymodel');
const ProductModel = require('../../models/productmodel');
const fs = require("fs");

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
            req.flash('msg', `${subcat_name} Added!!`);
            console.log('Subcategory Added');
            return res.redirect('/subcategory');
        }
    } catch(err){
        console.log(err);
        return false;
    }
}

const Addproduct = async(req, res)=>{
    try{
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
            return res.redirect('/product');
        }
    }catch(err){
        console.log(err);
        return false
    }
}

const deleteData = async (req, res) => {
    try {
      let DelId = req.query.id;
  
      let DelImg = await CategoryModel.findById(DelId);
      if (DelImg.cat_img || file) {
        fs.unlinkSync(DelImg.cat_img);
  
        let DelRec = await CategoryModel.findByIdAndDelete(DelId);
        await SubcategoryModel.deleteMany({ categoryId: req.query.id });
        if (DelRec) {
          console.log("Data Deleted");
          req.flash('msg', `${DelImg.cat_name} Deleted!!`)
          return res.redirect("back");
        }
      } else {
        console.log(`Image not found`);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const deleteSubData = async (req, res) => {
    try {
      let DelId = req.query.id;
  
      let DelRec = await SubcategoryModel.findByIdAndDelete(DelId);
      if (DelRec) {
        console.log("Data Deleted");
        return res.redirect("back");
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

module.exports={
    Addcategory,
    Addsubcategory,
    Addproduct,
    deleteData,
    deleteSubData,
}