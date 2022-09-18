// export a function which is publically available to route's file that should return something
module.exports.home = function(req,res){
    return res.end('<h1>Express is up for codeial')
}