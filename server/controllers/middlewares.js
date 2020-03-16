const { sessionCheck } = require('./authControllers');

module.exports = {
    authFunction: (req, res, next) => {
        const urlArray = req.url;
        if (urlArray === '/api/login' || urlArray === '/api/register') {
            next();
        } else {
            sessionCheck(req, res, next);
        }
    }      
}