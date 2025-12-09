import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    // Get the Authorization header from the request & extract the token
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // If token is not present, return 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the decoded user information to the request object
        req.user = decoded;
        // Proceed to the next middleware
        next(); 
    } catch (error) {
        // return 403 Forbidden response if token is invalid
        res.status(403).json({ message: "Invalid token" });
    }
}

export default auth;