import axios from "axios";

const API_URL = "http://localhost:3000/api/user-story";

const createUserStory = async(userStory) =>{
    try{
        const response = await axios.post(API_URL, userStory);
        return response.data;
    }catch(error){
        throw error;
    }
}

const getAllUserStory = async(projectId) =>{
    try{
        const response = await axios.get(`${API_URL}/${projectId}`);
        return response.data;
    }catch(error){
        throw error;
    }
}
export {createUserStory,getAllUserStory};