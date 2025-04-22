import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';

const NotificationCenter = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    clearAllNotifications, 
    getUnreadNotificationCount 
  } = useUser();
  
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    // Mark all as read when opened
    if (!isOpen) {
      notifications.forEach(notification => {
        if (!notification.read) {
          markNotificationAsRead(notification.id);
        }
      });
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'buddyRequest':
        return '👋';
      case 'buddyAccepted':
        return '🤝';
      case 'activityInvite':
        return '📅';
      case 'buddyRsvp':
        return '✅';
      default:
        return '📣';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button 
        onClick={toggleNotifications}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {/* Notification Badge */}
        {getUnreadNotificationCount() > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {getUnreadNotificationCount()}
          </span>
        )}
      </button>
      
      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
          <div className="py-2 px-3 bg-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
            <button 
              onClick={clearAllNotifications}
              className="text-xs text-blue-500 hover:text-blue-700"
            >
              Clear All
            </button>
          </div>
          
          <div className="divide-y divide-gray-200">
            {notifications.length === 0 ? (
              <div className="py-4 px-3 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`py-3 px-3 hover:bg-gray-50 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                >
                  <div className="flex items-start">
                    <div className="mr-2 text-lg">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTime(notification.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;