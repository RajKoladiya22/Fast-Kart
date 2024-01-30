const CategoryModel = require('../../models/categorymodel');
const fs = require('fs');
const AdminPage = async (req, res)=>{
    try{
        let rec = await CategoryModel.find({}).sort({lastUpdateTime :-1});
        return res.render('admin/adminindex', {rec});
    } catch(err){
        console.log(err);
        return false
    }
}

const AddProductPage = async (req, res)=>{
    return res.render('admin/add-new-product')
}

const categoryPage = async (req, res)=>{
    return res.render('admin/add-new-category')
}

const categorylistpage = async (req, res)=>{
    try{
        let rec = await CategoryModel.find({}).sort({lastUpdateTime :-1});
        return res.render('admin/category', {rec});
    } catch(err){
        console.log(err);
        return false
    }
}

const deleteData = async (req, res) => {
    try {
        let DelId = req.query.id;
        let DelImg = await CategoryModel.findById(DelId);

        if (DelImg && DelImg.cat_img) {
            fs.unlinkSync(DelImg.cat_img);

            let DelRec = await CategoryModel.findByIdAndDelete(DelId);
            if (DelRec) {
                console.log('Data Deleted');
                return res.redirect('back');
            }
        } else {
            console.log('Image path not found.');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};


module.exports={
    AdminPage,
    AddProductPage,
    categoryPage,
    categorylistpage,
    deleteData,
}