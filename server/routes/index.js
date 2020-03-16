const express = require('express'),
    router = express.Router();
    
const connection = require("../controllers/connection"),
    {successResponse, failureResponse} = require("../controllers/responseControllers");

router.post("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = {
            email,
            username,
            password
        }
        const [client, db] =  await connection.getConnection();
        const users = db.collection('users');
        const insertedData = await users.insertOne(user);
        connection.closeConnection(client);
        successResponse(res, user);
    } catch (error) {
        console.log("Could Not Register Because....", error);
        failureResponse(res, error);
    }
});

router.post("/login", (req, res) => {
    res.send({
        status: "Success",
        message: "Logged In"
    })
});

module.exports = router;