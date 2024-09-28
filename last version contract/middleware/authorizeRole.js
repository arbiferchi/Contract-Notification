const jwt = require("jsonwebtoken");

const authorizeRole = (role) => {
    return (req, res, next) => {
        // Extract JWT token from headers
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({ msg: "Token not provided" });
        }

        try {
            // Verify and decode the token
            const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY); // Split to remove "Bearer " prefix
            const userRole = decoded.role;

            if (userRole === role) {
                req.user = decoded; // Attach user details to the request object for further use if needed
                next(); // User has the required role, proceed to the next middleware
            } else {
                return res.status(403).send({ msg: "Unauthorized" }); // User does not have the required role
            }
        } catch (error) {
            return res.status(401).send({ msg: "Invalid token" }); // Token verification failed
        }
    };
};

module.exports = authorizeRole;
