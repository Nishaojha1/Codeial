// export a function which is publically available to route's file that should return something
module.exports.home = function(req,res){
    return res.render('home', {
        title: 'Home'
    });
}