module.exports = {
    successResponse: (res, data) => {
        res.send({
            status: "SUCCESS",
            data
        })
    },

    failureResponse: (res, data) => {
        var message = data;
        if (data.hasOwnProperty('message')) {
            message = data.message
        }
        res.send({
            status: "FAILED",
            message
        })
    }

}