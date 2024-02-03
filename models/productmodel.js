const mongoose = require('mongoose');

const ProductModel = mongoose.Schema({
    pro_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: false,
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

const product = mongoose.model('product', ProductModel);

module.exports=product;