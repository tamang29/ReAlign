import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import validator from 'validator';

const createUser = async(req, res)=>{
    const {firstName, lastName, email, password, role, photo}= req.body;

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
        const user = await User.create({firstName, lastName, email, password: hashedPassword, role, photo});
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({ message: 'User registration failed' });
    }
}

const getAllUser = async(req, res)=>{
    try{
        const users = await User.find({}).select('firstName lastName isVerified organization photo role _id email');
        res.status(200).json(users);
    }catch(error){
        res.status(400).json(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { email } = req.body; // Assuming the user will be deleted based on the email

        // Find the user by email and delete them
        const user = await User.findOneAndDelete({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Construct the URL to serve the photo
        if (user.photo) {
            user.photoUrl = `${process.env.BASE_URL}/${user.photo}`; // Adjust the URL format as needed
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// for safe fetching without token protection
const getOrgUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '_id email firstName lastName role');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

 // Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)) // Keep the original file extension
    }
});

const upload = multer({ storage: storage });

// Upload Profile Picture
const uploadProfilePicture = (req, res) => {
    upload.single('photo')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            console.error('Multer error:', err);
            res.status(500).json({ message: 'File upload failed', error: err });
        } else if (err) {
            // An unknown error occurred when uploading
            console.error('Unknown error:', err);
            res.status(500).json({ message: 'File upload failed', error: err });
        }

        // File upload successful
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    });
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, role, organization, photo } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

            // Update user details
            if (firstName) user.firstName = firstName;
            if (lastName) user.lastName = lastName;
            if (email) user.email = email;
            if (role) user.role = role;
            if (organization) user.organization = organization;
            if (photo) user.photo = photo;

            if (password) {
                if (!validator.isStrongPassword(password))
                    return res.status(400).json({ 
                        message: "Your password is not strong enough. Please ensure it has: \n- At least 8 characters \n- At least one lowercase letter \n- At least one uppercase letter \n- At least one number \n- At least one special character (e.g., !@#$%^&*)" 
                    });
                // Generate a salt and hash the password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                user.password = hashedPassword;
            }

            // Update photo field if a file was uploaded
            if (req.file) {
                user.photo = req.file.path; // Store the file path in the user's photo field
            }

            await user.save();
            res.status(200).json({ message: 'User updated successfully', user });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateOrgUser = async (req, res) => {
    const { id } = req.params;
    const { role, organization } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.body.hasOwnProperty('role')) {
            user.role = role === null ? null : role;
        }
        if (req.body.hasOwnProperty('organization')) {
            user.organization = organization === null ? null : organization;
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export {createUser, getAllUser, deleteUser, getUserById, updateUser, getOrgUserById, updateOrgUser};
