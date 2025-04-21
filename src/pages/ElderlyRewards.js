import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import Healthy365Nav from '../components/common/Healthy365Nav';

const ElderlyRewards = () => {
  const navigate = useNavigate();
  const { getTextSizeClass } = useAccessibility();
  
  // Current challenge data
  const [currentChallenge, setCurrentChallenge] = useState({
    name: "Sign up for social events with friends 2025",
    categories: ["Creative", "Mental", "Social"],
    selectedCategory: "Social",
    dateRange: "6 Mar 2025 – 12 Mar 2025",
    stamps: [
      // Row 1
      { id: 1, type: "activity", collected: true },
      { id: 2, type: "activity", collected: true },
      { id: 3, type: "activity", collected: true },
      { id: 4, type: "activity", collected: true },
      { id: 5, type: "gift", collected: true },
      // Row 2
      { id: 6, type: "activity", collected: true },
      { id: 7, type: "gift", collected: true },
      { id: 8, type: "activity", collected: false },
      { id: 9, type: "activity", collected: false },
      { id: 10, type: "gift", collected: false },
      // Row 3
      { id: 11, type: "number", number: 11, collected: false },
      { id: 12, type: "number", number: 12, collected: false },
      { id: 13, type: "number", number: 13, collected: false },
      { id: 14, type: "number", number: 14, collected: false },
      { id: 15, type: "gift", collected: true },
    ],
    collectedCount: 7,
    startDate: "16 Jan 2025"
  });
  
  const handleBack = () => {
    navigate('/about-elderlink');
  };
  
  const handleCategorySelect = (category) => {
    setCurrentChallenge({...currentChallenge, selectedCategory: category});
  };
  
  // Render stamp based on its type and collection status
  const renderStamp = (stamp) => {
    if (!stamp.collected) {
      if (stamp.type === "number") {
        return (
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-400">
            {stamp.number}
          </div>
        );
      }
      return <div className="h-10 w-10 rounded-full bg-gray-100"></div>;
    }
    
    if (stamp.type === "activity") {
      return (
        <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center">
          <div className="h-7 w-7 rounded-full bg-black"></div>
        </div>
      );
    } else if (stamp.type === "gift") {
      return (
        <div className="h-10 w-10 rounded-full bg-blue-300 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 012 2v1a2 2 0 01-2 2h-1v3a3 3 0 01-3 3H7a3 3 0 01-3-3V9H2a2 2 0 01-2-2V8a2 2 0 012-2h1.17A3 3 0 015 5zm10 2H5a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1z" clipRule="evenodd" />
            <path d="M10 7v8m-5-4h10" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
      );
    }
  };
  
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Header - Yellow background */}
      <div className="bg-yellow-400 px-4 py-5 text-gray-800">
        <div className="flex items-center">
          <button onClick={handleBack} className="text-2xl mr-4">
            &lt;
          </button>
          <h1 className={`text-xl font-medium ${getTextSizeClass()}`}>Challenge Progress</h1>
        </div>
      </div>
      
      {/* Challenge Title */}
      <div className="bg-white p-6">
        <h2 className={`text-3xl font-medium text-gray-800 ${getTextSizeClass()}`}>
          {currentChallenge.name}
        </h2>
        
        {/* Categories */}
        <div className="flex space-x-8 mt-4">
          {currentChallenge.categories.map((category) => (
            <button
              key={category}
              className={`py-1 ${
                currentChallenge.selectedCategory === category
                  ? "font-medium text-gray-800 border-b-2 border-gray-800"
                  : "text-blue-500"
              } ${getTextSizeClass()}`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Stamps Collection */}
      <div className="mt-1 bg-gray-100 p-6">
        <div className="bg-white rounded p-4">
          <h3 className={`text-xl font-medium text-gray-800 text-center ${getTextSizeClass()}`}>
            Stamps collected
          </h3>
          <p className="text-center text-gray-600 mb-4">
            {currentChallenge.dateRange}
          </p>
          
          {/* Grid of stamps */}
          <div className="grid grid-cols-5 gap-4">
            {currentChallenge.stamps.map((stamp) => (
              <div key={stamp.id} className="flex justify-center">
                {renderStamp(stamp)}
              </div>
            ))}
          </div>
          
          {/* Total stamps collected */}
          <div className="flex items-center mt-8">
            <div className="h-12 w-12 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center mr-4">
              <div className="h-8 w-8 rounded-full bg-black"></div>
            </div>
            <div>
              <p className={`text-gray-800 text-lg ${getTextSizeClass()}`}>
                You have collected {currentChallenge.collectedCount} stamps
                <br />
                since {currentChallenge.startDate}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add padding at the bottom to account for the navigation bar */}
      <div className="h-20"></div>
      
      {/* Bottom Navigation */}
      <Healthy365Nav />
    </div>
  );
};

export default ElderlyRewards;