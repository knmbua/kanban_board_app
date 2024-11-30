import jwt from 'jsonwebtoken';
// Create a middleware function that blocks unauthicated users from triggering user ONLY routes
export const blockGuests = (req, res, next) => {
    // TODO: Retrieve the token cookie from req.cookies
    const token = req.cookies?.token;
    // TODO: If the token cookie does not exist, send a 401 json response message and return
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
