import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

const createUser = async(req, res)=>{
    const {firstName, lastName, email, password, role, photo}= req.body;

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
        const user = await User.create({firstName, lastName, email, password: hashedPassword, role, photo});
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
};

const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
    
  };
  


export {createUser, getAllUser, deleteUser, getUserById};