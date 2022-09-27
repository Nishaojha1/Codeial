// export a function which is publically available to route's file that should return something
module.exports.home = function(req,res){
    console.log(req.cookies);
    // to change the value of cookies in the server side
    res.cookie('user_id', 24);
    return res.render('home', {
        title: 'Home'
    });
}