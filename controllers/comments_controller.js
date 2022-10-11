const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try {
        // find the post with post id first and then create a comment
        let post = await Post.findById(req.body.post)
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
                // handle error

                // adding comment to the post
                post.comments.push(comment);
                // save tells the db that tis is the final version so block it and save this before that its just in the RAM
                post.save();
                req.flash('success', 'comment added');

                res.redirect('/');   
            }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = async function(req, res){
    try {
        let comment = await Comment.findById(req.params.id);
            if(comment.user == req.user.id){
                let postId = comment.post;
                comment.remove();
                
               let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                    req.flash('success', 'comment deleted')
                    return res.redirect('back');
                });
            }
            else{
                req.flash('error', 'You are not authorized to delete this comment');
                return res.redirect('back');
            }
    } catch (err) {
        req.flash('error', err);
        return; 
    }
}
    