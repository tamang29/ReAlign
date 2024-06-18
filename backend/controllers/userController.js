import User from "../models/userModel.js";

const createUser = async(req, res)=>{
    const {firstName, lastName, email, password, role, photo}= req.body;
    try{
        const user = await User.create({firstName, lastName, email, password, role, photo});
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({ message: 'User registration failed' });
    }
}

const getAllUser = async(req, res)=>{
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }catch(error){
        res.status(400).json(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { email } = req.body; // Assuming the user will be deleted based on the email

        // Find the user by email and delete them
        const user = await User.findOneAndDelete({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export {createUser, getAllUser, deleteUser};