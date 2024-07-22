import Notification from '../models/notificationModel.js';

export const getNotificationsByUser = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.userId, read: false });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const markNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.notificationId, { read: true }, { new: true });
        res.status(200).json(notification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
