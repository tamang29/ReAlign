import axios from "axios";

const API_URL = "http://localhost:5001/api/user";

const getAllUsers = async() =>{
    try{
        const response = await axios.get(API_URL);
        return response.data;
    }catch(error){
        throw error;
    }
}

export {getAllUsers};