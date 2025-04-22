import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useUser } from '../contexts/UserContext';
import Healthy365Nav from '../components/common/Healthy365Nav';
import Header from '../components/common/Header';

const WhatsApp = () => {
  const { getTextSizeClass, getColorScheme } = useAccessibility();
  const { whatsappConnected, connectWhatsapp, disconnectWhatsapp } = useUser();
  const colorScheme = getColorScheme();
  const navigate = useNavigate();
  
  // State for phone number input
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  
  // State for notification preferences
  const [notificationPreferences, setNotificationPreferences] = useState({
    eventReminders: true,
    groupMessages: true,
    announcements: true,
    emergencyAlerts: true,
    dailyDigest: false
  });
  
  // Handle connecting to WhatsApp
  const handleConnect = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate phone number (simple validation for demo)
    if (!phoneNumber || phoneNumber.length < 8) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      connectWhatsapp(phoneNumber);
      setIsConnecting(false);
    }, 1500);
  };
  
  // Handle disconnecting from WhatsApp
  const handleDisconnect = () => {
    disconnectWhatsapp();
  };
  
  // Handle preference changes
  const handlePreferenceChange = (preference) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [preference]: !notificationPreferences[preference]
    });
  };
  
  // Mock announcements
  const announcements = [
    {
      title: "Morning Tai Chi Session",
      date: "Tomorrow, 8:00 AM",
      content: "Don't forget to bring water and wear comfortable clothing. We'll meet at Bishan Community Centre."
    },
    {
      title: "New Crocheting Pattern Available",
      date: "Friday, 10:00 AM",
      content: "Silver Crafters: The new pattern is available. Please bring blue yarn if you'd like to try it."
    },
    {
      title: "AMK Karaoke Session Changed",
      date: "Monday, 3:00 PM",
      content: "Our session has been moved to Room B due to maintenance in Room A."
    }
  ];
  
  return (
    <div className={`${colorScheme.bg} min-h-screen`}>
      {/* Add consistent Header component */}
      <Header 
        title="WhatsApp" 
        showBack={true}
      />
      
      <section className="py-4">
        <div className="container mx-auto px-4">
          <p className={`${colorScheme.text} text-xl mb-6 ${getTextSizeClass()}`}>
            Get activity updates and communicate with your groups through WhatsApp.
          </p>
          
          {/* WhatsApp connection card */}
          <div className="card mb-8">
            <h2 className={`${colorScheme.text} text-2xl font-bold mb-4 ${getTextSizeClass()}`}>
              {whatsappConnected ? 'WhatsApp Connected' : 'Connect Your WhatsApp'}
            </h2>
            
            {whatsappConnected ? (
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <span className="text-3xl">✅</span>
                  </div>
                  <div>
                    <p className={`${colorScheme.text} text-lg font-medium ${getTextSizeClass()}`}>
                      Your WhatsApp account is connected
                    </p>
                    <p className={`${colorScheme.text} ${getTextSizeClass()}`}>
                      You will receive notifications about your events and groups
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleDisconnect}
                  className="btn-secondary rounded-lg px-6 py-3"
                >
                  Disconnect WhatsApp
                </button>
              </div>
            ) : (
              <div>
                <p className={`${colorScheme.text} mb-4 ${getTextSizeClass()}`}>
                  Connect your WhatsApp account to receive notifications about your events and communicate with your groups.
                </p>
                
                <form onSubmit={handleConnect} className="mb-4">
                  <div className="mb-4">
                    <label htmlFor="phoneNumber" className={`block ${colorScheme.text} mb-2 ${getTextSizeClass()}`}>
                      Your WhatsApp Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      placeholder="+65 9123 4567"
                      className="input-large"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {error && <p className="text-red-600 mt-2">{error}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary rounded-lg px-6 py-3 flex items-center"
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connecting...
                      </>
                    ) : (
                      'Connect WhatsApp'
                    )}
                  </button>
                </form>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className={`text-blue-800 font-medium mb-2 ${getTextSizeClass()}`}>
                    Privacy Notice
                  </h3>
                  <p className={`text-blue-800 ${getTextSizeClass()}`}>
                    We'll only send you notifications related to your selected events and groups. Your phone number is never shared with other users.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Notification preferences card - only shown when connected */}
          {whatsappConnected && (
            <div className="card mb-8">
              <h2 className={`${colorScheme.text} text-2xl font-bold mb-4 ${getTextSizeClass()}`}>
                Notification Preferences
              </h2>
              
              <p className={`${colorScheme.text} mb-4 ${getTextSizeClass()}`}>
                Customize what types of notifications you receive on WhatsApp.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className={`${colorScheme.text} font-medium ${getTextSizeClass()}`}>
                      Event Reminders
                    </p>
                    <p className={`${colorScheme.text} text-sm ${getTextSizeClass()}`}>
                      Receive reminders before your events start
                    </p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationPreferences.eventReminders}
                      onChange={() => handlePreferenceChange('eventReminders')}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-elderly-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-elderly-blue"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className={`${colorScheme.text} font-medium ${getTextSizeClass()}`}>
                      Group Messages
                    </p>
                    <p className={`${colorScheme.text} text-sm ${getTextSizeClass()}`}>
                      Receive messages from your event groups
                    </p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationPreferences.groupMessages}
                      onChange={() => handlePreferenceChange('groupMessages')}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-elderly-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-elderly-blue"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className={`${colorScheme.text} font-medium ${getTextSizeClass()}`}>
                      Announcements
                    </p>
                    <p className={`${colorScheme.text} text-sm ${getTextSizeClass()}`}>
                      Receive announcements about your events
                    </p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationPreferences.announcements}
                      onChange={() => handlePreferenceChange('announcements')}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-elderly-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-elderly-blue"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className={`${colorScheme.text} font-medium ${getTextSizeClass()}`}>
                      Emergency Alerts
                    </p>
                    <p className={`${colorScheme.text} text-sm ${getTextSizeClass()}`}>
                      Receive alerts about cancellations or important changes
                    </p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationPreferences.emergencyAlerts}
                      onChange={() => handlePreferenceChange('emergencyAlerts')}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-elderly-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-elderly-blue"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className={`${colorScheme.text} font-medium ${getTextSizeClass()}`}>
                      Daily Digest
                    </p>
                    <p className={`${colorScheme.text} text-sm ${getTextSizeClass()}`}>
                      Receive a daily summary instead of individual notifications
                    </p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationPreferences.dailyDigest}
                      onChange={() => handlePreferenceChange('dailyDigest')}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-elderly-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-elderly-blue"></div>
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  className="btn-primary rounded-lg px-6 py-3"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
          
          {/* Recent announcements demo - only shown when connected */}
          {whatsappConnected && (
            <div className="card">
              <h2 className={`${colorScheme.text} text-2xl font-bold mb-4 ${getTextSizeClass()}`}>
                Recent Announcements
              </h2>
              
              <p className={`${colorScheme.text} mb-6 ${getTextSizeClass()}`}>
                These announcements were sent to your WhatsApp number.
              </p>
              
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-2">
                      <h3 className={`${colorScheme.text} font-bold ${getTextSizeClass()}`}>
                        {announcement.title}
                      </h3>
                      <span className="text-gray-500">{announcement.date}</span>
                    </div>
                    <p className={`${colorScheme.text} ${getTextSizeClass()}`}>
                      {announcement.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Add padding at the bottom to account for the navigation bar */}
      <div className="h-20"></div>
      
      {/* Bottom Navigation */}
      <Healthy365Nav />
    </div>
  );
};

export default WhatsApp;