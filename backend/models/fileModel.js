import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    date: {
        type: Date,
        default: Date.now
    },
    specification: {
        type: Boolean
    },

    elicitation: {
        type: Boolean
    },

    nfr: {
        type: Boolean
    }
   
});

export default mongoose.model('File', fileSchema);
