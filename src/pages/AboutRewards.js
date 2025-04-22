import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Healthy365Nav from '../components/common/Healthy365Nav';
import { useUser } from '../contexts/UserContext';
import { useAccessibility } from '../contexts/AccessibilityContext';

const AboutRewards = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('wallet');
  const { buddyActivities, buddies } = useUser();
  const { getTextSizeClass } = useAccessibility();
    
  // State for rewards data
  const [rewardsData, setRewardsData] = useState({
    totalPoints: 1200,
    buddyPoints: 0,
    regularPoints: 0,
    recentActivities: []
  });
  
  // State for active point multipliers
  const [activeMultipliers] = useState([
    {
      id: 1,
      name: "Row 1 Complete",
      multiplier: 1.5,
      description: "First row of Earth Month Challenge completed",
      expiry: new Date("2025-04-26"),
      daysLeft: 4,
      type: "stamp-pattern"
    }
  ]);
  
  // State for stamps collection
  const [stampsData] = useState({
    totalStamps: 7,
    theme: "Earth Month 2025",
    themeDescription: "Celebrate Earth Month by participating in eco-friendly and outdoor activities",
    currentChallenge: {
      name: "Earth Month Challenge 2025",
      dateRange: "1 Apr 2025 – 30 Apr 2025",
      collectedCount: 7,
      totalStamps: 15,
      progress: 46, // percentage
      stamps: [
        // Row 1 - Complete! (Earth Awareness Activities)
        { id: 1, type: "activity", collected: true, date: "2 Apr 2025", category: "sustainability", name: "Recycling Workshop" },
        { id: 2, type: "activity", collected: true, date: "5 Apr 2025", category: "outdoors", name: "Nature Walk" },
        { id: 3, type: "activity", collected: true, date: "8 Apr 2025", category: "sustainability", name: "Community Cleanup" },
        { id: 4, type: "activity", collected: true, date: "10 Apr 2025", category: "outdoors", name: "Nature Photography" },
        { id: 5, type: "gift", collected: true, date: "12 Apr 2025", category: "reward", name: "Earth Badge" },
        // Row 2 - In Progress (Gardening Activities)
        { id: 6, type: "activity", collected: true, date: "15 Apr 2025", category: "gardening", name: "Herb Planting" },
        { id: 7, type: "gift", collected: true, date: "18 Apr 2025", category: "reward", name: "Plant Seeds" },
        { id: 8, type: "activity", collected: false, category: "gardening", name: "Community Garden" },
        { id: 9, type: "activity", collected: false, category: "gardening", name: "Composting" },
        { id: 10, type: "gift", collected: false, category: "reward", name: "Gardening Kit" },
        // Row 3 - Not Started (Healthy Living Activities)
        { id: 11, type: "number", number: 11, collected: false, category: "health", name: "Outdoor Yoga" },
        { id: 12, type: "number", number: 12, collected: false, category: "health", name: "Eco-Cooking" },
        { id: 13, type: "number", number: 13, collected: false, category: "health", name: "Farmers Market" },
        { id: 14, type: "number", number: 14, collected: false, category: "health", name: "Tree Planting" },
        { id: 15, type: "gift", collected: false, category: "reward", name: "Health Pack" },
      ],
      patterns: [
        { 
          id: 1, 
          name: "Earth Awareness", 
          description: "Complete Row 1 to earn 1.5x points for all activities for 7 days",
          stampIds: [1, 2, 3, 4, 5],
          isComplete: true,
          multiplier: 1.5,
          durationDays: 7,
          completedOn: new Date("2025-04-12")
        },
        { 
          id: 2, 
          name: "Green Thumbs", 
          description: "Complete Row 2 to earn 1.75x points for gardening activities for 10 days",
          stampIds: [6, 7, 8, 9, 10],
          isComplete: false,
          multiplier: 1.75,
          durationDays: 10
        },
        { 
          id: 3, 
          name: "Earth & Health", 
          description: "Complete Row 3 to earn 2x points for health activities for 14 days",
          stampIds: [11, 12, 13, 14, 15],
          isComplete: false,
          multiplier: 2,
          durationDays: 14
        }
      ]
    }
  });
  
  // Calculate buddy rewards and apply active multipliers
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll create mock data based on buddyActivities
    
    // Generate some themed activities related to Earth Month
    const mockActivities = [
      {
        id: 101,
        title: "Tai Chi in the Park",
        date: "18 Apr 2025",
        points: 150,
        withBuddy: true,
        buddyName: buddies.length > 0 ? buddies[0].name : "Tan Mei Ling",
        category: "outdoors",
        themeMatch: true
      },
      {
        id: 102,
        title: "Sustainable Cooking Workshop",
        date: "15 Apr 2025",
        points: 100,
        withBuddy: false,
        category: "sustainability",
        themeMatch: true
      },
      {
        id: 103,
        title: "Community Garden Day",
        date: "10 Apr 2025",
        points: 120,
        withBuddy: true,
        buddyName: buddies.length > 0 ? buddies[0].name : "Tan Mei Ling",
        category: "gardening",
        themeMatch: true
      },
      {
        id: 104,
        title: "Healthcare Talk",
        date: "5 Apr 2025",
        points: 80,
        withBuddy: false,
        category: "health",
        themeMatch: false
      },
    ];
    
    // Apply multipliers to activities based on active multipliers
    const activitiesWithMultipliers = mockActivities.map(activity => {
      // Start with the base activity
      const processedActivity = { ...activity };
      
      // Apply multipliers if eligible
      activeMultipliers.forEach(multiplier => {
        if (new Date(activity.date) <= multiplier.expiry) {
          // Apply thematic multipliers only to matching categories
          if (multiplier.type === "stamp-pattern") {
            // For simplicity, we'll apply the multiplier to all activities
            // In a real implementation, you'd check if the activity matches the pattern category
            const multipliedPoints = Math.round(activity.points * multiplier.multiplier);
            processedActivity.multiplierApplied = multiplier.multiplier;
            processedActivity.originalPoints = activity.points;
            processedActivity.points = multipliedPoints;
          }
        }
      });
      
      return processedActivity;
    });
    
    // Calculate regular and buddy points
    const regularPoints = activitiesWithMultipliers
      .filter(activity => !activity.withBuddy)
      .reduce((sum, activity) => sum + activity.points, 0);
    
    const buddyPointsBase = activitiesWithMultipliers
      .filter(activity => activity.withBuddy)
      .reduce((sum, activity) => sum + activity.points, 0);
    
    // Double the buddy points to show the bonus
    const buddyPointsTotal = buddyPointsBase * 2;
    
    setRewardsData({
      totalPoints: regularPoints + buddyPointsTotal,
      buddyPoints: buddyPointsTotal,
      regularPoints: regularPoints,
      recentActivities: activitiesWithMultipliers
    });
  }, [buddies, buddyActivities, activeMultipliers]);


  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-100">
      <Healthy365Nav />
      
      {/* Blue header to match Healthy365.js */}
      <div className="bg-blue-500 text-white p-6 text-center">
        <h1 className={`text-2xl font-bold ${getTextSizeClass()}`}>Rewards</h1>
      </div>
      
      <div className="flex-grow">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 font-medium text-center ${
              activeTab === 'wallet' 
                ? 'border-b-2 border-emerald-400 text-emerald-600' 
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('wallet')}
          >
            Wallet
          </button>
          <button
            className={`flex-1 py-3 font-medium text-center ${
              activeTab === 'vouchers' 
                ? 'border-b-2 border-emerald-400 text-emerald-600' 
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('vouchers')}
          >
            Vouchers
          </button>
          <button
            className={`flex-1 py-3 font-medium text-center ${
              activeTab === 'transactions' 
                ? 'border-b-2 border-emerald-400 text-emerald-600' 
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="bg-gray-100 p-4 pb-20">
          {activeTab === 'wallet' && (
            <div className="space-y-4">
              {/* My Healthpoints Card */}
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h2 className="text-lg text-gray-500 mb-4">My Healthpoints</h2>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold mr-2">1080</span>
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <hr className="my-3" />
                <button 
                  className="text-blue-500 font-medium"
                  onClick={() => navigate('/rewards/redeem')}
                >
                  Redeem now
                </button>
              </div>

              {/* Buddy Rewards Section */}
              <div className="bg-white p-4 rounded-md shadow-sm">
                {/* Earth Month Theme Banner */}
                <div className="bg-green-50 rounded-lg p-3 border border-green-200 mb-4 flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">{stampsData.theme}</h3>
                    <p className="text-xs text-green-700">{stampsData.themeDescription}</p>
                  </div>
                </div>

                <h3 className={`text-lg font-medium text-gray-800 ${getTextSizeClass()}`}>
                  Your Buddy Rewards
                </h3>
                
                {/* Active Multipliers Section */}
                {activeMultipliers.length > 0 && (
                  <div className="mt-3 bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800">Point Boost Active!</h4>
                        <div className="flex flex-wrap items-center">
                          {activeMultipliers.map(multiplier => (
                            <div key={multiplier.id} className="flex items-center mt-1 mr-2">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                {multiplier.multiplier}x for {multiplier.daysLeft} more days
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-blue-700 mt-1 ml-10">
                      Earned from completing the {activeMultipliers[0].name} pattern!
                    </p>
                  </div>
                )}
                
                {/* Total Points Card */}
                <div className="bg-yellow-50 rounded-lg p-4 mt-3 border border-yellow-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600">Total Points</p>
                      <p className="text-3xl font-bold text-yellow-700">{rewardsData.totalPoints}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Points Breakdown */}
                <div className="mt-4 flex">
                  {/* Regular Points */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-3 mr-2 border border-gray-100">
                    <p className="text-sm text-gray-600">Regular Points</p>
                    <p className="text-xl font-bold text-gray-700">{rewardsData.regularPoints}</p>
                  </div>
                  
                  {/* Buddy Bonus Points */}
                  <div className="flex-1 bg-green-50 rounded-lg p-3 border border-green-100">
                    <div className="flex items-center">
                      <p className="text-sm text-gray-600">Buddy Bonus</p>
                      <span className="ml-1 bg-green-100 text-green-800 text-xs px-1 rounded">2x</span>
                    </div>
                    <p className="text-xl font-bold text-green-700">{rewardsData.buddyPoints}</p>
                  </div>
                </div>
                
                {/* Recent Activities */}
                <div className="mt-5">
                  <h4 className={`text-base font-medium text-gray-700 mb-3 ${getTextSizeClass()}`}>
                    Recent Activities
                  </h4>
                  
                  <div className="space-y-3">
                    {rewardsData.recentActivities.map(activity => (
                      <div 
                        key={activity.id} 
                        className={`p-3 rounded-lg border flex justify-between items-center ${
                          activity.themeMatch ? 'bg-green-50 border-green-100' : 
                          activity.withBuddy ? 'bg-blue-50 border-blue-100' : 
                          'bg-gray-50 border-gray-100'
                        }`}
                      >
                        <div>
                          <p className="font-medium text-gray-800">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.date}</p>
                          <div className="flex flex-wrap items-center mt-1 space-x-1">
                            {activity.withBuddy && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center">
                                <span role="img" aria-label="buddy" className="mr-1">👥</span> With {activity.buddyName}
                              </span>
                            )}
                            {activity.themeMatch && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                                <span role="img" aria-label="earth" className="mr-1">🌱</span> Earth Month
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center">
                            {activity.multiplierApplied && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded mr-1">
                                {activity.multiplierApplied}x
                              </span>
                            )}
                            {activity.withBuddy && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded mr-1">2x</span>
                            )}
                            <span className="font-bold text-gray-800">
                              {activity.withBuddy ? activity.points * 2 : activity.points}
                            </span>
                          </div>
                          {(activity.withBuddy || activity.multiplierApplied) && (
                            <p className="text-xs text-gray-500">
                              {activity.originalPoints || activity.points} base
                              {activity.multiplierApplied && activity.withBuddy ? " • Bonuses stacked!" : ""}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Stamps Collection Section */}
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`text-base font-medium text-gray-700 ${getTextSizeClass()}`}>
                      Activity Stamps
                    </h4>
                    <button 
                      onClick={() => navigate('/rewards/challenge')} 
                      className="text-sm text-blue-500 font-medium"
                    >
                      View Details
                    </button>
                  </div>
                  
                  {/* Current Challenge Info */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h5 className="font-medium text-gray-800">{stampsData.currentChallenge.name}</h5>
                    <p className="text-sm text-gray-600 mb-3">{stampsData.currentChallenge.dateRange}</p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{width: `${stampsData.currentChallenge.progress}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      {stampsData.currentChallenge.collectedCount} of {stampsData.currentChallenge.totalStamps} stamps collected
                    </p>
                    
                    {/* Pattern Completion Status - Simplified */}
                    <div className="mb-3">
                      {stampsData.currentChallenge.patterns.map((pattern, index) => (
                        <div key={pattern.id} className="flex items-center mb-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                            pattern.isComplete ? "bg-green-500 text-white" : "bg-gray-200"
                          }`}>
                            {pattern.isComplete ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-700">{pattern.name}</p>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                              <div 
                                className={`h-1.5 rounded-full ${pattern.isComplete ? "bg-green-500" : "bg-blue-300"}`} 
                                style={{width: `${pattern.isComplete ? 100 : 
                                  (pattern.stampIds.filter(id => 
                                    stampsData.currentChallenge.stamps.find(s => s.id === id && s.collected)
                                  ).length / pattern.stampIds.length) * 100}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Stamps Preview - Show only first 5 stamps in horizontal scroll */}
                    <div className="flex space-x-2 overflow-x-auto pb-1 mb-2 no-scrollbar">
                      {stampsData.currentChallenge.stamps.slice(0, 5).map(stamp => (
                        <div key={stamp.id} className="flex-shrink-0 relative">
                          {stamp.collected ? (
                            <div className={`h-8 w-8 rounded-full ${
                              stamp.type === "gift" ? "bg-green-300" : 
                              "bg-green-100 border-2 border-green-300"
                            } flex items-center justify-center`}>
                              {stamp.type === "gift" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 012 2v1a2 2 0 01-2 2h-1v3a3 3 0 01-3 3H7a3 3 0 01-3-3V9H2a2 2 0 01-2-2V8a2 2 0 012-2h1.17A3 3 0 015 5z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <div className="h-5 w-5 rounded-full bg-green-700"></div>
                              )}
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-100"></div>
                          )}
                          {stamp.date && (
                            <span className="absolute -bottom-5 left-0 right-0 text-xs text-center text-gray-500" style={{fontSize: '0.65rem'}}>
                              {stamp.date.split(' ')[0]}
                            </span>
                          )}
                        </div>
                      ))}
                      {stampsData.currentChallenge.stamps.length > 5 && (
                        <div className="flex items-center justify-center h-8 w-8">
                          <span className="text-sm text-gray-500">+{stampsData.currentChallenge.stamps.length - 5}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Next Reward Preview */}
                    <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Complete next pattern for:</h5>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <span className="text-blue-800 font-bold">1.75x</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Point Multiplier</p>
                          <p className="text-xs text-gray-600">For gardening activities for 10 days</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Call to Action */}
                    <button 
                      onClick={() => navigate('/events')}
                      className="mt-4 w-full bg-green-500 text-white py-2 rounded-md text-sm font-medium"
                    >
                      Join More Earth Month Activities
                    </button>
                  </div>
                </div>
                
                {/* Buddy System Promo */}
                {buddies.length === 0 && (
                  <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <h4 className="font-medium text-yellow-800">Double Your Rewards!</h4>
                    <p className="mt-1 text-sm text-yellow-700">
                      Find a buddy and join activities together to earn <strong>2x reward points</strong>!
                    </p>
                    <button 
                      onClick={() => navigate('/buddies')}
                      className="mt-2 bg-yellow-500 text-white py-2 px-3 rounded-md text-sm font-medium"
                    >
                      Find a Buddy
                    </button>
                  </div>
                )}
              </div>

              {/* Expiring Healthpoints */}
              <div className="bg-white p-3 rounded-md shadow-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base font-medium text-gray-800">No Healthpoints expiring yet</span>
                </div>
              </div>

              {/* HPB Credit$ Wallet */}
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-300 mr-2">
                    <span className="text-green-700 text-xl">$</span>
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">HPB Credit$ Wallet</h2>
                </div>
                <p className="text-gray-700 mb-4 text-sm">
                  Use your Credit$ to offset payments at your favourite merchants
                </p>
                <button 
                  className="text-blue-500 font-medium"
                  onClick={() => navigate('/rewards/credits')}
                >
                  Use now
                </button>
              </div>
            </div>
          )}

          {activeTab === 'vouchers' && (
            <div className="p-4 text-center">
              <p>Your vouchers will appear here</p>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="p-4 text-center">
              <p>Your transaction history will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Add custom styles for scrollbar */}
      <style jsx="true">{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Add space at bottom for navigation */}
      <div className="h-16"></div>
    </div>
  );
};

export default AboutRewards;