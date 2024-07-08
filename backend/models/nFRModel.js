import mongoose from "mongoose";
const Schema = mongoose.Schema;
const nFRSchema = new Schema({
    project: projectSchema,
    title: {
        type: String,
        required: true
    },
    description: String,
    createdBy: userSchema,
    updatedBy: userSchema,
    type: {
        type: String,
        enum: ["Security", "Performance", "Availability"],
        required: true
    },
    pinned: {
        type: Boolean,
        required: true,
        default: true
    }
    //, deleted? - for Version Control
});

const NFR = mongoose.model('NFR', nFRSchema);
export default NFR;