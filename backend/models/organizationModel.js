import mongoose from "mongoose";
const Schema = mongoose.Schema;
const organizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // email: {
    //     type: String,
    //     unique: true,
    //     required: true
    // }, // eliminated through Admin User
    // password: {
    //     type: String,
    //     required: true
    // }, // eliminated through Admin User
    // users: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }], // is now handled through the user objects
    payment: [{
        paymentMethod: {
            type: String,
            enum: ["PayPal", "Credit Card", "Invoice"],
            required: true
        },
        paymentDetails: String
    }],
    subscription: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription'
    }
    //, logo: file
});

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;