import mongoose from "mongoose";
const Schema = mongoose.Schema;
const organizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    users: [userSchema],
    payment: [{
        paymentMethod: {
            type: String,
            enum: ["PayPal", "Credit Card", "Invoice"],
            required: true
        },
        paymentDetails: String
    }],
    subscription: subscriptionSchema
    //, logo: file
});

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;