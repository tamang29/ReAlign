import mongoose from "mongoose";
const Schema = mongoose.Schema;


const modelSchema = new Schema({
    version: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    },
    interactive: {
        elements: {
            type: Map,
            of: Schema.Types.Mixed,
            default: {}
        },
        relationships: {
            type: Map,
            of: Schema.Types.Mixed,
            default: {}
        }
    },
    elements: {
        type: Map,
        of: Schema.Types.Mixed,
        default: {}
    },
    relationships: {
        type: Map,
        of: Schema.Types.Mixed,
        default: {}
    },
    assessments: {
        type: Map,
        of: Schema.Types.Mixed,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false });  // Disable automatic _id generation for sub-documents


const diagramSchema = new Schema({
    projectId: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastUpdatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    versions: [modelSchema],  // Array of versions
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Diagram = mongoose.model('Diagram', diagramSchema);
export default Diagram;