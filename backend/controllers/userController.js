import User from "../models/userModel.js";

const createUser = async(req, res)=>{
    const {firstName, lastName, email, password, role, photo}= req.body;
    try{
        const user = await User.create({firstName, lastName, email, password, role, photo});
        res.status(200).json(user);
    }catch(error){
        res.status(400).json(error);
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

const getUserById = async(req, res) =>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).json({msg: "User not found."});
    }
    res.status(200).json(user);
}

export {createUser, getAllUser, getUserById};