import express from 'express';
import multer from 'multer';
import { uploadFile, deleteFile, getFilesByContext, getFileById, getFilesByUser } from '../controllers/fileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(), // Use memory storage
    limits: {
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    },
});

router.post('/upload', upload.single('file'), uploadFile);
router.delete('/delete/:fileId',  deleteFile);
router.get('/:fileId', getFileById);

// Route to get files by context (either 'specification' or 'elicitation' or 'nfr')
router.get('/:context/:projectId', getFilesByContext);
router.get('/user/:userId', getFilesByUser);



export default router;
