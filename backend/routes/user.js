import express from "express";
import {createUser, getAllUser, deleteUser, getUserById, getOrgUserById, updateUser, updateOrgUser} from "../controllers/userController.js";
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';



router.get('/:id',  getUserById);
router.get('/',  getAllUser);
router.post("/",  createUser);
router.delete("/",  deleteUser);
router.put('/:id',  updateUser);
router.get('/organization/:id',  getOrgUserById);
router.put('/organization/:id',  updateOrgUser);

export default router;