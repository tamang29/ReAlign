import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: Number },
    project: { type: Number },
    base64: { type: String, required: true } 
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

export default File;
