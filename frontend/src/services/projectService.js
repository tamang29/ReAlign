import axios from "axios";

const API_URL = "http://localhost:3000/api/project";

const getAllProjects = async()=>{
    try{
        const response = await axios.get(API_URL);
        return response.data;
    }catch(error){
        throw error;
    }
}
const createProject = async(req, res)=>{
    try{
        console.log(req)
        const response = await axios.post(API_URL, req);
        return response.data
    }catch(error){
        throw error;
    }
}

export {getAllProjects, createProject};