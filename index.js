const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//using layout of the webside.
app.use(expressLayouts);
app.use(express.static('./assets'));

//using urlencoded and cookie-parser
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//extract styles and script from sub pages to the head of the layout so that the style must be in head and script must be in body.
app.set('layout extractStyles',true);
app.set('layout extractScript',true);

//setup the view engine and path
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    //Todo, change the secret key before deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100),
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//redirecting request comming in to index.js in routes.
app.use('/',require('./routes/index'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in connecting server!! ${err}`);
        return;
    }
    console.log(`Server is successfully connected to port: ${port}`);
});
