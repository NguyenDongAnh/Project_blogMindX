module.exports = function(req, res, next) {
    if (req.session.uID != null) {
        console.log(req.session.uID);
        next();
    } else {
        res.redirect('/login');
    }
}