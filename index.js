const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;


app.use(express.static('./assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Set the template engine pug
app.set('view engine','ejs');
// set the view directory
app.set('views', path.join(__dirname,'views'));

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        // console.log('Error: ',err);
        console.log(`Error :  ${err}`)
    }

    console.log(`Server is running on port: ${port}`);

})