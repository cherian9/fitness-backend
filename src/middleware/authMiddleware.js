const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            const error = new Error("Authentication header required");
error.statusCode = 401;
throw error;
        }
const parts = authHeader.split(" ");
    if (parts[0] !== "Bearer" || !parts[1]) 
        {
    const error = new Error("Invalid JWT token");
    error.statusCode = 401;
    throw error;
}
    const decoded = jwt.verify( parts[1], process.env.JWT_SECRET);
    req.user = decoded
    next();
}


     catch (error) {
        next(error);

    }

};

module.exports = {
    authenticateToken
};