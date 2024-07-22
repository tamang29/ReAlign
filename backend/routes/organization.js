import express from "express";
import { createOrganization, getAllOrganization, getOrganizationById, updateOrganization, updatePaymentMethod, searchOrganization, approveOrRejectUser, deleteOrganization,joinOrganization, addUserToOrganization
} from "../controllers/organizationController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add',  addUserToOrganization);
router.post('/join',  joinOrganization);
router.get('/search',  searchOrganization);
router.post('/approveUser',  approveOrRejectUser);
router.get("/",  getAllOrganization);
router.post("/",  createOrganization);
router.get("/:id",  getOrganizationById);
router.put("/:id",  updateOrganization);
router.put("/payment/:id",  updatePaymentMethod);
router.delete("/:id",  deleteOrganization);

export default router;
