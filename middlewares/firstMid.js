
function firstMid(req, res, next){
    console.log('we passed through first middleware');
    next()
    //next passes the request to the next middleware in that route
}

module.exports = firstMid