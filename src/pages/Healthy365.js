import React, { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useNavigate } from 'react-router-dom';
import Healthy365Nav from '../components/common/Healthy365Nav';

const Healthy365 = () => {
  const { getTextSizeClass } = useAccessibility();
  // const colorScheme = getColorScheme();
  const navigate = useNavigate();
  
  // States for interactive elements
  // const [ setActiveTab] = useState('home');
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Updated today, 9:27 AM');
  const [healthPoints, setHealthPoints] = useState(1080);
  const [rewards] = useState(4);
  const [steps, setSteps] = useState({current: 5375, goal: 10000});
  const [mvpa, setMvpa] = useState({current: 17, goal: 30});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Handle sync button click
  const handleSync = () => {
    setSyncing(true);
    setToastMessage('Syncing with fitness tracker...');
    setShowToast(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Simulate random new steps (between 100-500 new steps)
      const newSteps = steps.current + Math.floor(Math.random() * 400) + 100;
      // Simulate random MVPA increase (between 1-5 minutes)
      const newMvpa = mvpa.current + Math.floor(Math.random() * 5) + 1;
      
      setSteps({...steps, current: newSteps > steps.goal ? steps.goal : newSteps});
      setMvpa({...mvpa, current: newMvpa > mvpa.goal ? mvpa.goal : newMvpa});
      
      // Update health points based on new activity
      const pointsEarned = Math.floor(Math.random() * 50) + 10;
      setHealthPoints(healthPoints + pointsEarned);
      
      // Set new last sync time to current time
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const timeString = `Updated today, ${formattedHours}:${formattedMinutes} ${ampm}`;
      
      setLastSyncTime(timeString);
      setSyncing(false);
      setToastMessage(`Sync complete! Earned ${pointsEarned} Healthpoints`);
      
      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }, 2000);
  };
  
  // Handle bottom tab navigation
  // const handleTabChange = (tab) => {
  //   setActiveTab(tab);
    
  //   // Show toast message when switching tabs
  //   setToastMessage(`${tab.charAt(0).toUpperCase() + tab.slice(1)} section selected`);
  //   setShowToast(true);
    
  //   // Auto-hide toast after 2 seconds
  //   setTimeout(() => {
  //     setShowToast(false);
  //   }, 2000);
    
  //   // Navigate to the corresponding route
  //   switch(tab) {
  //     case 'explore':
  //       navigate('/explore');
  //       break;
  //     case 'rewards':
  //       navigate('/rewards');
  //       break;
  //     case 'scan':
  //       // For now, just show a toast since we don't have a scan page
  //       setToastMessage('Scan functionality coming soon!');
  //       setShowToast(true);
  //       break;
  //     case 'profile':
  //       // For now, just show a toast since we don't have a profile page
  //       setToastMessage('Profile page coming soon!');
  //       setShowToast(true);
  //       break;
  //     default:
  //       // 'home' tab - stay on the current page
  //       break;
  //   }
  // };
  
  // Handle stamp section click
  const handleStampClick = (type, stamps) => {
    setToastMessage(`You need ${stamps} ${type} stamps to earn a reward`);
    setShowToast(true);
    
    // Auto-hide toast after 2 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };
  
  // Handle health points section click
  const handleHealthPointsClick = () => {
    setToastMessage('View your Healthpoints history and redemption options');
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };
  
  // Handle rewards section click
  const handleRewardsClick = () => {
    setToastMessage('You have 4 rewards available to redeem');
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
    navigate('/rewards');
  };
  
  // Handle challenge banner click
  const handleChallengeClick = () => {
    setToastMessage('Challenge details: Collect stamps by making healthy choices');
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen relative">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity opacity-90">
          <p className="text-sm">{toastMessage}</p>
        </div>
      )}
      
      {/* Main app container simulating a phone screen */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header - Blue background */}
        <div className="bg-blue-500 text-white p-6 text-center">
          <h1 className={`text-2xl font-bold ${getTextSizeClass()}`}>Hello!</h1>
        </div>

        {/* Health Points and Rewards Card */}
        <div className="bg-white p-4">
          <div className="flex bg-white rounded-lg shadow">
            <div 
              className="w-1/2 p-4 border-r border-gray-200 text-center cursor-pointer hover:bg-gray-50"
              onClick={handleHealthPointsClick}
            >
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-red-500">{healthPoints.toLocaleString()}</span>
                <span className="text-red-500 ml-1">❤️</span>
              </div>
              <p className="text-gray-600 text-sm">My Healthpoints</p>
            </div>
            <div 
              className="w-1/2 p-4 text-center cursor-pointer hover:bg-gray-50"
              onClick={handleRewardsClick}
            >
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold">{rewards}</span>
                <span className="text-blue-500 ml-1">🎁</span>
              </div>
              <p className="text-gray-600 text-sm">My Rewards</p>
            </div>
          </div>
        </div>

        {/* Activity Summary Section */}
        <div className="p-4">
          <h2 className="text-gray-500 text-sm font-semibold mb-2">ACTIVITY SUMMARY</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            {/* Steps Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Steps</span>
                </div>
                <span className="text-gray-700">{steps.current.toLocaleString()} / {steps.goal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${(steps.current / steps.goal) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* MVPA Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">MVPA</span>
                </div>
                <span className="text-gray-700">{mvpa.current} / {mvpa.goal} min</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-yellow-400 h-2.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${(mvpa.current / mvpa.goal) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Last Updated and Sync */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center text-gray-500 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{lastSyncTime}</span>
              </div>
              <button 
                className={`${syncing ? 'bg-blue-200' : 'bg-blue-100'} text-blue-500 px-4 py-2 rounded-md font-medium text-sm flex items-center hover:bg-blue-200 transition-colors`}
                onClick={handleSync}
                disabled={syncing}
              >
                {syncing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Syncing...
                  </>
                ) : 'Sync now'}
              </button>
            </div>
          </div>
        </div>

        {/* Challenge Progress Section */}
        <div className="p-4">
          <h2 className="text-gray-500 text-sm font-semibold mb-2">CHALLENGE PROGRESS</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Challenge Header */}
            <div 
              className="bg-orange-600 text-white p-4 flex justify-between items-center cursor-pointer hover:bg-orange-700 transition-colors"
              onClick={handleChallengeClick}
            >
              <div>
                <h3 className="font-bold text-lg">Eat, Drink, Shop</h3>
                <h3 className="font-bold text-lg">Healthy Challenge,</h3>
                <h3 className="font-bold text-lg">2020 Always On!</h3>
              </div>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-orange-200">
                <div className="text-orange-500 text-center">
                  <span className="block text-lg font-bold">Eat</span>
                  <span className="block text-xs">HEALTHY CHALLENGE</span>
                </div>
              </div>
            </div>

            {/* Challenge Date */}
            <div className="bg-yellow-200 text-yellow-800 p-2 text-center">
              <span className="text-sm font-medium">This week: 4 May - 10 May</span>
            </div>

            {/* Stamps Section */}
            <div className="flex p-4">
              <div 
                className="w-1/3 text-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => handleStampClick('Eat', 1)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-yellow-500 text-2xl">🍽️</span>
                  <span className="font-bold text-lg mt-1">1 stamp</span>
                  <span className="text-gray-500 text-xs">to win a reward</span>
                </div>
              </div>
              <div 
                className="w-1/3 text-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => handleStampClick('Drink', 3)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-blue-500 text-2xl">☕</span>
                  <span className="font-bold text-lg mt-1">3 stamps</span>
                  <span className="text-gray-500 text-xs">to win a reward</span>
                </div>
              </div>
              <div 
                className="w-1/3 text-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => handleStampClick('Shop', 5)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-red-500 text-2xl">🛒</span>
                  <span className="font-bold text-lg mt-1">5 stamps</span>
                  <span className="text-gray-500 text-xs">to win a reward</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use the consistent shared navigation component */}
        <Healthy365Nav />
        
        {/* Add padding at the bottom to account for the navigation bar */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Healthy365;