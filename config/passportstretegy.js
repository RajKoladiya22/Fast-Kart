const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const SignUpModel = require('../models/signupmodel');

passport.use(new passportlocal({
    usernameField : 'email'
}, async(email, password, done)=>{
   try{
    const user = await SignUpModel.findOne({email : email});
    if(!user || user.password != password){
        console.log(`Incorrecte Details`);
        return done(null, false);
    }
    return done(null, user);
   }catch(err){
    return done(null, false);
   }
}
));

passport.serializeUser((user, done)=>{
    return done(null, user.id);
})

passport.deserializeUser(async(id, done)=>{
    try{
        const user = await SignUpModel.findById(id);
        return done(null, user)
    }catch(err){
        return done(null, false);
       }
});

passport.setUser=(req, res, next)=>{
    if(req.isAuthenticated()){
        res.locals.users = req.user;
    }
    return next();
}
passport.chekUser=(req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/')
}

module.exports=passport;