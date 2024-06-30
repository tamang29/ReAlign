import axios from "axios";

const API_URL = "http://localhost:3000/api/export/file";

const convertSvgToPDF = async(svg, width, height) =>{
    const requestBody = { svg, width, height };
    try{
        const response = await axios.post(API_URL, requestBody,{
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
        const blobUrl = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${fileName}.pdf`; //default fileName is ClassDiagram
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    }
}

export {convertSvgToPDF, downloadAsPDF};