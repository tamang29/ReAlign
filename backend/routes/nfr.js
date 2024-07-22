import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { createNewNFR, deleteNFR, getNFRByProject, updateNFR } from '../controllers/nfrController.js';

router.post("/",  createNewNFR);
router.get("/:projectId",  getNFRByProject);
router.delete('/:id',  deleteNFR);
router.put("/:id",  updateNFR)

export default router;
