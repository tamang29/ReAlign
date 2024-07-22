import express from 'express';
import { registerUser, loginUser, verifyUser, forgotPassword, resetPassword } from '../controllers/AuthController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

//Route to verifed page
router.post('/verify', verifyUser);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
