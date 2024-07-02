import express from 'express';
const router = express.Router();
import {convertSvgToPDF, createNewDiagram, getDiagramByProject} from '../controllers/diagramController.js'

router.post('/', createNewDiagram);
router.post('/export', convertSvgToPDF);
router.get('/:projectId', getDiagramByProject);

export default router;