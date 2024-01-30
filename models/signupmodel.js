const mongoose = require('mongoose');

const SignUpModel = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    cpassword : {
        type : String,
        require : true
    },
});

const signup = mongoose.model('signup', SignUpModel);

module.exports=signup;