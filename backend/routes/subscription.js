import express from "express";
import {createSubscription, getAllSubscription, getSubscriptionById, updateSubscription} from "../controllers/subscriptionController.js";
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.get("/",  getAllSubscription);
router.post("/",  createSubscription);
router.get("/:id",  getSubscriptionById); 
router.put("/:id",  updateSubscription);  

export default router;