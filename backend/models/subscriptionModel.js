import mongoose from "mongoose";
const Schema = mongoose.Schema;
const subscriptionSchema = new Schema({
    level: {
        type: String,
        enum: ["Explorer", "Pioneer", "Navigator", "Voyager", "Enterprize"],
    }, 
    price: Number,
    comment: String, // for custom Enterprize
    start: Date,
    end: Date
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
