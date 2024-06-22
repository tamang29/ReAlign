import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

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
            req.user = await User.findById(decoded.userId).select('-password');

            if (!req.user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            } else if (error.name === 'JsonWebTokenError' || error.name === 'NotBeforeError') {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                return res.status(401).json({ message: 'Not authorized, token failed' });
            }
        }
    } else {
        // If no token is found, respond with an error message
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};


export { protect };
