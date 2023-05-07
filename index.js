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
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddleWare = require('./config/middleware');

//using layout of the webside.
app.use(expressLayouts);
app.use(express.static('./assets'));

//using urlencoded and cookie-parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//make path available for images to load.
app.use('/uploads',express.static(__dirname + '/uploads'));

//extract styles and script from sub pages to the head of the layout so that the style must be in head and script must be in body.
app.set('layout extractStyles', true);
app.set('layout extractScript', true);

//setup the view engine and path
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store session cookie in the db.
app.use(session({
    name: 'codeial',
    //Todo, change the secret key before deployment
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/codeial_development',
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleWare.setFlash);


//redirecting request comming in to index.js in routes.
console.log('We are in main Index.js 1');
app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in connecting server!! ${err}`);
        return;
    }
    console.log(`Server is successfully connected to port: ${port}`);
});
