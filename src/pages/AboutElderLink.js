import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Healthy365Nav from '../components/common/Healthy365Nav';
import { useAccessibility } from '../contexts/AccessibilityContext';

const AboutElderLink = () => {
  const { getTextSizeClass } = useAccessibility();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const handleBack = () => {
    navigate('/');
  };
  
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  
  const handleRewardsClick = () => {
    showToastMessage('Navigating to Rewards page');
    navigate('/rewards');
  };
  
  const handleWhatsAppClick = () => {
    showToastMessage('Opening WhatsApp chat');
    navigate('/elderlink');
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen relative">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity opacity-90">
          <p className="text-sm">{toastMessage}</p>
        </div>
      )}
      
      {/* Header - Blue background to match Healthy365 */}
      <div className="bg-blue-500 text-white p-6">
        <div className="flex items-center">
          <button onClick={handleBack} className="text-2xl mr-4">
            &lt;
          </button>
          <h1 className={`text-2xl font-bold ${getTextSizeClass()}`}>About ElderLink</h1>
        </div>
      </div>
      
      <main className="p-4">
        <section className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className={`text-xl font-semibold text-blue-600 mb-2 ${getTextSizeClass()}`}>ElderLink Platform</h2>
          <p className={`text-gray-700 mb-4 ${getTextSizeClass()}`}>
            A Digital Companion Platform Integrated with Healthy 365.
          </p>
          <p className={`text-gray-700 ${getTextSizeClass()}`}>
            ElderLink is designed to help elderly citizens stay connected, active, and healthy
            through a simple, accessible digital platform that works seamlessly with the
            Healthy 365 ecosystem.
          </p>
        </section>
        
        <section className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className={`text-xl font-semibold text-blue-600 mb-2 ${getTextSizeClass()}`}>Elderly Rewards</h2>
          <p className={`text-gray-700 ${getTextSizeClass()}`}>
            Earn points by participating in community activities, health screenings, and wellness
            programs. Redeem these points for various rewards, discounts on healthcare products,
            and exclusive access to events designed for elderly well-being.
          </p>
          <div className="mt-4 text-center">
            <button 
              onClick={handleRewardsClick}
              className="inline-block bg-blue-500 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors"
            >
              Explore Rewards
            </button>
          </div>
        </section>
        
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className={`text-xl font-semibold text-blue-600 mb-2 ${getTextSizeClass()}`}>Elderly WhatsApp Channel</h2>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl mr-3">
              <span>💬</span>
            </div>
            <div>
              <p className={`text-gray-700 ${getTextSizeClass()}`}>
                Stay connected with other seniors in your community through our dedicated WhatsApp 
                channels.
              </p>
            </div>
          </div>
          <p className={`text-gray-700 mb-4 ${getTextSizeClass()}`}>
            Get updates on local events, health tips, and engage in conversations with 
            peers who share similar interests.
          </p>
          <div className="mt-4 text-center">
            <button 
              onClick={handleWhatsAppClick}
              className="inline-block bg-blue-500 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors"
            >
              Join WhatsApp Groups
            </button>
          </div>
        </section>
        
        {/* Activity Summary Section - similar to Healthy365 */}
        <div className="mt-4">
          <h2 className="text-gray-500 text-sm font-semibold mb-2">ACTIVITIES AVAILABLE</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className={`font-semibold ${getTextSizeClass()}`}>Daily Fitness Challenges</span>
                </div>
                <span className="text-gray-700">7 available</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full w-3/4"></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span className={`font-semibold ${getTextSizeClass()}`}>Community Events</span>
                </div>
                <span className="text-gray-700">12 nearby</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-400 h-2.5 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Healthy365Nav />
      
      {/* Add padding at the bottom to account for the navigation bar */}
      <div className="h-20"></div>
    </div>
  );
};

export default AboutElderLink;