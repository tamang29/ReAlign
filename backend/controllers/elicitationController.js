import Elicitation from '../models/elicitationModel.js';

// Fetch elicitation data
export const getElicitation = async (req, res) => {
    try {
        const { projectId } = req.params;
        const elicitation = await Elicitation.findOne({ project: projectId });

        if (!elicitation) {
            return res.status(200).json({});
        }

        res.status(200).json(elicitation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch elicitation' });
    }
};

// Create or update elicitation data
export const updateElicitation = async (req, res) => {
    try {
        const { project, freeText } = req.body;

        let elicitation = await Elicitation.findOne({ project });

        if (!elicitation) {
            elicitation = new Elicitation({ project, freeText });
        } else {
            elicitation.freeText = freeText;
        }

        await elicitation.save();
        res.status(200).json(elicitation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update elicitation' });
    }
};
