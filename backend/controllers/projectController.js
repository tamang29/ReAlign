import Project from "../models/projectModel.js";
import { getUserById } from "./userController.js";


const getAllProjects = async (req, res) => {
    const id = req.query.id;
    console.log(id)
    try {
        const projects = await Project.find({'users.member': id });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('users.member', 'firstName lastName email');

        if (project == null) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getProject = async (req, res)=> {
    console.log(req)
    try {
        const project = await Project.findById(req);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return project;
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const createProject = async (req, res) =>{
    const {name,description,createdBy,status, deadline, priority, users} = req.body;
    try{
        if(!name || !status ||!deadline || !priority){
            res.status(400).json({msg: "All fields are mandatory."});
        }
        const project = {
            name: name,
            description: description,
            createdBy: createdBy,
            status: status,
            deadline: deadline,
            priority: priority,
            users: users
        }
       Project.create(project).then(()=>{
        res.status(201).json(project)
       }).catch((err)=>{
        res.status(500).json({msg: "Error while saving to DB."})
        console.log(err)
       })

    }catch(error){
        res.status(500).json(error);
    }

}

const updateProject = async (req, res)=>{
    const {name,description,createdBy,status, deadline, priority, users} = req.body;
    const id = req.params.id;
    try{
        const project = await Project.findByIdAndUpdate(id, req.body);
        res.status(200).json(project);

    }catch(error){
        res.status(500).json({msg: "Error while updating project."})
    }

}

const deleteProject = async (req, res) =>{
    const id = req.params.id;

    try{
        await Project.deleteOne({_id: id});
        res.status(200).json({msg : "Project deleted successfully."})
    }catch(error){
        res.status(500).json({msg: "Error while deleting project."})
    }
}



export {getAllProjects, getProjectById, createProject, updateProject, deleteProject,getProject};