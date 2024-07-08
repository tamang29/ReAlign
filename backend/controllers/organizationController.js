import Organization from "../models/organizationModel.js";

const createOrganization = async(req, res)=>{
    const {name, payment, subscription}= req.body;
    try{
        const organization = await Organization.create({name, payment, subscription});
        res.status(200).json(organization);
    }catch(error){
        res.status(400).json(error);
    }
}

const getAllOrganization = async(req, res)=>{
    try{
        const organizations = await Organization.find({});
        res.status(200).json(organizations);
    }catch(error){
        res.status(400).json(error);
    }
}

const getOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);
        if (organization == null) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.json(organization);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateOrganization = async (req, res) => {
    try {
        const updatedOrg = await Organization.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedOrg) {
            return res.status(404).json({ message: 'Organization not found or could not be updated' });
        }
        res.status(200).json(updatedOrg);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export {createOrganization, getAllOrganization, getOrganizationById, updateOrganization};