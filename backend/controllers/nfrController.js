import NFR from "../models/nFRModel.js";

const getNFRByProject = async (req, res) => {
    const { projectId } = req.params;
    try {
      const nfr = await NFR.find({ projectId }).populate('createdBy', 'email photo').sort({ updatedAt: -1});
      res.status(200).json(nfr);
    } catch (err) {
      res.status(500).json({ msg: "Error while fetching data." });
    }
  };

const createNewNFR = async(req, res) =>{
    const {projectId, type, row, col , createdBy, createdAt} = req.body

    if(!projectId || !type || !row || !col || !createdBy ){
        res.status(400).json({msg: "Important fields are missing."})
    }
    const nfr = {
        projectId,
        type,
        row,
        col,
        createdBy,
        createdAt: new Date(),
    }

    try{
        const data = await NFR.create(nfr);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Error while saving to DB.' }); // Send error response
    }

}
const deleteNFR = async (req, res) => {
    const { id } = req.params;
    try {
      await NFR.deleteOne({ _id: id });
      res.status(200).json({ msg: "Deleted successfully." });
    } catch (error) {
      res.status(500).json({ msg: "Error while deleting." });
    }
  };

const updateNFR = async (req, res) =>{
  try{
  const { id } = req.params;
  const data = req.body;

  const nfr = await NFR.findByIdAndUpdate(id, data);
  res.status(200).json(nfr);
  }catch(error){
    res.status(500).json({msg: "Error while updating."});
  }
  

}

export {createNewNFR, getNFRByProject, deleteNFR, updateNFR}