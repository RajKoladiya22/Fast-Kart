const CategoryModel = require('../models/categorymodel');
const subcategoryModel = require('../models/subcategorymodel')

const HomePage = async(req, res)=>{
    try{
        let subcategories = await subcategoryModel.find({}).populate("categoryId");
        let category = await CategoryModel.find({}).sort({ lastUpdateTime: -1 });
        return res.render("index", { category, subcategories });
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports={
    HomePage,
}