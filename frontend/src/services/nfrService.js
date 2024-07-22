import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/nfr`;

const createNFR = async(body)=>{
    try{
        const response = await axios.post(API_URL, body);
        return response.data
    }catch(error){
        throw error;
    }
}
//get nfrs by project id
const getNFRByProject = async(projectId) =>{
    try{
        const response = await axios.get(`${API_URL}/${projectId}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

const deleteNFR = async(id) =>{
    try{
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}
const updateNFR = async(id, updateData) =>{
    try{
        const response = await axios.put(`${API_URL}/${id}`, updateData);
        return response.data;
    }catch(error){
        throw error;
    }
}


export {createNFR, getNFRByProject, deleteNFR, updateNFR};