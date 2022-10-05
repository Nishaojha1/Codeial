const Post = require('../models/post');

// this is going tp control multiple users
module.exports.post = function(req,res){
    res.end('<h1> User Post </h1>');
} 

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        users: req.user._id,
    }, function(err, post){
        if(err){console.log('error in creating a post');return;}

        return res.redirect('back');
    });

}