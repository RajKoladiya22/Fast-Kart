const mongoose = require('mongoose');

const CartModel = mongoose.Schema({
    product_name : {
        type : String,
        require : true,
    },
    product_oprice : {
        type : Number,
        require : true,
    },
    product_fprice : {
        type : Number,
        require : true,
    },
    product_img : {
        type : Array,
        require : true,
    },
    product_imgs : {
        type : Array,
        require : true,
    },
})  