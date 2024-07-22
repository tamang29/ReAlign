import express from 'express';
import { getNotificationsByUser, markNotificationAsRead } from '../controllers/notificationController.js';


const router = express.Router();
router.get('/:userId',  getNotificationsByUser);
router.put('/:notificationId/read', markNotificationAsRead);

export default router;
