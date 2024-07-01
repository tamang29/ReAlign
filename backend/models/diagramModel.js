import mongoose from "mongoose";
const Schema = mongoose.Schema;

const diagramSchema = new Schema({
    projectId: {
        type : String,
        required: true
    },
    svg: {
        type : String,
        required: true
    },
    fileName: {
        type : String,
        required: true
    },
    type: {
        type : String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    lastUpdatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const Diagram = mongoose.model('Diagram', diagramSchema);
export default Diagram;