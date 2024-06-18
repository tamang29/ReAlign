import jwt from 'jsonwebtoken'; 
import User from '../models/userModel.js'; 

// Middleware function to protect routes
const protect = async (req, res, next) => {
    let token;

    // Check if the request has an authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the authorization header
            token = req.headers.authorization.split(' ')[1];
            
            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find the user by ID
            req.user = await User.findById(decoded.id).select('-password');
            
            next();
        } catch (error) {
            // If token verification fails, respond with an error message
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token is found, respond with an error message
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export { protect }; 
