const jwt = require('jsonwebtoken');
const user = require('../models/user');

const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            return res.status(401).send({ error: [{ msg: "not authorized" }] });
        }

        const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer" string

        if (!token) {
            return res.status(401).send({ error: [{ msg: "not authorized" }] });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundUser = await user.findOne({ _id: decoded.id });

        if (!foundUser) {
            return res.status(401).send({ error: [{ msg: "not authorized" }] });
        }

        req.user = foundUser; // req.user now contains the authenticated user's data
        next();

    } catch (error) {
        return res.status(401).send({ error: [{ msg: "not authorized" }] });
    }
};

module.exports = isAuth;
