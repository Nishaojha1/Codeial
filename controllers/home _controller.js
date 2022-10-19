const Post = require('../models/post');
const User = require('../models/user');
const { post } = require('../routes/comments');



// export a function which is publically available to route's file that should return something
module.exports.home = async function(req,res){
    try{
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
        let posts = await Post.find({})
        // to show the post in the reverse chronological order
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments' ,
            populate: {
                path: 'user'
            }
        })
    let users =  await User.find({});
    
        // console.log(users);
        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
            });   
    
    }catch(err){
        console.log ('Error', err);
        return;
    }

 }