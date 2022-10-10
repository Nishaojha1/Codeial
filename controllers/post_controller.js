const Post = require('../models/post');
const Comment = require('../models/comment');

// this is going tp control multiple users
module.exports.post = function(req,res){
    res.end('<h1> User Post </h1>');
} 

module.exports.create = function(req, res){
    console.log(req.user, "line 9");
    Post.create({
        content: req.body.content,
        user: req.user._id,
    }, function(err, post){
        if(err){console.log('error in creating a post');return;}

        return res.redirect('back');
    });

}

// creating a destroy action
module.exports.destroy = function(req, res){
    // we will be making (/posts/destroy/id) route and destroy the id, Id is the string param
    Post.findById(req.params.id, function(err, post){
        // Need to check whether the user who is deleting the post is the user who has written the post
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}