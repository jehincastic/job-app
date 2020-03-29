const express = require('express'),
    router = express.Router();

const middlewares = require("../controllers/middlewares");

router.get("/", (req, res) => {
    res.render("main");
})

module.exports = router;