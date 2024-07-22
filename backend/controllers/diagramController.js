import PDFDocument from 'pdfkit';
import svgToPdf from 'svg-to-pdfkit';
import Diagram from '../models/diagramModel.js';

const createNewDiagram = (req, res) => {
  const { projectId, model, fileName, type, createdBy } = req.body;
  if (!projectId || !model || !fileName || !type || !createdBy) {
    return res.status(400).json({ msg: "Missing important data while saving the diagram." });
  }

  const version = {
    ...model,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const diagram = {
    projectId,
    fileName,
    type,
    createdBy,
    lastUpdatedBy: createdBy,
    versions: [version]
  };

  Diagram.create(diagram).then((savedDiagram) => {
    res.status(200).json(savedDiagram);
  }).catch((err) => {
    res.status(500).json({ msg: "Error while saving the diagram." });
  });
};

const getDiagramByProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const diagrams = await Diagram.find({ projectId }).populate('createdBy', 'email photo').sort({ updatedAt: -1});
    res.status(200).json(diagrams);
  } catch (err) {
    res.status(500).json({ msg: "Error while fetching diagrams." });
  }
};

const updateDiagram = async (req, res) => {
  const { diagramId } = req.params;
  const model = req.body;

  if (!model) {
    return res.status(400).json({ msg: "Missing important data while updating the diagram." });
  }

  try {
    const diagram = await Diagram.findById(diagramId);
    if (!diagram) {
      return res.status(404).json({ msg: "Diagram not found." });
    }

    const newVersion = {
      ...model,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Check the number of versions
    if (diagram.versions.length >= 10) {
      // Sort versions by createdAt to find the least recent one
      diagram.versions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      // Remove the least recent version
      diagram.versions.shift();
    }
    //push the version
    diagram.versions.push(newVersion.model);
    diagram.lastUpdatedBy = model.updatedBy;
    diagram.updatedAt = new Date();
    diagram.fileName = model.fileName;

    await diagram.save();//save the data
    res.status(200).json(diagram);
  } catch (error) {
    res.status(500).json({ msg: "Error while updating diagram." });
  }
};

const deleteDiagram = async (req, res) => {
  const { id } = req.params;
  try {
    await Diagram.deleteOne({ _id: id });
    res.status(200).json({ msg: "Diagram deleted successfully." });
  } catch (error) {
    res.status(500).json({ msg: "Error while deleting diagram." });
  }
};

const convertSvgToPDF = (req, res) => {
  const { svg, width, height } = req.body;
  if (!svg) {
    return res.status(400).send('SVG data is required.');
  }

  try {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');

    svgToPdf(doc, svg, 0, 0, { width, height });
    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).send('Error converting SVG to PDF.');
  }
};

export { createNewDiagram, convertSvgToPDF, getDiagramByProject, updateDiagram, deleteDiagram };
