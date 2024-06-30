import express from 'express';
const router = express.Router();
import {exportAsPDF} from '../controllers/exportController.js'

router.post('/file', exportAsPDF);

export default router;