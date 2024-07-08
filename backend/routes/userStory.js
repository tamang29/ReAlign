import express from "express";
import { createUserStory, getAllUserStory } from "../controllers/UserStoryController.js";
const router = express.Router();

router.get("/:projectId", getAllUserStory);
router.post("/", createUserStory);

export default router;