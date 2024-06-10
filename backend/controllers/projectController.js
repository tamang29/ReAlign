import Project from "../models/projectModel.js";


const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project == null) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createProject = async (req, res) =>{
    const {name,description,createdBy,status, deadline, priority, users} = req.body;
    console.log(req.body)
    try{
        if(!name || !status ||!deadline || !priority || !users){
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


export {getAllProjects, getProjectById, createProject};