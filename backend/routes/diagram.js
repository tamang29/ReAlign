import express from 'express';
const router = express.Router();
import {convertSvgToPDF, createNewDiagram, deleteDiagram, getDiagramByProject, updateDiagram} from '../controllers/diagramController.js'
import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect ,createNewDiagram);
router.post('/export',  convertSvgToPDF);
router.get('/:projectId', getDiagramByProject);
router.put('/:diagramId', updateDiagram);
router.delete('/:id', deleteDiagram);

export default router;