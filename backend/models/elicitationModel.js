import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const elicitationSchema = new mongoose.Schema({
    project: {
        type: String,
        required: true,
    },
    freeText: {
        type: String,
        default: '',
    },
    files: {
        type: Array,
        default: [],
    },
});

const Elicitation = mongoose.model('Elicitation', elicitationSchema);

export default Elicitation;
