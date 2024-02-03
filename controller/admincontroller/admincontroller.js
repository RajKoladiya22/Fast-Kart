const CategoryModel = require("../../models/categorymodel");
const SubcategoryModel = require("../../models/subcategorymodel");
const ProductModel = require("../../models/productmodel");
const fs = require("fs");
const AdminPage = async (req, res) => {
  try {
    let Categorylist = await CategoryModel.find({}).sort({
      lastUpdateTime: -1,
    });
    return res.render("admin/adminindex", { Categorylist });
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

const categoryPage = async (req, res) => {
  return res.render("admin/add-new-category");
};

const Viewsubcategory = async (req, res) => {
  try {
    let subcat = await SubcategoryModel.find({}).populate("categoryId");

    return res.render("admin/subcategory", { subcat });
  } catch (err) {
    console.error(err);
    return false;
  }
};

const categorylistpage = async (req, res) => {
  try {
    let rec = await CategoryModel.find({}).sort({ lastUpdateTime: -1 });
    return res.render("admin/category", { rec });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const subcategoryPage = async (req, res) => {
  try {
    console.log(res.locals.users);
    let category = await CategoryModel.find({});
    return res.render("admin/add-new-subcategory", { category });
  } catch (err) {
    console.error(err);
    return false;
  }
};

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

module.exports = {
  AdminPage,
  AddProductPage,
  categoryPage,
  categorylistpage,
  subcategoryPage,
  deleteData,
  Viewsubcategory,
  deleteSubData,
  SelectOptionHendal,
};
