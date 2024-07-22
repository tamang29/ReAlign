import express from 'express';
import { createOrUpdateSpecification, getSpecificationsByProjectId, deleteSpecification, pinSpecification } from '../controllers/specificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-or-update',  createOrUpdateSpecification);
router.get('/:projectId',  getSpecificationsByProjectId);
router.delete('/delete/:specificationId',  deleteSpecification); 
router.put('/pin/:specificationId',  pinSpecification);
export default router;
