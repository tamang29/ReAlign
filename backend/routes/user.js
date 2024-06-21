import express from "express";
import {createUser, getAllUser, deleteUser, getUserById} from "../controllers/userController.js";
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';



router.get('/:id', protect, getUserById);
router.get('/', getAllUser);
router.post("/", createUser);
router.delete("/", deleteUser);

export default router;