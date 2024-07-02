import express from "express";
import {createSubscription, getAllSubscription, getSubscriptionById} from "../controllers/subscriptionController.js";
const router = express.Router();

router.get("/", getAllSubscription);
router.post("/", createSubscription);
router.get("/:id", getSubscriptionById); 


export default router;