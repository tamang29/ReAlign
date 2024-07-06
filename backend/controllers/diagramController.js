import PDFDocument from 'pdfkit';
import svgToPdf from 'svg-to-pdfkit';
import Diagram from '../models/diagramModel.js';


const createNewDiagram = (req, res)=>{
  const {projectId, model, fileName, type, createdBy} =  req.body;
  if(!projectId || !model || !fileName || !type || !createdBy){
    res.status(400).json({msg: "missing important data while saving the diagram."});
  }
    const diagram = {
      projectId: projectId,
      model: model,
      fileName: fileName,
      type: type,
      createdBy: createdBy,
      lastUpdatedBy: createdBy
    }
    
    console.log(diagram)

    Diagram.create(diagram).then(()=>{
      res.status(200).json({msg: "Diagram saved successfully."});
    }).catch((err)=>{
      console.log(err)
    });
}

const getDiagramByProject = async(req, res) => {
  const {projectId} = req.params;
  try{
    const diagrams = await Diagram.find({projectId}).sort({ updatedAt: -1 });;
    res.status(200).json(diagrams);

  }catch(err){
    throw err;
  }

}

const convertSvgToPDF = (req, res) =>{
    const { svg, width, height } = req.body;
    if(!svg){
        return res.status(400).send('SVG data is required.');
    }

    try {
        // Create PDF document
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');

        // Convert SVG to PDF and pipe to response
        svgToPdf(doc, svg, 0, 0, { width, height });
        doc.pipe(res);
        doc.end();

      } catch (error) {
        console.error('Error converting SVG to PDF:', error.message);
        res.status(500).send('Error converting SVG to PDF.');
      }

}

export {createNewDiagram,convertSvgToPDF, getDiagramByProject};