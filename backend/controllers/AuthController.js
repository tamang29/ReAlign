import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../models/userModel.js';
import Organization from '../models/organizationModel.js';
import Subscription from '../models/subscriptionModel.js';
import File from '../models/fileModel.js';
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';
import { sendResetPasswordEmail } from '../utils/sendResetPasswordEmail.js';
import { sendApprovalRequestEmail } from '../utils/sendApprovalRequestEmail.js';

// Controller to register a new user
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role, photo, organization } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (!validator.isStrongPassword(password))
            return res.status(400).json({ 
                message: "Your password is not strong enough. Please ensure it has: \n- At least 8 characters \n- At least one lowercase letter \n- At least one uppercase letter \n- At least one number \n- At least one special character (e.g., !@#$%^&*)" 
            });
            
        let organizationId = null;

        if (organization) {
            const existingOrganization = await Organization.findOne({ name: organization });
            if (!existingOrganization) {
                return res.status(400).json({ message: 'Organization not found' });
            }
            organizationId = existingOrganization._id;
        }
        

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            photo,
            organization: organizationId
        });
         
        if (user) {
            await sendVerificationEmail(user, req, res);
            res.status(201).json({
                message: 'Registration successful! \n- Please check your email to verify your account.',
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    
    } catch (error) {
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
        if (user.organization) {
            await sendApprovalRequestEmail(user.organization, user);
        }
        user.organization = null;
        await user.save();


        res.status(200).json({ isVerified: true });
    } catch (error) {
        res.status(400).json({ message: 'Invalid token', error: error.message });
    }
};

// Helper function to add days to a date
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

// Function to check and update subscription
const checkAndUpdateSubscription = async (organizationId) => {
    // Fetch the organization
    const organization = await Organization.findById(organizationId);

    if(organization == null) {
        return;
    } else {
        // Fetch the current subscription
        const currentSubscription = await Subscription.findById(organization.subscription);

        // Check if the current subscription is still valid
        const today = new Date();
        if (currentSubscription && new Date(currentSubscription.end) < today) {
            // Current subscription is expired

            // Check if there's a next subscription
            const nextSubscription = await Subscription.findById(organization.nextSubscription);
            if (nextSubscription) {
                // Update organization with the next subscription
                organization.subscription = nextSubscription._id;
                organization.nextSubscription = null;
                await organization.save();
            } else {
                // Create a new subscription with the same level
                const newSubscription = new Subscription({
                    start: addDays(currentSubscription.end, 1),
                    end: addDays(currentSubscription.end, 366),
                    level: currentSubscription.level,
                    price: currentSubscription.price,
                });
                await newSubscription.save();

                // Update organization with the new subscription
                organization.subscription = newSubscription._id;
                await organization.save();
            }
        }
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

            if (user.organization) {
                await checkAndUpdateSubscription(user.organization);
            }

            let upgradeRequiredMessage = null; // Define upgradeRequiredMessage here

            // Fetch organization details
            const organization = await Organization.findById(user.organization);
            if (organization) {
                const subscription = await Subscription.findById(organization.subscription);
                const userCount = organization.users.length;

                if (subscription && userCount > subscription.userLimit) {
                    upgradeRequiredMessage = `User limit exceeded. Your plan allows for ${subscription.userLimit} users. Please upgrade your subscription plan or ask your administrator to upgrade.`;
                }
            }
            
            // Check and update the subscription
            await checkAndUpdateSubscription(user.organization);

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' });

            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                photo: user.photo, 
                token: token,
                organization: user.organization,
                upgradeRequiredMessage: upgradeRequiredMessage
            });
        } else { return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Controller to request password reset
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        await sendResetPasswordEmail(user, email);

        res.status(200).json({ message: 'Reset Password Email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to reset password
export const resetPassword = async (req, res) => {
    const { token, password } = req.body;


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        if (!validator.isStrongPassword(password))
            return res.status(400).json({ message: "Password must be a strong password.." });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

