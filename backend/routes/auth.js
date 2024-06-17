import express from 'express';
import { registerUser, loginUser } from '../controllers/AuthController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

export default router;
