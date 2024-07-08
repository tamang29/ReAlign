import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userStorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
}, {timestamps: true})

const UserStory = mongoose.model('UserStory', userStorySchema);
export default UserStory;