import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { token } = useContext(AuthContext);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        'https://work-hive-project.vercel.app/api/v1/notifications',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setNotifications(response.data.data);
      setUnreadCount(response.data.data.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Handle notification action (accept/reject)
  const handleNotificationAction = async (notificationId, status) => {
    try {
      await axios.patch(
        `https://work-hive-project.vercel.app/api/v1/notifications/${notificationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update local state
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, status, read: true }
            : notification
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error handling notification action:', error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `https://work-hive-project.vercel.app/api/v1/notifications/${notificationId}`,
        { read: true },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Fetch notifications on mount and when token changes
  useEffect(() => {
    if (token) {
      fetchNotifications();
      // Set up polling for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const value = {
    notifications,
    unreadCount,
    fetchNotifications,
    handleNotificationAction,
    markAsRead
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 