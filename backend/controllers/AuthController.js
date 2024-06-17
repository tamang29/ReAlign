import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Function to generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Controller to register a new user
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role, photo } = req.body;
    try {
        // Check if a user with the given email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user in the database
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            photo,
        });

        // Check if the user was successfully created and respond accordingly
        if (user) {
            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                photo: user.photo,
                token: generateToken(user._id), // Generate a token for the new user
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to login a user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists and the password is correct
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                photo: user.photo,
                token: generateToken(user._id), // Generate a token for the authenticated user
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
