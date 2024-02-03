const mongoose = require('mongoose');

const CategoryModel = mongoose.Schema({
    cat_name : {
        type : String,
        require : true
    },
    cat_img : {
        type : String,
        require : true
    },
    cat_icon : {
        type : String,
        require : true
    },
    lastUpdateTime :{
        type : Date,
        default :Date.now
    }
});


const category = mongoose.model('category', CategoryModel);
module.exports = category;