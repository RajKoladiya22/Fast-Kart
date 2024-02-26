const CategoryModel = require("../../models/categorymodel");
const SubcategoryModel = require("../../models/subcategorymodel");
const ProductModel = require("../../models/productmodel");
const fs = require("fs");
const AdminPage = async (req, res) => {
  try {
    let category  = await CategoryModel.find({}).sort({
      lastUpdateTime: -1,
    });
    let product = await ProductModel.find({}).populate('sub_id').populate('cat_id');
    return res.render("admin/adminindex", { category , product, messages : req.flash('msg') });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const AddProductPage = async (req, res) => {
  let category = await CategoryModel.find({});
  let subcategory = await SubcategoryModel.find({});
  return res.render("admin/add-new-product", { category, subcategory });
};

const ProductPage = async(req, res)=>{
  try{
    let Categorylist = await CategoryModel.find({}).sort({
      lastUpdateTime: -1,
    });
    let product = await ProductModel.find({}).populate('sub_id').populate('cat_id');
    return res.render("admin/product", { Categorylist,product, messages : req.flash('msg') });
  } catch (err) {
    console.log(err);
    return false;
  }
  
}

const categoryPage = async (req, res) => {
  return res.render("admin/add-new-category",{messages : req.flash('msg')});
};

const Viewsubcategory = async (req, res) => {
  try {
    let subcat = await SubcategoryModel.find({}).populate("categoryId");

    return res.render("admin/subcategory", { subcat, messages : req.flash('msg') });
  } catch (err) {
    console.error(err);
    return false;
  }
};

const categorylistpage = async (req, res) => {
  try {
    let rec = await CategoryModel.find({}).sort({ lastUpdateTime: -1 });
    return res.render("admin/category", { rec, messages : req.flash('msg') });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const subcategoryPage = async (req, res) => {
  try {
    let category = await CategoryModel.find({});
    return res.render("admin/add-new-subcategory", { category , messages : req.flash('msg')});
  } catch (err) {
    console.error(err);
    return false;
  }
};


const SelectOptionHendal = async (req, res) => {
  try {
    const categoryId = req.query.categoryId;
    const subcategories = await SubcategoryModel.find({ categoryId });
    res.json(subcategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const EditData = async(req, res)=>{
  try{
    ID = req.query.id;
    let singlecat = await CategoryModel.findById(ID)
    return res.render('admin/edit-category' , {singlecat, messages : req.flash('msg')})
  }catch(err){
    console.log(err);
    return false;
  }
}

module.exports = {
  AdminPage,
  AddProductPage,
  ProductPage,
  categoryPage,
  categorylistpage,
  subcategoryPage,
  Viewsubcategory,
  SelectOptionHendal,
  EditData,
};
