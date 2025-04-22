import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Healthy365Nav from '../components/common/Healthy365Nav';

const Buddies = () => {
  const navigate = useNavigate();
  const { 
    buddies, 
    pendingBuddyRequests, 
    sendBuddyRequest, 
    acceptBuddyRequest,
    rejectBuddyRequest,
    removeBuddy,
    buddyActivities,
    currentUser,
  } = useUser();
  
  // Add some mock buddies if none exist (for demo purposes)
  const initializeMockBuddies = () => {
    if (buddies.length === 0) {
      return [
        {
          id: 201,
          name: "Chen Wei Ming",
          age: 67,
          interests: ["Tai Chi", "Chess", "Photography"],
          location: "Ang Mo Kio",
          profileImage: "https://randomuser.me/api/portraits/men/71.jpg"
        },
        {
          id: 202,
          name: "Siti Aminah",
          age: 65,
          interests: ["Cooking", "Walking", "Gardening"],
          location: "Bedok",
          profileImage: "https://randomuser.me/api/portraits/women/53.jpg"
        }
      ];
    }
    return buddies;
  };
  
  // Initialize mock buddies
  const [myBuddies] = useState(initializeMockBuddies());
  
  const [activeTab, setActiveTab] = useState('myBuddies'); // myBuddies, requests, findBuddies
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock buddy suggestions based on interests or nearby users
  const suggestedBuddies = [
    {
      id: 101,
      name: "Tan Mei Ling",
      age: 65,
      interests: ["Tai Chi", "Reading", "Gardening"],
      location: "Tampines",
      profileImage: "https://randomuser.me/api/portraits/women/72.jpg"
    },
    {
      id: 102,
      name: "Kumar Raju",
      age: 70,
      interests: ["Singing", "Walking", "Chess"],
      location: "Woodlands",
      profileImage: "https://randomuser.me/api/portraits/men/62.jpg"
    },
    {
      id: 103,
      name: "Wong Mei Chen",
      age: 67,
      interests: ["Yoga", "Cooking", "Art"],
      location: "Toa Payoh",
      profileImage: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 104,
      name: "Lee Kah Seng",
      age: 72,
      interests: ["Gardening", "Fishing", "Walking"],
      location: "Jurong East",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];
  
  // Filter suggested buddies based on search term
  const getFilteredBuddies = () => {
    if (!searchTerm) return suggestedBuddies;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return suggestedBuddies.filter(buddy => 
      buddy.name.toLowerCase().includes(lowerSearchTerm) ||
      buddy.location.toLowerCase().includes(lowerSearchTerm) ||
      buddy.interests.some(interest => interest.toLowerCase().includes(lowerSearchTerm))
    );
  };
  
  // Check if a buddy suggestion already has outgoing request
  const hasOutgoingRequest = (buddyId) => {
    return pendingBuddyRequests.outgoing.some(request => request.id === buddyId);
  };
  
  // Check if a buddy is already in your buddy list
  const isAlreadyBuddy = (buddyId) => {
    return buddies.some(buddy => buddy.id === buddyId);
  };
  
  // Handle going back
  const handleBack = () => {
    navigate('/explore');
  };
  
  // Get the number of activities done together with a buddy
  const getActivitiesDoneWithBuddy = (buddyId) => {
    return buddyActivities.filter(activity => activity.buddyId === buddyId).length;
  };
  
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Header - Yellow background */}
      <div className="bg-yellow-400 px-4 py-6">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="text-2xl">
            &lt;
          </button>
          <h1 className="text-2xl font-bold">Buddy System</h1>
          <div className="w-5"></div> {/* Empty div for alignment */}
        </div>
        
        {/* Search Bar for Find Buddies tab */}
        {activeTab === 'findBuddies' && (
          <div className="flex mt-4">
            <div className="bg-white rounded-lg shadow flex-grow flex items-center px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, interest or location"
                className="bg-transparent border-none flex-grow focus:outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Tabs */}
      <div className="px-4 py-3 border-b border-gray-200 flex gap-6">
        <button
          className={`font-medium ${activeTab === 'myBuddies' ? 'text-green-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('myBuddies')}
        >
          My Buddies
        </button>
        <button
          className={`font-medium ${activeTab === 'requests' ? 'text-green-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
          {pendingBuddyRequests.incoming.length > 0 && (
            <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {pendingBuddyRequests.incoming.length}
            </span>
          )}
        </button>
        <button
          className={`font-medium ${activeTab === 'findBuddies' ? 'text-green-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('findBuddies')}
        >
          Find Buddies
        </button>
      </div>
      
      {/* Content based on active tab */}
      <div className="px-4 py-4">
        {/* My Buddies Tab */}
        {activeTab === 'myBuddies' && (
          <div>
            {myBuddies.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-600">No buddies yet</h3>
                <p className="mt-2 text-gray-500">
                  Add a buddy to participate in activities together and earn double rewards!
                </p>
                <button 
                  onClick={() => setActiveTab('findBuddies')}
                  className="mt-4 text-white bg-green-500 px-4 py-2 rounded-md"
                >
                  Find Buddies
                </button>
              </div>
            ) : (
              <div>
                {/* Buddy Activity Stats */}
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 mb-6">
                  <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <span className="mr-2">🏆</span> Buddy Rewards Summary
                  </h3>
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="text-2xl font-bold text-yellow-700">3</p>
                      <p className="text-xs text-yellow-600">Activities Completed</p>
                    </div>
                    <div className="h-12 border-r border-yellow-200"></div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-700">600</p>
                      <p className="text-xs text-yellow-600">Points Earned</p>
                    </div>
                    <div className="h-12 border-r border-yellow-200"></div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-700">300</p>
                      <p className="text-xs text-yellow-600">Bonus Points</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-lg font-semibold mb-4">Your Buddies</h2>
                <div className="space-y-4 mb-6">
                  {myBuddies.map(buddy => (
                    <div key={buddy.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full bg-gray-200 mr-4">
                            {buddy.profileImage ? (
                              <img 
                                src={buddy.profileImage} 
                                alt={buddy.name} 
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold">
                                {buddy.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{buddy.name}</h3>
                            <p className="text-gray-500 text-sm">{buddy.location || "No location"}</p>
                            <div className="flex mt-1">
                              <span className="text-sm text-gray-600 mr-2">
                                {getActivitiesDoneWithBuddy(buddy.id) || "2"} activities together
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                                2x rewards earned!
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-600">Interests</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {buddy.interests ? (
                              buddy.interests.map((interest, index) => (
                                <span 
                                  key={index} 
                                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {interest}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 text-sm">No interests added</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between">
                          <button 
                            onClick={() => navigate('/events')}
                            className="bg-green-500 text-white py-2 px-3 rounded-md text-sm font-medium flex-1 mr-2"
                          >
                            Invite to Activity
                          </button>
                          <button 
                            onClick={() => removeBuddy(buddy)}
                            className="border border-gray-300 text-gray-600 py-2 px-3 rounded-md text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Upcoming Buddy Activities */}
                <h2 className="text-lg font-semibold mb-4">Upcoming Buddy Activities</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">Tai Chi in the Park</h3>
                        <p className="text-gray-500 text-sm">Wed, Apr 23 • 9:00 AM - 10:30 AM</p>
                        <p className="text-gray-500 text-sm">East Coast Park</p>
                      </div>
                      <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        2x Points
                      </div>
                    </div>
                    <div className="flex items-center mt-3">
                      <p className="text-sm text-gray-600 mr-2">Going with:</p>
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full overflow-hidden mr-1">
                          <img 
                            src={myBuddies[0].profileImage}
                            alt={myBuddies[0].name}
                            className="w-6 h-6 object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">{myBuddies[0].name}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Completed Buddy Activities with Double Points */}
                <h2 className="text-lg font-semibold mb-4">Completed Activities</h2>
                <div className="space-y-4">
                  {/* Activity 1 */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Morning Yoga Session</h3>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Completed
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm">Apr 16, 2025 • Community Center</p>
                      <div className="flex items-center mt-2">
                        <p className="text-sm text-gray-600 mr-2">With:</p>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full overflow-hidden mr-1">
                            <img 
                              src={myBuddies[1].profileImage}
                              alt={myBuddies[1].name}
                              className="w-6 h-6 object-cover"
                            />
                          </div>
                          <span className="text-sm">{myBuddies[1].name}</span>
                        </div>
                      </div>
                      
                      {/* Points Awarded Banner */}
                      <div className="mt-3 bg-yellow-50 rounded-md p-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs">Points Awarded:</span>
                        </div>
                        <div className="flex items-center">
                          <div className="text-xs text-gray-500 line-through mr-2">100 pts</div>
                          <div className="text-sm font-semibold text-yellow-700">200 pts (2x Bonus!)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Activity 2 */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Community Garden Day</h3>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Completed
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm">Apr 10, 2025 • Bishan Park</p>
                      <div className="flex items-center mt-2">
                        <p className="text-sm text-gray-600 mr-2">With:</p>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full overflow-hidden mr-1">
                            <img 
                              src={myBuddies[0].profileImage}
                              alt={myBuddies[0].name}
                              className="w-6 h-6 object-cover"
                            />
                          </div>
                          <span className="text-sm">{myBuddies[0].name}</span>
                        </div>
                      </div>
                      
                      {/* Points Awarded Banner */}
                      <div className="mt-3 bg-yellow-50 rounded-md p-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs">Points Awarded:</span>
                        </div>
                        <div className="flex items-center">
                          <div className="text-xs text-gray-500 line-through mr-2">150 pts</div>
                          <div className="text-sm font-semibold text-yellow-700">300 pts (2x Bonus!)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            {pendingBuddyRequests.incoming.length === 0 && pendingBuddyRequests.outgoing.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-600">No buddy requests</h3>
                <p className="mt-2 text-gray-500">
                  When you send or receive buddy requests, they will appear here.
                </p>
              </div>
            ) : (
              <div>
                {pendingBuddyRequests.incoming.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Incoming Requests</h2>
                    <div className="space-y-4">
                      {pendingBuddyRequests.incoming.map(request => (
                        <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                          <div className="p-4">
                            <div className="flex items-center">
                              <div className="w-14 h-14 rounded-full bg-gray-200 mr-4">
                                {request.profileImage ? (
                                  <img 
                                    src={request.profileImage} 
                                    alt={request.name} 
                                    className="w-14 h-14 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold">
                                    {request.name.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">{request.name}</h3>
                                <p className="text-gray-500 text-sm">{request.location || "No location"}</p>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex justify-between">
                              <button 
                                onClick={() => acceptBuddyRequest(request)}
                                className="bg-green-500 text-white py-2 px-3 rounded-md text-sm font-medium flex-1 mr-2"
                              >
                                Accept
                              </button>
                              <button 
                                onClick={() => rejectBuddyRequest(request)}
                                className="border border-gray-300 text-gray-600 py-2 px-3 rounded-md text-sm flex-1"
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {pendingBuddyRequests.outgoing.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Outgoing Requests</h2>
                    <div className="space-y-4">
                      {pendingBuddyRequests.outgoing.map(request => (
                        <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                          <div className="p-4">
                            <div className="flex items-center">
                              <div className="w-14 h-14 rounded-full bg-gray-200 mr-4">
                                {request.profileImage ? (
                                  <img 
                                    src={request.profileImage} 
                                    alt={request.name} 
                                    className="w-14 h-14 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold">
                                    {request.name.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">{request.name}</h3>
                                <p className="text-gray-500 text-sm">{request.location || "No location"}</p>
                              </div>
                              <span className="text-sm text-yellow-600">Pending</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Find Buddies Tab */}
        {activeTab === 'findBuddies' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Suggested Buddies</h2>
            
            {getFilteredBuddies().length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium text-gray-600">No matches found</h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search or check back later.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {getFilteredBuddies().map(buddy => {
                  const isOutgoingRequest = hasOutgoingRequest(buddy.id);
                  const isBuddy = isAlreadyBuddy(buddy.id);
                  
                  return (
                    <div key={buddy.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full bg-gray-200 mr-4">
                            {buddy.profileImage ? (
                              <img 
                                src={buddy.profileImage} 
                                alt={buddy.name} 
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold">
                                {buddy.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{buddy.name}</h3>
                            <p className="text-gray-500 text-sm">{buddy.age} • {buddy.location}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-600">Interests</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {buddy.interests.map((interest, index) => (
                              <span 
                                key={index} 
                                className={`text-xs px-2 py-1 rounded-full ${
                                  currentUser.interests && currentUser.interests.includes(interest)
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {interest}
                                {currentUser.interests && currentUser.interests.includes(interest) && (
                                  <span className="ml-1">✓</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          {isBuddy ? (
                            <button 
                              disabled
                              className="w-full bg-gray-100 text-gray-600 py-2 rounded-md text-sm font-medium"
                            >
                              Already a Buddy
                            </button>
                          ) : isOutgoingRequest ? (
                            <button 
                              disabled
                              className="w-full bg-yellow-100 text-yellow-800 py-2 rounded-md text-sm font-medium"
                            >
                              Request Sent
                            </button>
                          ) : (
                            <button 
                              onClick={() => sendBuddyRequest(buddy)}
                              className="w-full bg-green-500 text-white py-2 rounded-md text-sm font-medium"
                            >
                              Send Buddy Request
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <h3 className="font-medium text-yellow-800">Buddy Benefit</h3>
              <p className="mt-1 text-sm text-yellow-700">
                When you join activities with a buddy, you both earn <strong>2x rewards</strong>! It's more fun to stay active together.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom padding for navigation bar */}
      <div className="h-20"></div>
      
      {/* Bottom Navigation */}
      <Healthy365Nav />
    </div>
  );
};

export default Buddies;