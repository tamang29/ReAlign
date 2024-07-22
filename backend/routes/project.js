import express from 'express';
const router = express.Router();
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject,getUsersByProject } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';


router.get('/',  protect, getAllProjects);
router.get('/:id', protect, getProjectById);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id',protect,  deleteProject);
router.get('/:id/users',protect,  getUsersByProject)


export default router;
