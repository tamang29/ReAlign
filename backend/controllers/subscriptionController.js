import Subscription from "../models/subscriptionModel.js";

const createSubscription = async(req, res)=>{
    const {level, price, comment, start, end}= req.body;
    try{
        const subscription = await Subscription.create({level, price, comment, start, end});
        res.status(200).json(subscription);
    }catch(error){
        res.status(400).json(error);
    }
}
const getAllSubscription = async(req, res)=>{
    try{
        const subscriptions = await Subscription.find({});
        res.status(200).json(subscriptions);
    }catch(error){
        res.status(400).json(error);
    }
}

export {createSubscription, getAllSubscription};