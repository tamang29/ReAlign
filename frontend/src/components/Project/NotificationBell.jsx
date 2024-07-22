import React, { useState, useEffect } from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const NotificationBell = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData._id;
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notifications/${userId}`);
                const notifications = await response.json();
                setNotifications(notifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [userId]);

    const markNotificationAsRead = async (notificationId, projectId) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/notifications/${notificationId}/read`, {
                method: 'PUT',
            });

            setNotifications(prevNotifications =>
                prevNotifications.map(notification =>
                    notification._id === notificationId ? { ...notification, read: true } : notification
                )
            );

            // Redirect to the specific project requirement page
            window.location.href = `/dashboard/requirement/${projectId}`;
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="link" id="notification-dropdown" className='bell-drop'style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon className="bell" icon={faBell} size="lg" />
                {notifications.some(notification => !notification.read) && (
                    <Badge variant="danger">{notifications.filter(notification => !notification.read).length}</Badge>
                )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {notifications.length === 0 ? (
                    <Dropdown.Item disabled>No notifications</Dropdown.Item>
                ) : (
                    notifications.map(notification => (
                        <Dropdown.Item
                            key={notification._id}
                            onClick={() => markNotificationAsRead(notification._id, notification.project)}
                            className={notification.read ? 'text-muted' : ''}
                        >
                            {notification.message}
                        </Dropdown.Item>
                    ))
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotificationBell;
