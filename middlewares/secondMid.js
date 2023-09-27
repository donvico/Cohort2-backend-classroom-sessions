
function secondMid(req, res, next){
    console.log('we passed through second middleware');
    next()
}

module.exports = secondMid