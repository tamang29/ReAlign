import mongoose from "mongoose";
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: userSchema,
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
    permissions: [{user: userSchema,
                   level: {
                        type: String,
                        enum: ["Owner", "Editor", "Reader"],
                        required: true
                   }
                  }]
});

const Project = mongoose.model('Project', projectSchema);
export default Project;