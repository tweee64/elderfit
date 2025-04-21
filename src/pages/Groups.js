import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useUser } from '../contexts/UserContext';
import Healthy365Nav from '../components/common/Healthy365Nav';
import groups from '../data/groups';
import events from '../data/events';

const Groups = () => {
  const { getTextSizeClass, getColorScheme } = useAccessibility();
  const { joinedGroups, joinGroup, leaveGroup } = useUser();
  const colorScheme = getColorScheme();
  
  // State for filters
  const [filterType, setFilterType] = useState('all'); // all, joined, available
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter groups based on filter type and search term
  const filteredGroups = groups.filter(group => {
    const matchesFilter = 
      filterType === 'all' || 
      (filterType === 'joined' && joinedGroups.includes(group.id)) ||
      (filterType === 'available' && !joinedGroups.includes(group.id));
      
    const matchesSearch = 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesFilter && matchesSearch;
  });
  
  // Get event details for a group
  const getEventForGroup = (eventId) => {
    return events.find(event => event.id === eventId);
  };
  
  // Handle joining or leaving a group
  const toggleGroupMembership = (groupId) => {
    if (joinedGroups.includes(groupId)) {
      leaveGroup(groupId);
    } else {
      joinGroup(groupId);
    }
  };

  return (
    <div className={`${colorScheme.bg} min-h-screen`}>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h1 className={`${colorScheme.text} text-3xl font-bold mb-4 ${getTextSizeClass()}`}>
            Event Groups
          </h1>
          
          <p className={`${colorScheme.text} text-xl mb-8 ${getTextSizeClass()}`}>
            Join event groups to meet new friends and stay motivated together.
          </p>
          
          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/3">
                <input
                  type="text"
                  placeholder="Search groups..."
                  className="input-large"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-1/3">
                <select
                  className="input-large"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Groups</option>
                  <option value="joined">My Groups</option>
                  <option value="available">Available to Join</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Group listing */}
          <div className="space-y-6">
            {filteredGroups.length > 0 ? (
              filteredGroups.map(group => {
                const relatedEvent = getEventForGroup(group.associatedEvent);
                const isJoined = joinedGroups.includes(group.id);
                
                return (
                  <div key={group.id} className="card hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-6">
                        <div className={`h-40 rounded-lg flex items-center justify-center ${isJoined ? 'bg-elderly-blue bg-opacity-20' : 'bg-gray-200'}`}>
                          <span className="text-6xl">
                            {relatedEvent?.category === "Exercise" ? "🧘‍♂️" :
                             relatedEvent?.category === "Arts & Crafts" ? "🧶" :
                             relatedEvent?.category === "Social" ? "🎤" :
                             relatedEvent?.category === "Educational" ? "📱" :
                             relatedEvent?.category === "Outdoors" ? "🌱" : "👥"}
                          </span>
                        </div>
                        
                        <div className="mt-4">
                          <button
                            onClick={() => toggleGroupMembership(group.id)}
                            className={`w-full py-3 px-4 rounded-lg ${
                              isJoined 
                                ? "bg-red-100 text-red-800 hover:bg-red-200" 
                                : "btn-primary"
                            }`}
                          >
                            {isJoined ? "Leave Group" : "Join Group"}
                          </button>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-3/4">
                        <div className="flex justify-between items-start">
                          <h2 className={`${colorScheme.text} text-2xl font-bold mb-2 ${getTextSizeClass()}`}>
                            {group.name}
                          </h2>
                          {isJoined && (
                            <span className="bg-elderly-blue text-white rounded-full px-4 py-1 text-lg">
                              Joined
                            </span>
                          )}
                        </div>
                        
                        <p className={`${colorScheme.text} mb-4 ${getTextSizeClass()}`}>
                          {group.description}
                        </p>
                        
                        <div className="bg-gray-100 rounded-lg p-4 mb-4">
                          <h3 className={`${colorScheme.text} text-lg font-semibold mb-2 ${getTextSizeClass()}`}>
                            Group Details
                          </h3>
                          <p className={`${colorScheme.text} mb-1 ${getTextSizeClass()}`}>
                            <strong>Event:</strong> {relatedEvent?.title || 'Unknown event'}
                          </p>
                          <p className={`${colorScheme.text} mb-1 ${getTextSizeClass()}`}>
                            <strong>Location:</strong> {group.location.name}
                          </p>
                          <p className={`${colorScheme.text} mb-1 ${getTextSizeClass()}`}>
                            <strong>Meet:</strong> {group.meetupFrequency}
                          </p>
                          <p className={`${colorScheme.text} ${getTextSizeClass()}`}>
                            <strong>Members:</strong> {group.members}/{group.maxMembers}
                          </p>
                        </div>
                        
                        {isJoined && group.recentMessages.length > 0 && (
                          <div className="mb-4">
                            <h3 className={`${colorScheme.text} text-lg font-semibold mb-2 ${getTextSizeClass()}`}>
                              Recent Messages
                            </h3>
                            <div className="border rounded-lg overflow-hidden">
                              {group.recentMessages.map((message, index) => (
                                <div 
                                  key={index} 
                                  className={`p-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                >
                                  <div className="flex justify-between mb-1">
                                    <span className="font-medium">{message.sender}</span>
                                    <span className="text-gray-500 text-sm">
                                      {new Date(message.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className={`${colorScheme.text} ${getTextSizeClass()}`}>
                                    {message.content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex space-x-4">
                          <Link 
                            to={`/groups/${group.id}`} 
                            className="btn-primary rounded-lg px-6 py-3 text-white"
                          >
                            View Group Details
                          </Link>
                          {isJoined && group.whatsappGroup && (
                            <Link 
                              to="/whatsapp" 
                              className="btn-secondary rounded-lg px-6 py-3"
                            >
                              WhatsApp Group
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className={`${colorScheme.text} text-xl ${getTextSizeClass()}`}>
                  No groups found matching your criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Add padding at the bottom to account for the navigation bar */}
      <div className="h-20"></div>
      
      {/* Bottom Navigation */}
      <Healthy365Nav />
    </div>
  );
};

export default Groups;