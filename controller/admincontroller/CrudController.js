const { default: mongoose } = require("mongoose");
const CategoryModel = require("../../models/categorymodel");
const SubcategoryModel = require("../../models/subcategorymodel");
const ProductModel = require("../../models/productmodel");
const fs = require("fs");
const axios = require('axios');

//API
const AddcategoryAPI = async (req, res) => {
  try {
    const { cat_name, cat_icon } = req.body;
    let Category = await CategoryModel.create({
      cat_name,
      cat_img: req.file.path,
      cat_icon,
    });

    return res.status(200).send({
      success: true,
      message: "Category Created",
      Category,
    });
  } catch (err) {
    return res.status(501).send({
      success: false,
      message: err,
    });
  }
};

const AddsubcategoryAPI = async (req, res) => {
  try {
    const { cat_name, subcat_name } = req.body;
    let subcategory = await SubcategoryModel.create({
      cat_name,
      categoryId : cat_name,
      subcat_name,
    });
    return res.status(200).send({
      success: true,
      message: "Subcategory Created",
      subcategory,
    });
  } catch (err) {
    return res.status(501).send({
      success: false,
      message: err,
    });
  }
};

const AddproductAPI = async (req, res) => {
  try {
    const {
      cat_name,
      sub_name,
      pro_name,
      pro_unit,
      pro_tags,
      pro_cprice,
      pro_oprice,
    } = req.body;

    let Product = await ProductModel.create({
      cat_id: cat_name,
      sub_id: sub_name,
      pro_name,
      pro_unit,
      pro_tags,
      pro_Thumb: req.files["pro_Thumb"].map((file) => file.path),
      pro_imgs: req.files["pro_imgs"].map((file) => file.path),
      pro_video: req.files["pro_video"][0].path,
      pro_cprice,
      pro_oprice,
    });
    if (Product) {
      req.flash("msg", `${pro_name} Added!!`);
      return res.redirect("/product");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

//ADD DATA
const Addcategory = async (req, res) => {
  try {
    console.log("cat_name: ", req.body.cat_name);
    console.log("cat_image: ", req.file.path);
    console.log("cat_icon: ", req.body.cat_icon);
    const response = await axios.post('http://localhost:8000/addcategoryapi', 
    {
      cat_name : req.body.cat_name,
      cat_img : req.file.path,
      cat_icon : req.body.cat_icon,
    }
    );
     req.flash("msg", `${cat_name} Added !!`);
     return res.redirect('/categorydata')
    
  } catch (err) {
    return res.status(501).send({
      success: false,
      message: err.message,
    });
  }
};

const Addsubcategory = async (req, res) => {
  try {
    const { cat_name, subcat_name } = req.body;
    const response = await axios.post('http://localhost:8000/addcategoryapi', {
      cat_name,
      categoryId: cat_name,
      subcat_name,
    });

      req.flash("msg", `${subcat_name} Added!!`);
      console.log("Subcategory Added");
      return res.redirect("/subcategory");

  } catch (err) {
    console.log(err);
    return false;
  }
};

// const Addproduct = async (req, res) => {
//   try {
//     const {
//       cat_name,
//       sub_name,
//       pro_name,
//       pro_unit,
//       pro_tags,
//       pro_cprice,
//       pro_oprice,
//     } = req.body;

    

//     let Product = await ProductModel.create({
//       cat_id: cat_name,
//       sub_id: sub_name,
//       pro_name,
//       pro_unit,
//       pro_tags,
//       pro_Thumb: req.files["pro_Thumb"].map((file) => file.path),
//       pro_imgs: req.files["pro_imgs"].map((file) => file.path),
//       pro_video: req.files["pro_video"][0].path,
//       pro_cprice,
//       pro_oprice,
//     });
//     if (Product) {
//       req.flash("msg", `${pro_name} Added!!`);
//       return res.redirect("/product");
//     }
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

//DELETE DATA

const deleteCategoryData = async (req, res) => {
  try {
    let DelId = req.query.id;

    let DelImg = await CategoryModel.findById(DelId);
    if (DelImg.cat_img || file) {
      fs.unlinkSync(DelImg.cat_img);

      let DelRec = await CategoryModel.findByIdAndDelete(DelId);
      await SubcategoryModel.deleteMany({ categoryId: req.query.id });
      if (DelRec) {
        console.log("Data Deleted");
        req.flash("msg", `${DelImg.cat_name} Deleted!!`);
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

const deleteSubcatData = async (req, res) => {
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

//EDIT DATA
const editcategory = async (req, res) => {
  try {
    let ID = req.body.editId;

    let UpDate = await CategoryModel.findByIdAndUpdate(ID, {
      cat_name: req.body.cat_name,
      cat_img: req.file.path,
      cat_icon: req.body.cat_icon,
    });

    if (UpDate) {
      req.flash("msg", `${req.body.cat_name} Updated !!`);
      return res.redirect("/addcategorylist");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  //API
  AddcategoryAPI,
  AddsubcategoryAPI,
  AddproductAPI,


  Addcategory,
  Addsubcategory,
  //Addproduct,
  deleteCategoryData,
  deleteSubcatData,
  editcategory,
};
