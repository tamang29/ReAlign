
import Elicitation from '../models/elicitationModel.js';
import Notification from '../models/notificationModel.js';
import Project from '../models/projectModel.js'
import User from '../models/userModel.js'

// Get Elicitation by Project
export const getElicitationByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        let elicitation = await Elicitation.findOne({ project: projectId });

        if (!elicitation) {
            return res.status(404).json({ message: 'Elicitation not found for this project' });
        }

        res.status(200).json(elicitation);
    } catch (error) {
        console.error('Error fetching elicitation:', error);
        res.status(500).json({ message: 'Failed to fetch elicitation data', error });
    }
};
// Create Elicitation
export const createElicitation = async (req, res) => {
    try {
        const { projectId } = req.body;

        // Check if an elicitation already exists for the project ID
        let elicitation = await Elicitation.findOne({ project: projectId });
        if (elicitation) {
            // Return the existing elicitation
            return res.status(200).json({ message: 'Elicitation already exists', elicitation });
        }

        // If no elicitation exists, create a new one
        elicitation = new Elicitation({
            project: projectId,
        });

        // Save the new elicitation
        const savedElicitation = await elicitation.save();

        // Return a 201 status with the newly created elicitation
        res.status(201).json({ message: 'Elicitation created successfully', elicitation: savedElicitation });
    } catch (error) {
        console.error('Error creating elicitation:', error);
        res.status(500).json({ message: 'Failed to create elicitation', error });
    }
};

export const updateElicitation = async (req, res) => {
    try {
        const { projectId, freeText, mentions } = req.body;

        // Find the elicitations matching the projectId and update freeText and mentions
        const elicitation = await Elicitation.findOneAndUpdate(
            { project: projectId },
            { $set: { freeText, mentions } },
            { new: true }
        );

        if (!elicitation) {
            return res.status(404).json({ message: 'Elicitation not found' });
        }
        // Handle notifications for mentioned users
        if (mentions && mentions.length > 0) {
            for (const userId of mentions) {
                try {  
                        const project = await Project.findOne({ _id : projectId });
                        let user = await User.findOne({ _id: userId })
                        const notification = new Notification({
                            user: user,
                            project:projectId,
                            message: `You were mentioned in an elicitation for the project ${project.name}`
                        });
                        await notification.save();
                } catch (err) {
                    console.error(`Error finding user with id ${userId}:`, err);
                }
            }
        }

        res.status(200).json(elicitation); // Respond with updated elicitation document
    } catch (err) {
        console.error('Error updating elicitation:', err);
        res.status(500).json({ message: err.message });
    }
};