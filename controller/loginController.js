const SignUpModel = require('../models/signupmodel');

const loginPage = async(req, res)=>{
    if(res.locals.users){
        return res.redirect('/index');
    }
    return res.render('login')
}

const RegisterPage = async(req, res)=>{
    return res.render('register');
}

const AddUser = async(req, res)=>{
    try{
        const {name, email, password, cpassword} = req.body;
        if(password !== cpassword){
            console.log('Password not match');
            return false;
        }
        let Add = await SignUpModel.create({
            name, email, password, cpassword
        });
        if(Add){
            console.log(`User Registered`);
            return res.redirect('/');
        }
    }catch(err){
        if(err){
            console.log(err);
            return false;
        }
    }
}

const loginUser = (req,res) => {
    return res.redirect('/index')
}

const IndexPage = async(req, res)=>{
    return res.render('index');
}

module.exports={
    loginPage,
    RegisterPage,
    AddUser,
    loginUser,

    IndexPage,
}