import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import Healthy365Nav from '../components/common/Healthy365Nav';

const Explore = () => {
  const { getTextSizeClass, getColorScheme } = useAccessibility();
  const colorScheme = getColorScheme();
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
      {/* Header - Yellow background */}
      <div className="bg-yellow-400 text-gray-800 p-6">
        <h1 className={`text-3xl font-bold ${getTextSizeClass()}`}>Explore</h1>
      </div>

      {/* Introduction Section */}
      <div className="bg-white p-6">
        <p className={`text-gray-700 text-xl ${getTextSizeClass()}`}>
          Explore and participate in various Health Promotion Board activities to 
          get healthier and feel great!
        </p>
      </div>

      {/* Events Card - Now clickable */}
      <div className="p-4">
        <div 
          className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          onClick={goToEvents}
        >
          <h2 className={`text-gray-700 text-3xl font-bold p-4 ${getTextSizeClass()}`}>
            Events
          </h2>
          <div className="w-full">
            <img 
              src="/images/taichi.jpeg" 
              alt="People practicing Tai Chi" 
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <p className={`text-gray-700 text-lg ${getTextSizeClass()}`}>
              Get healthier everyday by participating in any health event of your choice for free.
            </p>
          </div>
        </div>
      </div>

      {/* Programmes Card */}
      <div className="p-4">
        <div 
          className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          onClick={goToProgrammes}
        >
          <h2 className={`text-gray-700 text-3xl font-bold p-4 ${getTextSizeClass()}`}>
            Programmes
          </h2>
          <div className="w-full">
            <img 
              src="/images/yoga.jpg" 
              alt="People practicing yoga" 
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <p className={`text-gray-700 text-lg ${getTextSizeClass()}`}>
              Join a Health Promotion Board's programme to be a part of healthy community and earn rewards.
            </p>
          </div>
        </div>
      </div>

      {/* Partners Card */}
      <div className="p-4">
        <div 
          className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          onClick={goToPartners}
        >
          <h2 className={`text-gray-700 text-3xl font-bold p-4 ${getTextSizeClass()}`}>
            Partners
          </h2>
          <div className="w-full">
            <img 
              src="/images/gardening.jpeg" 
              alt="People gardening together" 
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <p className={`text-gray-700 text-lg ${getTextSizeClass()}`}>
              Link your partner accounts to earn more rewards and Healthpoints!
            </p>
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

export default Explore;