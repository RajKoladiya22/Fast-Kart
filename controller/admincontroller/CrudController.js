const CategoryModel = require('../../models/categorymodel');


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
            return res.redirect('back');
        }
    } catch(err){
        console.log(err);
        return false;
    }
}

module.exports={
    Addcategory,
}