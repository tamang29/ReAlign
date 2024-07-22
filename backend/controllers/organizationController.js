import jwt from 'jsonwebtoken';
import Organization from "../models/organizationModel.js";
import User from "../models/userModel.js";
import { sendNotificationEmail } from '../utils/sendNotificationEmail.js';
import { sendApprovalRequestEmail } from '../utils/sendApprovalRequestEmail.js';
import { sendAddUserEmail } from '../utils/sendAddUserEmail.js';

const createOrganization = async (req, res) => {
    const { name, email, payment, subscription, users } = req.body;
    try {
        const organization = await Organization.create({ name, email, payment, subscription, users });
        res.status(200).json(organization);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(400).json({
            message: 'Error creating organization',
            error: error.message
        });
    }
};

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
        const organization = await Organization.findById(req.params.id).populate('users','firstName lastName email');// send user info;
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

const updatePaymentMethod = async (req, res) => {
    const { id } = req.params;
    const { paymentMethod, paymentDetails } = req.body;

    try {
        let organization = await Organization.findById(id);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        // Update payment details
        organization.payment[0].paymentMethod = paymentMethod;
        organization.payment[0].paymentDetails = paymentDetails;

        // Save updated organization
        const updatedOrg = await organization.save();

        res.status(200).json(updatedOrg);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const searchOrganization = async (req, res) => {
    try {
        const { query } = req.query;
        const organizations = await Organization.find({ name: { $regex: `^${query}`, $options: 'i' } });
        res.json(organizations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const approveOrRejectUser = async (req, res) => {
    const { token } = req.body;
    const { action } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        const organization = await Organization.findById(decoded.org);

        if (!user || !organization) {
            return res.status(400).json({ message: 'Invalid token or user/organization not found' });
        }

        if (action === 'approve') {
            organization.users.push(user._id);
            await organization.save();

            user.organization = organization._id;
            user.role = 'Member'
            await user.save();
            
            await sendNotificationEmail(user, organization, 'approve');
            res.status(200).json({ message: 'User approved and added to the organization' });
        } else if (action === 'reject') {
            await sendNotificationEmail(user, organization, 'reject');
            res.status(200).json({ message: 'User request rejected' });
        } else {
            res.status(400).json({ message: 'Invalid action' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid token', error: error.message });
    }
};


// Delete organization
const deleteOrganization = async (req, res) => {
    try {
        const organization = await Organization.findByIdAndDelete(req.params.id);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting organization', error: error.message });
    }
};

const joinOrganization = async (req, res) => {
    const { userId, organization } = req.body;
    const user = await User.findById(userId);


    if (!organization) {
        res.status(400).json({ message: 'No organization typed in', error: error.message });
    }else{
        const existingOrganization = await Organization.findOne({ name: organization });
        if (!existingOrganization) {
            return res.status(400).json({ message: 'Organization not found' });
        }
        const organizationId = existingOrganization._id;
 
        try {
            await sendApprovalRequestEmail(organizationId, user);
            res.status(200).json({ message: 'Join request sent successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};



const addUserToOrganization = async (req, res) => {
  const { email, organizationId } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.organization) {
      return res.status(400).json({ message: 'User is already part of an organization' });
    }

    const organization = await Organization.findById(organizationId);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    user.organization = organization._id;
    user.role = 'Member'; // Or whatever role you want to assign
    await user.save();

    organization.users.push(user._id);
    await organization.save();

    await sendAddUserEmail(user.email, organization.name);

    res.status(200).json({ message: 'User added to the organization successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export {createOrganization, getAllOrganization, getOrganizationById, updateOrganization, updatePaymentMethod, searchOrganization, approveOrRejectUser, deleteOrganization, joinOrganization, addUserToOrganization};
