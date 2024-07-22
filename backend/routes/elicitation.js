import express from 'express';
import { getElicitationByProject, updateElicitation, createElicitation } from '../controllers/elicitationController.js';


const router = express.Router();

router.get('/:projectId',  getElicitationByProject);
router.post('/update',  updateElicitation);
router.post('/create',  createElicitation);

export default router;
