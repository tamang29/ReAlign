import Subscription from "../models/subscriptionModel.js";

const createSubscription = async(req, res)=>{
    const {level, price, comment, start, end}= req.body;
    try{
        const subscription = await Subscription.create({level, price, comment, start, end});
        res.status(200).json(subscription);
    }catch(error){
        res.status(400).json(error);
    }
};

const getAllSubscription = async(req, res)=>{
    try{
        const subscriptions = await Subscription.find({});
        res.status(200).json(subscriptions);
    }catch(error){
        res.status(400).json(error);
    }
};

const getSubscriptionById = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (subscription == null) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.json(subscription);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateSubscription = async (req, res) => {
    try {
        // Find subscription by ID and update it with the new data
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Options to return the updated document and run validators
        );

        // Check if the subscription was found and updated
        if (!updatedSubscription) {
            return res.status(404).json({ message: 'Subscription not found or could not be updated' });
        }

        // Send the updated subscription as the response
        res.status(200).json(updatedSubscription);
    } catch (error) {
        // Handle and log the error properly without circular references
        console.error('Error updating subscription:', error.message);
        res.status(400).json({ message: 'Error updating subscription', error: error.message });
    }
};

export { createSubscription, getAllSubscription, getSubscriptionById, updateSubscription };