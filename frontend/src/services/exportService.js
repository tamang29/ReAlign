import axios from "axios";

const API_URL = "http://localhost:3000/api/export/file";

const exportSvgToPDF = async(req) =>{
    try{
        const response = await axios.post(API_URL, req);
        return response;
    }catch(error){
        throw error;
    }
}

export {exportSvgToPDF};