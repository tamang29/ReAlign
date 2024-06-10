import mongoose from "mongoose";
import User from "./userModel.js";

const Schema = mongoose.Schema;
const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ["Design", "Testing", "Deployed", "Done"],
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
},{timestamps: true});

const Project = mongoose.model('Project', projectSchema);
export default Project;