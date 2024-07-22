import { Double, Int32 } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;


const rowSchema = new Schema ({
    aspect: {
        type: String
    },
    description: {
        type: String
    },
    priority: {
        type: String
    },
    metric: {
        type: String
    },
    target: {
        type: String
    },
    currentStatus:{
        type: String
    }

})
const colSchema = new Schema ({
    field: {
        type: String
    },
    headerName: {
        type: String
    },
    editable: {
        type: Boolean
    },
    colId: {
        type: String
    },
    width: {
        type: Number
    }
})

const nFRSchema = new Schema({
    projectId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    row: [rowSchema],
    col: [colSchema],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastUpdatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const NFR = mongoose.model('NFR', nFRSchema);
export default NFR;