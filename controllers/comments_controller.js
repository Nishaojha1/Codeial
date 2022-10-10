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

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
            if(comment.user == req.user.id){
                let postId = comment.post;
                comment.remove();
                
                Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                    return res.redirect('back');
                });
            }
            else{
                return res.redirect('back');
            }
    });
}
