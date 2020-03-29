const jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs');

module.exports = {
    encryptPassword: password => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    passwordCheck: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    },
    sessionGenerator: (id, username) => {
        return jwt.sign({id, username}, process.env.secret, {
            expiresIn: 3600
        });
    }
}