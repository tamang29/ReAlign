import express from "express";
import {createSubscription, getAllSubscription} from "../controllers/subscriptionController.js";
const router = express.Router();

router.get("/", getAllSubscription);
router.post("/", createSubscription);


export default router;