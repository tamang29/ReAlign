import { getProject } from "./projectController.js";
import UserStory from "../models/userStoryModel.js";

const createUserStory = async(req, res) =>{

    const {title, content, assignee, createdBy, priority,projectId} = req.body;
    if(!title || !content || !assignee || !createdBy || !priority || !projectId){
        res.status(400).json({msg: "Necessary fields are missing."})
    }
    try{
        const project = await getProject(projectId);
        if(!project){
            res.status(400).json({msg: "Project id doesnt exist."})
        }

        // Create a new user story
        const newUserStory = new UserStory({
            title:title,
            description: content,
            assignedTo: assignee,
            createdBy:createdBy,
            priority:priority,
            projectId:projectId
        });
        UserStory.create(newUserStory).then((project)=>{
            res.status(201).json(project)
        }).catch((error)=>{
            res.status(500).json({ msg: "Error creating user story.", error: error.message });
        });

    }catch(error){
        res.status(500).json({ msg: "Server error.", error: error.message });
    }
}

const getAllUserStory = async(req, res) =>{
    const { projectId } = req.params;

    // Check if projectId is provided
    if (!projectId) {
        return res.status(400).json({ msg: "Project ID is required." });
    }

    try {
        // Find user stories with the matching projectId
        const userStories = await UserStory.find({ projectId });

        // If no user stories are found, return a 404 status
        if (userStories.length === 0) {
            return res.status(404).json({ msg: "No user stories found for this project." });
        }

        // Respond with the found user stories
        res.status(200).json(userStories);
    } catch (error) {
        // Handle any errors that occur during the query
        console.error('Error fetching user stories:', error);
        return res.status(500).json({ msg: "Server error.", error: error.message });
    }
}

export {createUserStory,getAllUserStory};