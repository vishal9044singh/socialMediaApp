const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

//using layout of the webside.
app.use(expressLayouts);
app.use(express.static('./assets'));

//redirecting request comming in to index.js in routes.
app.use('/',require('./routes/index'));

//extract styles and script from sub pages to the head of the layout so that the style must be in head and script must be in body.
app.set('layout extractStyles',true);
app.set('layout extractScript',true);

//setup the view engine and path
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in connecting server!! ${err}`);
        return;
    }
    console.log(`Server is successfully connected to port: ${port}`);
});
