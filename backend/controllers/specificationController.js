import Specification from '../models/specificationModel.js';

// Create or Update Specification
export const createOrUpdateSpecification = async (req, res) => {
    try {
        const { projectId, title, content, createdBy } = req.body;

        let specification = await Specification.findOne({ project: projectId, title });

        if (specification) {
            // Update existing specification
            specification.content = content;
            specification.updatedAt = new Date();
        } else {
            // Create new specification
            specification = new Specification({
                project: projectId,
                title,
                content,
                createdBy

            });
        }

        const savedSpecification = await specification.save();
        res.status(201).json({ message: 'Specification saved successfully', specification: savedSpecification });
    } catch (error) {
        console.error('Error saving specification:', error);
        res.status(500).json({ message: 'Failed to save specification', error: error.message });
    }
};
// Fetch Specifications by Project ID
export const getSpecificationsByProjectId = async (req, res) => {
    try {
        const { projectId } = req.params;
        const specifications = await Specification.find({ project: projectId }).sort({ pinned: -1, updatedAt: -1 });
        
        if (!specifications.length) {
            return res.status(404).json({ message: 'No specifications found for this project.' });
        }
        

        res.status(200).json({ specifications });
    } catch (error) {
        console.error('Error fetching specifications:', error);
        res.status(500).json({ message: 'Failed to fetch specifications', error: error.message });
    }
};


// Delete Specification
export const deleteSpecification = async (req, res) => {
    try {
        const { specificationId } = req.params;
        await Specification.findByIdAndDelete(specificationId);
        res.status(200).json({ message: 'Specification deleted successfully' });
    } catch (error) {
        console.error('Error deleting specification:', error);
        res.status(500).json({ message: 'Failed to delete specification', error: error.message });
    }
};

// Pin/Unpin Specification
export const pinSpecification = async (req, res) => {
    try {
        const { specificationId } = req.params;
        const { pinned } = req.body;

        const specification = await Specification.findById(specificationId);
        if (!specification) {
            return res.status(404).json({ message: 'Specification not found' });
        }

        specification.pinned = pinned;
        const updatedSpecification = await specification.save();

        res.status(200).json({ message: 'Specification updated successfully', specification: updatedSpecification });
    } catch (error) {
        console.error('Error pinning/unpinning specification:', error);
        res.status(500).json({ message: 'Failed to pin/unpin specification', error: error.message });
    }
};