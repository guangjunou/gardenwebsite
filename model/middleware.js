module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        req.session.returnTo = req.originalUrl;
    }
    next()
 }
