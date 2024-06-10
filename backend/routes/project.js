import express from 'express';
const router = express.Router();
import { createProject, getAllProjects, getProjectById } from '../controllers/projectController.js';


router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/',createProject);


export default router;
