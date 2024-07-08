import express from "express";
import { createOrganization, getAllOrganization, getOrganizationById, updateOrganization } from "../controllers/organizationController.js";

const router = express.Router();


router.get("/", getAllOrganization);
router.post("/", createOrganization);
router.get("/:id", getOrganizationById); 
router.put("/:id", updateOrganization);  

export default router;
