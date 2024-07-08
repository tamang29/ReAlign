import axios from "axios";
import { ApollonEditor, UMLDiagramType, ApollonMode, Locale} from '@ls1intum/apollon';
const API_URL = "http://localhost:3000/api/diagram";

const diagramTypes = [
    { id: 'ClassDiagram', label: 'Class Diagram' },
    { id: 'ObjectDiagram', label: 'Object Diagram' },
    { id: 'ActivityDiagram', label: 'Activity Diagram' },
    { id: 'UseCaseDiagram', label: 'Use Case Diagram' },
    { id: 'CommunicationDiagram', label: 'Communication Diagram' },
    { id: 'ComponentDiagram', label: 'Component Diagram' },
    { id: 'DeploymentDiagram', label: 'Deployment Diagram' },
    { id: 'PetriNet', label: 'PetriNet' },
    { id: 'ReachabilityGraph', label: 'Reachability Graph' },
    { id: 'SyntaxTree', label: 'Syntax Tree' },
    { id: 'Flowchart', label: 'Flowchart' },
    { id: 'BPMN', label: 'BPMN' }
  ];

const initializeDiagram = (editorContainerRef, UML) =>{
    const options = {
        type: UMLDiagramType[UML],
        mode: ApollonMode,
        readonly: false,
        enablePopups: true,
        model: null,
        theme: {},
        locale: Locale.English,
        copyPasteToClipboard: true,
        colorEnabled: true,
        scale: 1.0,
    };
    const ApolloEditor = new ApollonEditor(editorContainerRef.current, options);
    return ApolloEditor;
}

const openDiagramFromDB = async(editorContainerRef,diagram) =>{
    const options = {
        type: UMLDiagramType[diagram.type],
        mode: ApollonMode,
        readonly: false,
        enablePopups: true,
        model: diagram.model,
        theme: {},
        locale: Locale.English,
        copyPasteToClipboard: true,
        colorEnabled: true,
        scale: 1.0,
    };
    try{
    const ApolloEditor = new ApollonEditor(editorContainerRef.current, options);
    return ApolloEditor;
    }catch(error){
        console.error(error);
    }
  }


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


export {initializeDiagram,convertSvgToPDF, downloadAsPDF,saveNewDiagram, getDiagramByProject,diagramTypes,openDiagramFromDB};