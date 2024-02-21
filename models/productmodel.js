const mongoose = require('mongoose');

const ProductModel = mongoose.Schema({
    cat_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: false,
    },
    sub_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
        required: false,
    },
    pro_name : {
        type : String,
        require : true
    },
    pro_unit : {
        type : String,
        require : true
    },
    pro_tags : {
        type : String,
        require : true
    },
    pro_Thumb : {
        type : Array,
        require : true
    },
    pro_imgs : {
        type : Array,
        require : true
    },
    pro_video : {
        type : Array,
        require : true
    },
    pro_cprice : {
        type : Number,
        require : true
    },
    pro_oprice : {
        type : Number,
        require : true
    },
    lastUpdateTime :{
        type : Date,
        default :Date.now
    }
});

const product = mongoose.model('product', ProductModel);

module.exports=product;