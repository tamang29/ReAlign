import express from 'express';
const router = express.Router();
import {convertSvgToPDF, createNewDiagram} from '../controllers/diagramController.js'

router.post('/', createNewDiagram);
router.post('/export', convertSvgToPDF);

export default router;