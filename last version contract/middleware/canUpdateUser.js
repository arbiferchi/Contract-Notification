const user = require('../models/user');

const canUpdateUser = (req, res, next) => {
    // Check if the authenticated user is an admin or the user whose data is being updated
    if (req.user.role === 'admin' || req.user._id.toString() === req.params._id) {
        return next(); // User is authorized, proceed to update
    } else {
        return res.status(403).send({ msg: "Unauthorized" }); // User is not authorized
    }
};

module.exports = canUpdateUser;