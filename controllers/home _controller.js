const Post = require('../models/post');
// export a function which is publically available to route's file that should return something
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // to change the value of cookies in the server side
    // res.cookie('user_id', 24);
    // Post.find({}, function(err, post){
    // return res.render('home', {
    //     title: 'Codeial | Home',
    //     posts: post,
    //     });  
    // });
    // finding all the posts and populating user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments' ,
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, post){
        return res.render('home', {
            title: 'Codeial | Home',
            posts: post,
            });  
     
    })
}