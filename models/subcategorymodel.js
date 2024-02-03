// subcategory.js
const mongoose = require('mongoose');

const SubcategoryModel = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        // required: true
    },
    subcat_name: {
        type: String,
        required: true
    },
    cat_name: {
        type: String,
        required: true
    },
    lastUpdateTime: {
        type: Date,
        default: Date.now
    }
});


const subcategory = mongoose.model('subcategory', SubcategoryModel);
module.exports = subcategory;
