import express from 'express';
const router = express.Router();
import {convertSvgToPDF} from '../controllers/exportController.js'

router.post('/file', convertSvgToPDF);

export default router;