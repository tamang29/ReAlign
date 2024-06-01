import mongoose from "mongoose";
const Schema = mongoose.Schema;
const modelingSchema = Schema({
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
        enum: ["Class", "Use Case"],
        required: true
    },
    pinned: {
        type: Boolean,
        required: true,
        default: true
    }
    // deleted? - for Version Control
    //, file: file
});