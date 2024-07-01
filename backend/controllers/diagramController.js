import PDFDocument from 'pdfkit';
import svgToPdf from 'svg-to-pdfkit';
import Diagram from '../models/diagramModel.js';


const createNewDiagram = (req, res)=>{
  const {projectId, svg, fileName, type, createdBy} =  req.body;
  if(!projectId || !svg || !fileName || !type || !createdBy){
    res.status(400).json({msg: "missing important data while saving the diagram."});
  }
  try{
    const diagram = {
      projectId: projectId,
      svg: svg,
      fileName: fileName,
      type: type,
      createdBy: createdBy,
      lastUpdatedBy: createdBy
    }
    Diagram.create(diagram);
  }catch(error){
    res.status(500).json(error);
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

export {createNewDiagram,convertSvgToPDF};