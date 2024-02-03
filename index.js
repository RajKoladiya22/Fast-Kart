const express = require('express');

const port = 8000;
const app = express();
const db = require('./config/db');
const path = require('path');
const passport= require('passport');
const passportStrategy = require('./config/passportstretegy');
const session = require('express-session');

app.use(express.urlencoded());

app.use(session({
    name :'Abc',
    secret : 'Abc@123',
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24 
    }
}));

app.set('view engine', 'ejs');
app.use('/public',express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

app.use('/',require('./routes/loginRoutes'));
app.use('/',require('./routes/adminroutes/CrudRoutes'));
app.use('/',require('./routes/adminroutes/adminindexRoutes'));

app.listen(port, (err)=>{
    if(err){
        console.log(`Server is not connected`);
        return false;
    }
    console.log(`Server is connected on ${port}`);
})