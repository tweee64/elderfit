import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import Healthy365Nav from '../components/common/Healthy365Nav';

const Explore = () => {
  const { getTextSizeClass } = useAccessibility();
  const navigate = useNavigate();

  // Function to handle navigation to Events page
  const goToEvents = () => {
    navigate('/events');
  };

  // Function to handle navigation to other pages (currently placeholder)
  const goToProgrammes = () => {
    alert('Programmes feature coming soon!');
  };

  const goToPartners = () => {
    alert('Partners feature coming soon!');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
      {/* Replace Header component with blue header to match Healthy365.js */}
      <div className="bg-blue-500 text-white p-6 text-center">
        <h1 className={`text-2xl font-bold ${getTextSizeClass()}`}>Explore</h1>
      </div>

      {/* Introduction Section */}
      <div className="bg-white p-6">
        <h2 className={`text-2xl font-bold mb-4 ${getTextSizeClass()}`}>
          Find something for you
        </h2>
        <p className={`text-gray-600 mb-6 ${getTextSizeClass()}`}>
          Discover events, programmes, and partners near you. Stay active and engaged with your community.
        </p>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search events, programmes, partners..."
            className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Quick Access Category Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Events Card */}
          <div className="bg-blue-50 rounded-xl p-4 hover:shadow-md transition duration-300 cursor-pointer" onClick={goToEvents}>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className={`text-lg font-bold text-gray-800 mb-1 ${getTextSizeClass()}`}>Events</h3>
            <p className={`text-sm text-gray-600 ${getTextSizeClass()}`}>
              Join activities and meet new people
            </p>
            <div className="mt-3 flex items-center text-blue-600">
              <span className="text-sm font-medium">Explore</span>
              <svg
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* Programmes Card */}
          <div className="bg-green-50 rounded-xl p-4 hover:shadow-md transition duration-300 cursor-pointer" onClick={goToProgrammes}>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className={`text-lg font-bold text-gray-800 mb-1 ${getTextSizeClass()}`}>Programmes</h3>
            <p className={`text-sm text-gray-600 ${getTextSizeClass()}`}>
              Ongoing series of activities
            </p>
            <div className="mt-3 flex items-center text-green-600">
              <span className="text-sm font-medium">Browse</span>
              <svg
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* Partners Card */}
          <div className="bg-purple-50 rounded-xl p-4 hover:shadow-md transition duration-300 cursor-pointer" onClick={goToPartners}>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className={`text-lg font-bold text-gray-800 mb-1 ${getTextSizeClass()}`}>Partners</h3>
            <p className={`text-sm text-gray-600 ${getTextSizeClass()}`}>
              Organizations in our network
            </p>
            <div className="mt-3 flex items-center text-purple-600">
              <span className="text-sm font-medium">Discover</span>
              <svg
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* Buddy System Card */}
          <div className="bg-yellow-50 rounded-xl p-4 hover:shadow-md transition duration-300 cursor-pointer" onClick={() => navigate('/buddies')}>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className={`text-lg font-bold text-gray-800 mb-1 ${getTextSizeClass()}`}>Buddy System</h3>
            <p className={`text-sm text-gray-600 ${getTextSizeClass()}`}>
              Find partners for activities
            </p>
            <div className="mt-3 flex items-center text-yellow-600">
              <span className="text-sm font-medium">Connect</span>
              <svg
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Near You Section */}
      <div className="p-6">
        <h2 className={`text-xl font-bold mb-4 ${getTextSizeClass()}`}>
          Near You
        </h2>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mb-2">EVENT</span>
                <h3 className={`font-semibold ${getTextSizeClass()}`}>Morning Tai Chi</h3>
              </div>
              <span className="text-xs text-gray-500">500m away</span>
            </div>
            <p className={`text-sm text-gray-600 mb-2 ${getTextSizeClass()}`}>
              Toa Payoh Central Community Club
            </p>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Tomorrow, 8:00 AM</span>
              <span className="text-green-600 font-medium">5 spots left</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mb-2">PROGRAMME</span>
                <h3 className={`font-semibold ${getTextSizeClass()}`}>Digital Literacy Course</h3>
              </div>
              <span className="text-xs text-gray-500">1.2km away</span>
            </div>
            <p className={`text-sm text-gray-600 mb-2 ${getTextSizeClass()}`}>
              Bishan Public Library
            </p>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Every Wed, 10:00 AM</span>
              <span className="text-green-600 font-medium">3 spots left</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={goToEvents}
          className="w-full py-3 bg-transparent text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-300"
        >
          View More Near You
        </button>
      </div>

      {/* Bottom space for nav */}
      <div className="h-20"></div>

      {/* Navigation */}
      <Healthy365Nav />
    </div>
  );
};

export default Explore;