 const express = require('express');
 const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const port = 8000;
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal =require('./config/passport-local-strategy');


// reading through the post request
app.use(express.urlencoded());

// setting up the cookie parser
app.use(cookieParser())

app.use(express.static('./assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Set the template engine ejs
app.set('view engine','ejs');
// set the view directory
app.set('views', path.join(__dirname,'views'));

// Create a session
app.use(session ({
    // name of my cookie is codeial
    name: 'codeial',
    // (whenever encryption happens there is a key to encode and decode so to encode it we will use a key secret)
    // Todo change the secret before deployment in poduction mode
    secret: 'blahhhsomething',
    // the user has not logged in, identity is not established, in that case do we need to add extra data to store in session cookies so we set it to false(if no)
    saveUninitialized: false,
    // if already a user_id is stored in the cookie we dont need to save again and again
    resave: false,
    // we need to give an age to the cookie, for how long should this be valid after that the session i.e. the cookie expires
    cookie: {
        maxAge: (1000* 60* 100)
    }

}));
// to tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        // console.log('Error: ',err);
        console.log(`Error :  ${err}`)
    }

    console.log(`Server is running on port: ${port}`);

})