import mongoose from 'mongoose';

const elicitationSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    freeText: {
        type: String,
    },
    mentions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

export default mongoose.model('Elicitation', elicitationSchema);
