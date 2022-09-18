const express = require('express');
const app = express();
const path = require('path');
const port = 8000;

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