module.exports = {
    sessionCheck: (req, res, next) => {
        console.log("Validated");
        next();
    }
}