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
        const users = await User.find({}).select('firstName lastName isVerified organization photo role _id email');
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

  const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, role, photo, organization } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (role) user.role = role;
        if (photo) user.photo = photo;
        if (organization) user.organization = organization;

        if (password) {
            // Generate a salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



export {createUser, getAllUser, deleteUser, getUserById, updateUser};
