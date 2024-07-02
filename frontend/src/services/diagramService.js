import axios from "axios";

const API_URL = "http://localhost:3000/api/diagram";


//save diagram to db
const saveNewDiagram = async(diagram) => {
    try{
    const response = await axios.post(API_URL, diagram);
    return response;
    }catch(error){
        throw error;
    }
}

//get diagrams by project id
const getDiagramByProject = async(projectId) =>{
    try{
        const response = await axios.get(`${API_URL}/${projectId}`);
        return response.data;
    }catch(error){
        throw error;
    }
}


const convertSvgToPDF = async(svg, width, height) =>{
    const requestBody = { svg, width, height };
    try{
        const response = await axios.post(`${API_URL}/export`, requestBody,{
            headers: {
                'Content-Type': 'application/json',
              },
              responseType: 'blob', // specify response type as blob(binary data in the form of file)
              //default responseType is json.
        });
        return response.data;
    }catch(error){
        throw error;
    }
}

const downloadAsPDF = (pdfBlob, fileName) =>{
    if(pdfBlob){
        const blobUrl = URL.createObjectURL(pdfBlob); //create a url
        const a = document.createElement('a'); //creates an <a> tag
        a.href = blobUrl; // initialize href attribute with bloburl
        a.download = `${fileName}.pdf`; //default fileName is ClassDiagram // initialize download attibute with filename
        document.body.appendChild(a); //append <a> to the DOM
        a.click(); //trigger <a>
        document.body.removeChild(a); //remove <a> tag
        URL.revokeObjectURL(blobUrl);
    }
}


export {convertSvgToPDF, downloadAsPDF,saveNewDiagram, getDiagramByProject};