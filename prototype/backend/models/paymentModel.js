import mongoose from "mongoose";
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    organization: organizationSchema,
    subscription: subscriptionSchema,
    receivedOn: Date
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;