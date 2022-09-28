const passport = require('passport');
const User = require('../models/user');

// telling passport tp use local strategy
const LocalStrategy = reqyire('passport-local').Strategy;

const User = require('../models/user');


// create authentication function (we need passport to use this local strategy)
passport.use(new LocalStrategy({
    usernameField: 'email'
},
// whenever this local strategy is being called the email and the password will be passed on and a done function will be passed on done is call back function which is reporting to passport.js
function(email, password, done){
    // find a user and establish the identity
    User.findOne({email: email}, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done('err');
        }

        if(!user || user.password != password){
            console.log('Invalid Username/Password');
            // there is no error but user is not found since the authentication is not done so false
            return done(null, false);
        }

        return done(null, user);
   });
}

));

//  Serializing the user to declare which key is to be kept in the cookies(which property to be sent to the cookie)
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// Deserializing the user from the key in the cookies

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done('err');
        }

        return done(null, user);    
    });
});

module.exports = passport;