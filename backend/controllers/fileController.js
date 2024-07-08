import mongoose from 'mongoose';
import File from '../models/fileModel.js';

// Upload File
export const uploadFile = async (req, res) => {
    try {
        const { name, userId, projectId } = req.body;
        const { originalname, buffer } = req.file;

        // Convert file buffer to base64 string
        const base64String = buffer.toString('base64');

        // Create a new file document
        const newFile = new File({
            name,
            user: userId,
            project: projectId,
            base64: base64String,
            date: new Date()
        });

        // Save the file document to the database
        const savedFile = await newFile.save();

        res.status(200).json({ message: 'File uploaded successfully', file: savedFile });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Failed to upload file', error });
    }
};

// Delete File
export const deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;

        // Find and delete the file document
        const deletedFile = await File.findByIdAndDelete(fileId);

        if (!deletedFile) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Failed to delete file', error });
    }
};
