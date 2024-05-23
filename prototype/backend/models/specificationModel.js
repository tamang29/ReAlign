import mongoose from "mongoose";
const Schema = mongoose.Schema;
const specificationSchema = Schema({
    project: projectSchema,
    title: {
        type: String,
        required: true
    },
    description: String,
    createdBy: userSchema,
    updatedBy: userSchema,
    pinned: {
        type: Boolean,
        required: true,
        default: true
    }
    // deleted? - for Version Control
    //, file: file
});

const Specification = mongoose.model('Specification', specificationSchema);
export default Subscription;