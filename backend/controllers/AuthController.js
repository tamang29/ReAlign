import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import {sendVerificationEmail} from '../utils/sendVerificationEmail.js';

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
            await sendVerificationEmail(user, req, res);
            res.status(201).json({
                message: 'Registration successful! Please check your email to verify your account.',
            });
                

        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Verify user email
export const verifyUser = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ isVerified: true });
    } catch (error) {
        res.status(400).json({ message: 'Invalid token', error: error.message });
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
            if (!user.isVerified) {
                return res.status(400).json({ message: 'Please verify your email to login' });
              }
            
            user.token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' });
            await user.save();

            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                photo: user.photo,
                token: user.token, // Generate a token for the authenticated user
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
