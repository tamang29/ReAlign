
import File from '../models/fileModel.js';
import Elicitation from '../models/elicitationModel.js';
import Specification from '../models/specificationModel.js';
import NFR from '../models/nFRModel.js'
import { trusted } from 'mongoose';

// Upload File
export const uploadFile = async (req, res) => {
    try {
        const { name, projectId, context, user} = req.body;
        const { buffer } = req.file;

        const base64String = buffer.toString('base64');  // Converts buffer to base64 string

        // Update based on context (Elicitation/ Specification/ NFR)
        let fileData = {
            name,
            data: base64String,
            project: projectId,
            date: new Date(),
            user: user
        };

        if (context === 'elicitation') {
            fileData.elicitation = true;
        } else if (context === 'specification') {
            fileData.specification = true;
        } else if (context === 'nfr') {
            fileData.nfr = true;
        }

        // Save the new File document
        const savedFile = await File.create(fileData);

        // Respond with success message and the saved File document
        res.status(200).json({ message: 'File uploaded successfully', file: savedFile });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Failed to upload file', error });
    }
};

export const deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;

        // Delete the file by its ID
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

// Get Files by Context (either 'specification' or 'elicitation' or 'nfr')
export const getFilesByContext = async (req, res) => {
    try {
        const { context, projectId } = req.params;

        let files;

        if (context === 'specification') {
            files = await File.find({ project: projectId, specification: true});
        } else if (context === 'elicitation') {
            files = await File.find({ project: projectId, elicitation: true });
        } else if (context === 'nfr') {
            files = await File.find({ project: projectId, nfr: true });
        } else {
            return res.status(400).json({ message: 'Invalid context provided' });
        }

        const extractedFiles = files.map(file => ({
            _id: file._id,
            name: file.name,
            data: file.data,
            user: file.user,
            project: file.project,
            date: file.date,
        }));

        res.status(200).json(extractedFiles);
    } catch (error) {
        console.error(`Error fetching files:`, error);
        res.status(500).json({ message: `Failed to fetch files`, error });
    }
};

// Get File by ID
export const getFileById = async (req, res) => {
    try {
        const { fileId } = req.params;

        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.status(200).json(file);
    } catch (error) {
        console.error('Error fetching file by ID:', error);
        res.status(500).json({ message: 'Failed to fetch file by ID', error });
    }
};

// Get Files by User
export const getFilesByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch files associated with the user ID
        const files = await File.find({ user: userId });

        if (!files.length) {
            return res.status(404).json({ message: 'No files found for the user' });
        }

        res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching files by user:', error);
        res.status(500).json({ message: 'Failed to fetch files by user', error });
    }
};
