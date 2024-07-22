import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const specificationSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  description: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
    default: Date.now
},
  pinned: {
    type: Boolean,
    default: false
  },
});

const Specification = mongoose.model('Specification', specificationSchema);
export default Specification;
