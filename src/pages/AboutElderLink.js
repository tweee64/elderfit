import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Healthy365Nav from '../components/common/Healthy365Nav';
import { useAccessibility } from '../contexts/AccessibilityContext';

const AboutElderLink = () => {
  const { getTextSizeClass } = useAccessibility();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  
  const handleRewardsClick = () => {
    showToastMessage('Navigating to Rewards page');
    navigate('/about-rewards');
  };
  
  const handleWhatsAppClick = () => {
    showToastMessage('Opening WhatsApp chat');
    navigate('/elderlink');
  };
  
  const handleBuddySystemClick = () => {
    showToastMessage('Exploring Buddy System');
    navigate('/buddies');
  };
  
  const handleActivityClick = (activity) => {
    showToastMessage(`Exploring ${activity}`);
    navigate('/events');
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity opacity-90">
          <p className="text-sm">{toastMessage}</p>
        </div>
      )}
      
      {/* Update header to match consistent style across app */}
      <div className="bg-blue-500 text-white p-6 text-center">
        <h1 className={`text-2xl font-bold ${getTextSizeClass()}`}>ElderLink</h1>
      </div>
      
      <main className="p-4">
        {/* Feature Grid Layout */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Platform Intro Card */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className={`text-lg font-semibold text-blue-600 ${getTextSizeClass()}`}>ElderLink Platform</h2>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex justify-between space-x-2 mb-2">
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-xs font-medium text-center">Stay Connected</span>
                </div>
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-xs font-medium text-center">Stay Healthy</span>
                </div>
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-xs font-medium text-center">Track Progress</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-600 text-center">
                A digital companion integrated with Healthy 365
              </p>
            </div>
          </div>

          {/* Rewards Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="h-20 bg-yellow-400 relative overflow-hidden">
              <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)', backgroundSize: '50px 50px'}}></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-200 opacity-50 absolute -bottom-4 -right-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 9H10a1 1 0 110-2h3.586l-2.293-2.293A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-3">
              <h3 className={`text-sm font-semibold text-gray-800 mb-1 ${getTextSizeClass()}`}>Rewards</h3>
              <ul className="text-xs text-gray-600 mb-3 pl-4 list-disc">
                <li>Earn points from activities</li>
                <li>Get exclusive rewards</li>
              </ul>
              <button 
                onClick={handleRewardsClick}
                className="w-full bg-yellow-500 text-white text-xs py-1.5 px-3 rounded-md font-medium hover:bg-yellow-600 transition-colors"
              >
                View Rewards
              </button>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="h-20 bg-green-500 relative overflow-hidden">
              <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)', backgroundSize: '50px 50px'}}></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-200 opacity-50 absolute -bottom-4 -right-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-3">
              <h3 className={`text-sm font-semibold text-gray-800 mb-1 ${getTextSizeClass()}`}>WhatsApp Channel</h3>
              <p className="text-xs text-gray-600 mb-3">
                Stay connected with peers and get event updates
              </p>
              <button 
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 text-white text-xs py-1.5 px-3 rounded-md font-medium hover:bg-green-600 transition-colors"
              >
                Chat Now
              </button>
            </div>
          </div>

          {/* Buddy System Card - Wider, spans 2 columns */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md">
            <div className="flex">
              <div className="w-1/3 bg-green-100 p-4 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-3xl mb-1">👥</span>
                  <span className="text-xs font-semibold text-green-800">Buddy System</span>
                </div>
              </div>
              <div className="w-2/3 p-3">
                <div className="flex items-center mb-2">
                  <div className="bg-green-100 rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-700">Double points with buddies</p>
                </div>
                <div className="bg-green-50 rounded-md px-2 py-1 mb-2">
                  <p className="text-xs text-green-800 font-medium">
                    Earth Month 2025 - 2x points bonus!
                  </p>
                </div>
                <button 
                  onClick={handleBuddySystemClick}
                  className="w-full bg-green-600 text-white text-xs py-1.5 px-3 rounded-md font-medium hover:bg-green-700 transition-colors"
                >
                  Find a Buddy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Section - Horizontal Scrollable Cards */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-700">ACTIVITIES</h2>
            <span className="text-xs text-blue-500" onClick={() => navigate('/events')}>See all</span>
          </div>
          
          <div className="flex overflow-x-auto pb-2 space-x-3 hide-scrollbar">
            {/* Activity Card 1 */}
            <div className="flex-shrink-0 w-32 bg-white rounded-lg shadow-sm overflow-hidden" 
                 onClick={() => handleActivityClick('Fitness')}>
              <div className="h-24 bg-blue-400 relative">
                <img src="/images/taichi.jpeg" alt="Tai Chi" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-2 left-2">
                  <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                    7 Available
                  </span>
                </div>
              </div>
              <div className="p-2">
                <h3 className="text-xs font-medium text-gray-800">Daily Fitness</h3>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                  <div className="bg-blue-500 h-1.5 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
            
            {/* Activity Card 2 */}
            <div className="flex-shrink-0 w-32 bg-white rounded-lg shadow-sm overflow-hidden"
                 onClick={() => handleActivityClick('Garden')}>
              <div className="h-24 bg-green-400 relative">
                <img src="/images/gardening.jpeg" alt="Gardening" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-2 left-2">
                  <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                    Earth Month
                  </span>
                </div>
              </div>
              <div className="p-2">
                <h3 className="text-xs font-medium text-gray-800">Gardening</h3>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                  <div className="bg-green-500 h-1.5 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
            
            {/* Activity Card 3 */}
            <div className="flex-shrink-0 w-32 bg-white rounded-lg shadow-sm overflow-hidden"
                 onClick={() => handleActivityClick('Yoga')}>
              <div className="h-24 bg-purple-400 relative">
                <img src="/images/yoga.jpg" alt="Yoga" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-2 left-2">
                  <span className="bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded">
                    New
                  </span>
                </div>
              </div>
              <div className="p-2">
                <h3 className="text-xs font-medium text-gray-800">Outdoor Yoga</h3>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                  <div className="bg-purple-500 h-1.5 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
            
            {/* Activity Card 4 */}
            <div className="flex-shrink-0 w-32 bg-white rounded-lg shadow-sm overflow-hidden"
                 onClick={() => handleActivityClick('Craft')}>
              <div className="h-24 bg-yellow-400 relative">
                <img src="/images/crocheting.jpg" alt="Crocheting" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-2 left-2">
                  <span className="bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded">
                    Popular
                  </span>
                </div>
              </div>
              <div className="p-2">
                <h3 className="text-xs font-medium text-gray-800">Craft Circles</h3>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                  <div className="bg-yellow-500 h-1.5 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Access Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-20">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">QUICK ACCESS</h2>
          <div className="grid grid-cols-4 gap-3">
            <div 
              className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              onClick={() => navigate('/events')}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-center">Events</span>
            </div>
            <div 
              className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-center">Profile</span>
            </div>
            <div 
              className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              onClick={() => navigate('/groups')}
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <span className="text-xs text-center">Groups</span>
            </div>
            <div 
              className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              onClick={() => navigate('/explore')}
            >
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-center">Explore</span>
            </div>
          </div>
        </div>
      </main>
      
      <Healthy365Nav />
      
      {/* Custom styles for hiding scrollbar but allowing scroll */}
      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AboutElderLink;