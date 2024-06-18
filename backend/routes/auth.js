import express from 'express';
import { registerUser, loginUser, verifyUser} from '../controllers/AuthController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

//Route to verifed page
router.post('/verify', verifyUser);

export default router;
