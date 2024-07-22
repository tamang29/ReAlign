import Diagram from "../models/diagramModel.js";
import Elicitation from "../models/elicitationModel.js"
import NFR from "../models/nFRModel.js";
import Project from "../models/projectModel.js";
import Specification from "../models/specificationModel.js";
import File from "../models/fileModel.js"
import Notification from "../models/notificationModel.js"



const getAllProjects = async (req, res) => {
    const id = req.query.id;
    try {
        const projects = await Project.find({'users.member': id }).populate('createdBy', 'firstName lastName photo email');
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get project by ID
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('users.member', 'firstName lastName email');

        if (project == null) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
}

const getProject = async (req, res)=> {
    try {
        const project = await Project.findById(req);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        return project;
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

const createProject = async (req, res) =>{
    const {name,description,createdBy,status, deadline, priority, users} = req.body;
    try{
        if(!name || !status ||!deadline || !priority){
            res.status(400).json({msg: "All fields are mandatory."});
        }
        const updatedUsers = [
            ...users,
            {
                member: createdBy,
                role: 'Owner'
            }
        ];

        const project = {
            name: name,
            description: description,
            createdBy: createdBy,
            status: status,
            deadline: deadline,
            priority: priority,
            users: updatedUsers
        }
       Project.create(project).then(()=>{
        res.status(201).json(project)
       }).catch((err)=>{
        res.status(500).json({msg: "Error while saving to DB."})
       })

    }catch(error){
        res.status(500).json(error);
    }

}

const updateProject = async (req, res)=>{
    const { name, description, createdBy, status, deadline, priority, users } = req.body;
    const id = req.params.id;

    try {
        if (!name || !createdBy || !status || !deadline || !priority || !users) {
            return res.status(400).json({ msg: "Error in input." });
        }

        const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
        if (!project) {
            return res.status(404).json({ msg: "Project not found." });
        }

        res.status(200).json({ project, msg: "Update successful." });
    } catch (error) {
        res.status(500).json({ msg: "Error while updating project." });
    }
}

const deleteProject = async (req, res) =>{
    const id = req.params.id;

    try{
        await Project.deleteOne({_id: id});
        await Diagram.deleteMany({projectId: id});
        await NFR.deleteMany({projectId: id});
        await Elicitation.deleteMany({project: id});
        await Notification.deleteMany({project:id});
        await File.deleteMany({project: id});
        await Specification.deleteMany({project: id});
        res.status(200).json({msg : "Project deleted successfully."})
    }catch(error){
        res.status(500).json({msg: "Error while deleting project."})
    }
}

// Get users by project ID
const getUsersByProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('users.member', 'firstName lastName email');

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        const users = project.users.reduce((acc, userRole) => {
            if (userRole.member) {
                acc.push({
                    _id: userRole.member._id,
                    firstName: userRole.member.firstName,
                    lastName: userRole.member.lastName,
                });
            }
            return acc;
        }, []);

        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


export {getUsersByProject, getAllProjects, getProjectById, createProject, updateProject, deleteProject, getProject};


