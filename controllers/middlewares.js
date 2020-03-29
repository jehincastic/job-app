const { sessionCheck } = require('./authControllers');

module.exports = {
    authFunction: (req, res, next) => {
        sessionCheck(req, res, next);
    }      
}