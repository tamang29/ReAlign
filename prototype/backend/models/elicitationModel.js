import mongoose from "mongoose";
const Schema = mongoose.Schema;
const elicitationSchema = Schema({
    project: projectSchema,
    title: {
        type: String,
        required: true
    },
    freeText: String,
    //createdBy: UserSchema, // not supposed to be created - there by default
    updatedBy: userSchema
    //, file: file
});

const Elicitation = mongoose.model('Elicitation', elicitationSchema);
export default Elicitation;