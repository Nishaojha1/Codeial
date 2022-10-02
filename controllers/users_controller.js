const User = require('../models/user');


// export a function which is publically available to route's file that should return something
module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title: 'profile'
    });
};

// render the sign up page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "codeial | Sign Up"
    })
};

// render the sign in page                         
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "codeial | Sign In"
    })
};

// get sign-up data
module.exports.create = function(req, res){
    // check whether password and confirm password matches or not
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    // if passwords are same we will see if the email ids should be unique
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}
    //when user is not found 
        if (!user){
            User.create(req.body, function(err, user){
              if(err){console.log('error in creating user  while  signing up'); return}

              return res.redirect('/users/sign-in');
            })
           
        }else{
             // user already exist so back
            return res.redirect('back');
        }
    })
}

// get sign-in data
module.exports.createSession = function(req, res){
    // assumeing user is already signed in so we need to redirect
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    // this function is automated by passport js
    req.logout(function(err){
        return next(err);
    });
    return res.redirect('/')
}