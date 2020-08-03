const User = require('../models/user.model');

const { RES_AUTH_HEADER } = require('../constants/auth');

const Authenticate = (req, res, next) => {
    const token = req.header(RES_AUTH_HEADER);

    User.findByToken(token)
        .then((user) => {
            if (!user) return Promise.reject();

            req.user = user;
            req.token = token;
            next();
        })
        .catch((err) => res.status(401).send());
};

module.exports = { Authenticate };
