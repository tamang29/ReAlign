import express from 'express';
const router = express.Router();
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/',createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);


export default router;
