import express from "express";
import {createUser, getAllUser, deleteUser} from "../controllers/userController.js";
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';//testing middle



router.get("/", getAllUser);//testing middle
router.post("/", createUser);
router.delete("/", deleteUser);

export default router;