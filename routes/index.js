const express = require('express'),
    router = express.Router();
    
const connection = require("../controllers/connection"),
    keyGenrators = require("../controllers/keyGenerator");

router.get("/", (req, res) => {
    res.render("main")
})

router.get("/register", (req, res) => {
    res.render('login');
})

router.post("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = {
            email,
            username,
            password
        }
        user['email'] = user['email'].toLowerCase();
        user['password'] = keyGenrators.encryptPassword(user['password']);
        var [client, db] =  await connection.getConnection();
        const users = db.collection('users');
        const insertedUserData = await users.insertOne(user);
        delete user['password'];
        let jwtToken = keyGenrators.sessionGenerator(user._id, user.username);
        res.setHeader('Set-Cookie', `session=${jwtToken}; HttpOnly`);
        res.redirect('/template');
    } catch (error) {
        console.log("Could Not Register Because....", error);
        connection.closeConnection(client);
    } finally {
        connection.closeConnection(client);
    }
});

router.get("/login", (req, res) => {
    res.render('login');
})

router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;
        var [client, db] =  await connection.getConnection();
        const users = db.collection('users');
        const dbUser = await users.findOne({username});
        if (dbUser && keyGenrators.passwordCheck(password, dbUser['password'])) {
            let jwtToken = keyGenrators.sessionGenerator(dbUser._id, dbUser.username);
            res.setHeader('Set-Cookie', `session=${jwtToken}; HttpOnly`);
            res.redirect('/template');
        } else {
            res.redirect("/login");
        }
    } catch (err) {
        console.log("Error Occured due to......", err);
        connection.closeConnection(client);
    } finally {
        connection.closeConnection(client);
    }
});

module.exports = router;