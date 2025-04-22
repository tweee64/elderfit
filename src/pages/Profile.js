import React from 'react';
import Healthy365Nav from '../components/common/Healthy365Nav';

const Profile = () => {
  
  const handleSettings = () => {
    // Navigate to settings page
  };
  
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Replace white header with blue header to match Healthy365.js */}
      <div className="bg-blue-500 text-white p-6 text-center">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <button onClick={handleSettings} className="w-8 h-8">
            <svg className="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* User greeting */}
      <div className="px-4 pt-8 pb-6 text-center">
        <h2 className="text-3xl font-bold text-blue-500 mb-1">Hello,</h2>
        <p className="text-3xl text-gray-500 font-medium">Pham Thu Thuy</p>
      </div>

      {/* Cards Section */}
      <div className="p-4 space-y-4">
        {/* QR Code Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
          <div className="w-16 h-16 mr-3">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="20" width="60" height="60" fill="none" stroke="black" strokeWidth="2" />
              <path d="M30,30 L50,30 L50,50 L30,50 Z" fill="none" stroke="black" strokeWidth="2" />
              <path d="M60,30 L70,30 L70,40 L60,40 Z" fill="none" stroke="black" strokeWidth="2" />
              <path d="M30,60 L40,60 L40,70 L30,70 Z" fill="none" stroke="black" strokeWidth="2" />
              <path d="M50,50 L70,50 L70,70 L50,70 Z" fill="none" stroke="black" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-800">My QR Code</h3>
          </div>
        </div>

        {/* Messages Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3 flex items-center justify-center">
              <svg className="w-full h-full text-yellow-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Messages</h3>
              <p className="text-gray-700">No new messages</p>
            </div>
          </div>
        </div>

        {/* Health Declaration */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start">
            <div className="w-10 h-10 mr-3 mt-1">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <g fill="none">
                  <path d="M7,15 C7.5,12 10,10 10,10 L10,15 L12.5,15.5 L14,15 L14,10 C14,10 16.5,12 17,15" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="8" r="3" fill="#FFD700"/>
                  <path d="M10,15 L10,20" stroke="#20B2AA" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M14,15 L14,20" stroke="#20B2AA" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="20" r="2" fill="#20B2AA"/>
                </g>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Health Declaration</h3>
              <div className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full inline-block">
                VALID TILL 21 APR 2026
              </div>
            </div>
          </div>
        </div>

        {/* Added Profiles */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3">
              <svg className="w-full h-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="8" r="4" fill="#FFD700" />
                <path d="M10,12 C6.5,12 4,14.5 4,17" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="15" r="3" fill="#20B2AA" />
                <path d="M16,18 C13.5,18 11.5,19.5 11.5,21" stroke="#20B2AA" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Added Profiles</h3>
              <p className="text-gray-700">No child added</p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start">
            <div className="w-10 h-10 mr-3">
              <svg className="w-full h-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="12" r="3" fill="#FF9999" />
                <circle cx="16" cy="8" r="3" fill="#FFCC66" />
                <circle cx="16" cy="16" r="3" fill="#66CCFF" />
                <path d="M8,15 Q12,20 16,19" stroke="#FF9999" strokeWidth="2" strokeLinecap="round" />
                <path d="M16,5 Q12,10 8,9" stroke="#66CCFF" strokeWidth="2" strokeLinecap="round" />
                <path d="M19,8 Q14,12 19,16" stroke="#FFCC66" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Preferences</h3>
              <p className="text-gray-700">Share your preferences for a personalised experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Primary Information</h2>
      </div>
      
      {/* Navigation */}
      <div className="h-16"></div> {/* Spacer for the navigation bar */}
      <Healthy365Nav />
    </div>
  );
};

export default Profile;