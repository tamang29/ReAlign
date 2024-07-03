import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
    member: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['Owner', 'Editor', 'Reader'],
      required: true
    }
  }, { _id: false });

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ["Design", "Testing", "Deployed", "Done"],
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
        required: true
    },
    users: [userRoleSchema]
},{timestamps: true});

const Project = mongoose.model('Project', projectSchema);
export default Project;