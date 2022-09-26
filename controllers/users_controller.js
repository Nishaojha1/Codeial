// export a function which is publically available to route's file that should return something
module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title: 'profile'
    });
}