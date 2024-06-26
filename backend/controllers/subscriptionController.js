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

export {createSubscription, getAllSubscription, getSubscriptionById};