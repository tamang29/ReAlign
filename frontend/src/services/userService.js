import axios from "axios";

const API_URL = "http://localhost:3000/api/user";

const getAllUsers = async() =>{
    try{
        const response = await axios.get(API_URL);
        return response.data;
    }catch(error){
        throw error;
    }
}

export {getAllUsers};