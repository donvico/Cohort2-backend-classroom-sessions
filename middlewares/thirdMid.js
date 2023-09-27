
function thirdMid(req, res, next){
    console.log('we passed through third middleware');
    next()
}

module.exports = thirdMid