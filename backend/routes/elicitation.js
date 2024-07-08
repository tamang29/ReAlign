import express from 'express';
import { getElicitation, updateElicitation } from '../controllers/elicitationController.js';

const router = express.Router();

// Fetch elicitation data
router.get('/:projectId', getElicitation);

// Create or update elicitation data
router.post('/update', updateElicitation);

export default router;
