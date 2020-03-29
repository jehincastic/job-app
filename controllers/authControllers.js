const jwt = require('jsonwebtoken');

const { getCookie } = require("./commonMethods"),
    connection = require("../controllers/connection");

module.exports = {
    sessionCheck: async (req, res, next) => {
        const cookie = req.headers.cookie;
        const token = getCookie('session', cookie);
        if (token) {
            jwt.verify(token, process.env.secret, function(err, decoded) {
                if (err) {
                    console.log("Error due to......", err);
                    res.redirect("/login");
                } else {
                    req.userId = decoded.id;
                    req.userName = decoded.userName;
                    if (req.url === '/login' || req.url === '/register') {
                        res.redirect("/template")
                    } else {
                        next();
                    }
                }
            });
        } else {
            if (req.url === '/login' || req.url === '/register') {
                next();
            } else {
                res.redirect("/login");
            }
        }
    }
}