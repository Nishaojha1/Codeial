const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    // find the post with post id first and then create a comment
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error

                // adding comment to the post
                post.comments.push(comment);
                // save tells the db that tis is the final version so block it and save this before that its just in the RAM
                post.save();

                res.redirect('/');
            });
        }
    })
}
