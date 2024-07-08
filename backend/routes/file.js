import { Router } from 'express';
import multer from 'multer';
import { uploadFile, deleteFile } from '../controllers/fileController.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadFile);
router.delete('/delete/:fileId', deleteFile);

export default router;
