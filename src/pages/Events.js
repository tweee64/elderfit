import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Healthy365Nav from '../components/common/Healthy365Nav';
import { eventsData } from '../data/events'; // Import the events data
import { useAccessibility } from '../contexts/AccessibilityContext';

const Events = () => {
  const navigate = useNavigate();
  const { savedEvents, saveEvent, removeEvent } = useUser();
    const { getTextSizeClass,  } = useAccessibility();
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // All, Recommended
  const [activeDay, setActiveDay] = useState('Today'); // Today, Tomorrow, etc.
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    eventDate: '',
    eventTime: '',
    eventMode: [], // Virtual, In-Person
    ageGroup: [], // Age ranges
    intensity: [], // Added intensity array
    virtual: null, // Added virtual property
    program: [], // Added program array
    activityType: [] // Activity types like 'physical', 'art', etc.
  });
  
  // Let's add activity types for filtering
  const activityTypes = [
    { id: 'physical', name: 'Physical', emoji: '🏋️' },
    { id: 'art', name: 'Art & Craft', emoji: '🎨' },
    { id: 'dance', name: 'Dance', emoji: '💃' },
    { id: 'yoga', name: 'Yoga/Meditation', emoji: '🧘' },
    { id: 'mental', name: 'Mental Wellness', emoji: '🧠' },
    { id: 'social', name: 'Social', emoji: '👥' }
  ];
  
  // Function to determine activity type based on event title and description
  const getEventActivityType = (event) => {
    const title = event.title.toLowerCase();
    const description = event.description ? event.description.toLowerCase() : '';
    
    // Return activity type or array of types
    if (event.activityType) {
      return event.activityType;
    }
    
    // Auto-categorize based on keywords in title or description
    if (title.includes('yoga') || title.includes('meditation') || 
        description.includes('yoga') || description.includes('meditation')) {
      return 'yoga';
    } else if (title.includes('tai chi') || title.includes('fitness') || 
               title.includes('workout') || title.includes('exercise') || 
               title.includes('getfit') || title.includes('hiit') ||
               description.includes('fitness') || description.includes('strength')) {
      return 'physical';
    } else if (title.includes('dance') || title.includes('zumba') || 
               description.includes('dance') || description.includes('choreography')) {
      return 'dance';
    } else if (title.includes('art') || title.includes('craft') || title.includes('painting') ||
               title.includes('drawing') || title.includes('crocheting') || 
               description.includes('art') || description.includes('creative')) {
      return 'art';
    } else if (title.includes('mental') || title.includes('mindfulness') || 
               title.includes('wellness') || title.includes('health') ||
               description.includes('mental') || description.includes('mindfulness')) {
      return 'mental';
    } else if (title.includes('social') || title.includes('group') || 
               title.includes('community') || title.includes('gathering') ||
               description.includes('together') || description.includes('community')) {
      return 'social';
    }
    
    // Default to physical if no match found
    return 'physical';
  };

  // Current date for dynamic date labels
  // const currentDate = new Date();
  const days = ['Today', 'Tomorrow', 'Wed, Apr 23', 'Thu, Apr 24', 'Fri, Apr 25'];
  
  // Organize events by day from the eventsData imported from events.js
  const organizeEventsByDay = () => {
    const today = new Date('2025-04-21'); // Setting a fixed date for demo purposes
    
    const result = {
      Today: [],
      Tomorrow: [],
      'Wed, Apr 23': [],
      'Thu, Apr 24': [],
      'Fri, Apr 25': []
    };
    
    eventsData.forEach(event => {
      const eventDate = event.schedule?.startDate ? new Date(event.schedule.startDate) : new Date();
      const dayDiff = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
      
      // Format time from schedule
      const timeStart = event.schedule?.time?.split(' - ')[0] || '';
      const timeEnd = event.schedule?.time?.split(' - ')[1] || '';
      
      const formattedEvent = {
        ...event,
        timeStart: timeStart,
        timeEnd: timeEnd,
        slots: event.maxParticipants ? (event.maxParticipants - event.currentParticipants) : event.slots,
        recommended: event.recommended !== undefined ? event.recommended : (event.id % 2 === 0),
        date: event.schedule?.startDate ? new Date(event.schedule.startDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }) : '',
        // Add buddy-friendly flag for certain events (odd-numbered IDs in this demo)
        buddyFriendly: event.buddyFriendly !== undefined ? event.buddyFriendly : [1, 3, 5, 7, 9].includes(event.id),
        // Base reward points (doubled when attending with buddy)
        rewardPoints: event.rewardPoints || 100
      };
      
      if (dayDiff === 0) {
        result.Today.push(formattedEvent);
      } else if (dayDiff === 1) {
        result.Tomorrow.push(formattedEvent);
      } else if (dayDiff === 2) {
        result['Wed, Apr 23'].push(formattedEvent);
      } else if (dayDiff === 3) {
        result['Thu, Apr 24'].push(formattedEvent);
      } else if (dayDiff === 4) {
        result['Fri, Apr 25'].push(formattedEvent);
      }
    });
    
    return result;
  };
  
  // Use the organized events
  const allEvents = organizeEventsByDay();
  
  // Filter events based on search term, active tab, and filters
  const getFilteredEvents = () => {
    const dayEvents = allEvents[activeDay] || [];
    
    return dayEvents.filter(event => {
      // Filter by tab (All or Recommended)
      if (activeTab === 'Recommended' && !event.recommended) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm.trim() !== '') {
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = event.title.toLowerCase().includes(searchLower);
        const locationMatch = typeof event.location === 'string' 
          ? event.location.toLowerCase().includes(searchLower)
          : event.location?.name?.toLowerCase().includes(searchLower) || false;
        const programMatch = event.program 
          ? event.program.toLowerCase().includes(searchLower)
          : false;
        
        if (!(titleMatch || locationMatch || programMatch)) {
          return false;
        }
      }
      
      // Filter by location
      if (filters.location.trim() !== '') {
        const locationLower = filters.location.toLowerCase();
        const locationStr = typeof event.location === 'string' 
          ? event.location.toLowerCase()
          : (event.location?.name || '').toLowerCase();
        
        if (!locationStr.includes(locationLower)) {
          return false;
        }
      }
      
      // Filter by event date
      if (filters.eventDate.trim() !== '') {
        // Simple date matching - could be enhanced with proper date parsing
        if (event.date && !event.date.toLowerCase().includes(filters.eventDate.toLowerCase())) {
          return false;
        }
      }
      
      // Filter by event time
      if (filters.eventTime.trim() !== '') {
        const timeStart = event.timeStart || '';
        if (!timeStart.toLowerCase().includes(filters.eventTime.toLowerCase())) {
          return false;
        }
      }
      
      // Filter by event mode (Virtual, In-Person)
      if (filters.eventMode.length > 0) {
        if (filters.eventMode.includes('Virtual') && filters.eventMode.includes('In-Person')) {
          // Both modes selected, no filtering needed
        } else if (filters.eventMode.includes('Virtual') && !event.virtual) {
          return false;
        } else if (filters.eventMode.includes('In-Person') && event.virtual) {
          return false;
        }
      }
      
      // Filter by age group
      if (filters.ageGroup.length > 0) {
        // If event has ageGroups property, use it
        if (event.ageGroups) {
          const eventAgeGroups = Array.isArray(event.ageGroups) ? event.ageGroups : [event.ageGroups];
          // Check if there's an overlap between selected age groups and event age groups
          const hasMatchingAgeGroup = filters.ageGroup.some(ageGroup => 
            eventAgeGroups.includes(ageGroup)
          );
          if (!hasMatchingAgeGroup) {
            return false;
          }
        } else {
          // Default behavior for events without ageGroups property
          // Assume '50+' by default for most events in this app
          if (filters.ageGroup.includes('50+')) {
            return true;
          } else {
            return false;
          }
        }
      }
      
      // Filter by activity type
      if (filters.activityType.length > 0) {
        const eventType = getEventActivityType(event);
        // If the event has a specific activityType or we can determine it
        if (eventType) {
          // Handle both array and string types
          const eventTypes = Array.isArray(eventType) ? eventType : [eventType];
          // Check if there's an overlap between selected activity types and event types
          const hasMatchingType = filters.activityType.some(type => 
            eventTypes.includes(type)
          );
          if (!hasMatchingType) {
            return false;
          }
        }
      }
      
      // Keep events that passed all filters
      return true;
    });
  };
  
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      location: '',
      eventDate: '',
      eventTime: '',
      eventMode: [],
      ageGroup: [],
      intensity: [],
      virtual: null,
      program: [],
      activityType: []
    });
  };
  
  // Check if any filters are active
  const hasActiveFilters = () => {
    return filters.intensity.length > 0 || filters.virtual !== null || filters.program.length > 0;
  };

  // Handle event click to navigate to detail page
  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  // Function to render event cards
  const renderEventCard = (event) => {
    const isSaved = savedEvents.some(savedEvent => savedEvent.id === event.id);
    
    return (
      <div 
        key={event.id} 
        className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
        onClick={() => handleEventClick(event.id)}
      >
        <div className="p-4">
          <div className="flex justify-between">
            <div className="mb-3">
              <p className="text-gray-500 text-sm">{event.date || activeDay || (event.schedule ? `${event.schedule.daysOfWeek.join(', ')}` : '')}</p>
              <p className="text-gray-500 text-sm">
                {event.timeStart && event.timeEnd 
                  ? `${event.timeStart} - ${event.timeEnd}`
                  : (event.schedule ? event.schedule.time : '')}
              </p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                isSaved ? removeEvent(event) : saveEvent(event);
              }}
              className="text-yellow-500"
            >
              {isSaved ? '★' : '☆'}
            </button>
          </div>
          
          <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
          
          <div className="mt-3 flex justify-between items-center">
            <p className="text-gray-600 text-sm">
              {typeof event.location === 'string' 
                ? event.location 
                : (event.location?.name || 'Location not specified')}
            </p>
            {/* Display slots left for all events */}
            <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
              {event.slots ? `${event.slots} SLOTS` : 
               (event.currentParticipants && event.maxParticipants) ? 
               `${event.maxParticipants - event.currentParticipants} SLOTS` : 
               "OPEN"}
            </span>
          </div>
          
          {/* Points and Buddy Indicator */}
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">{event.rewardPoints} pts</span>
            </div>
            
            {event.buddyFriendly && (
              <div className="flex items-center text-xs bg-yellow-50 border border-yellow-100 rounded-full px-2 py-1">
                <span className="mr-1">👥</span>
                <span className="font-medium text-yellow-800">2x points with buddy!</span>
              </div>
            )}
          </div>
          
          {event.intensity && (
            <div className="mt-2 flex justify-end items-center">
              <span className="text-gray-600 mr-2 text-xs">Intensity:</span>
              <div className="flex space-x-1">
                <div className={`h-1 w-4 rounded ${event.intensity >= 1 ? 'bg-gray-400' : 'bg-gray-200'}`}></div>
                <div className={`h-1 w-4 rounded ${event.intensity >= 2 ? 'bg-gray-400' : 'bg-gray-200'}`}></div>
                <div className={`h-1 w-4 rounded ${event.intensity >= 3 ? 'bg-gray-400' : 'bg-gray-200'}`}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Update header to match consistent style across app */}
      <div className="bg-blue-500 text-white px-4 py-4 flex items-center justify-between shadow-md">
      <div className="bg-blue-500 text-white p-6 text-center">
        <h1 className={`text-2xl font-bold ${getTextSizeClass()}`}>Events</h1>
      </div>
      </div>
      
      {/* Search Bar and Filter */}
      <div className="flex mt-4 gap-2 px-4">
        <div className="bg-white rounded-lg shadow flex-grow flex items-center px-3 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by event or location"
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
        <button 
          className={`${hasActiveFilters() ? 'bg-green-500 text-white' : 'bg-white text-gray-800'} rounded-lg shadow px-6 py-2 flex items-center`}
          onClick={() => setShowFilterModal(true)}
        >
          <span className="font-medium">Filter</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>
      
      {/* Days Tabs - Updated with no-scrollbar class */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200 pb-1 pt-1">
        <div className="flex space-x-2 px-4">
          {days.map((day, index) => (
            <button
              key={index}
              className={`px-4 py-2 font-medium rounded-full whitespace-nowrap ${
                activeDay === day 
                ? 'text-white bg-green-500' 
                : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setActiveDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      
      {/* Today Heading and Tabs */}
      <div className="px-4 pt-4 pb-2 flex justify-between items-center">
        <h2 className="text-3xl font-bold">{activeDay}</h2>
        <button className="text-blue-500 font-medium">
          Enter Partner Code
        </button>
      </div>
      
      {/* All/Recommended Tabs */}
      <div className="px-4 pb-4 flex gap-6 border-b border-gray-200">
        <button
          className={`font-medium ${activeTab === 'All' ? 'text-green-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('All')}
        >
          All
        </button>
        <button
          className={`font-medium ${activeTab === 'Recommended' ? 'text-green-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('Recommended')}
        >
          Recommended
        </button>
      </div>
      
      {/* Filtered Events List */}
      <div className="px-4 py-4">
        {getFilteredEvents().length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-600">No events found</h3>
            <p className="mt-2 text-gray-500">
              {searchTerm ? 'Try a different search term' : 'No events available for this day'}
              {hasActiveFilters() && ' or adjust your filters'}
            </p>
            {(searchTerm || hasActiveFilters()) && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  resetFilters();
                }}
                className="mt-4 text-white bg-green-500 px-4 py-2 rounded-md"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          getFilteredEvents().map((event) => renderEventCard(event))
        )}
      </div>
      
      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-white flex flex-col h-full z-50">
          <div className="bg-yellow-400 p-4 flex items-center">
            <button 
              onClick={() => setShowFilterModal(false)}
              className="text-black mr-4"
            >
              &lt;
            </button>
            <h3 className="text-xl font-bold flex-1 text-center">Filter Events</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {/* Location Filter */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 text-green-500 mr-2">📍</div>
                <h4 className="font-bold text-xl">Location</h4>
              </div>
              <div className="bg-white rounded-lg border border-gray-300 flex items-center px-3 py-2 mt-2">
                <div className="w-5 h-5 text-gray-400 mr-2">🎯</div>
                <input
                  type="text"
                  placeholder="Enter address, landmark or postal code"
                  className="bg-transparent border-none flex-grow focus:outline-none text-sm"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
              </div>
            </div>
            
            {/* Event Date & Time Filter */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 text-green-500 mr-2">📅</div>
                <h4 className="font-bold text-xl">Event Date & Time</h4>
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Enter date"
                  className="bg-white rounded-lg border border-gray-300 flex-1 px-3 py-2 focus:outline-none text-sm"
                  value={filters.eventDate}
                  onChange={(e) => setFilters({...filters, eventDate: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Enter start time"
                  className="bg-white rounded-lg border border-gray-300 flex-1 px-3 py-2 focus:outline-none text-sm"
                  value={filters.eventTime}
                  onChange={(e) => setFilters({...filters, eventTime: e.target.value})}
                />
              </div>
            </div>
            
            {/* Event Mode Filter */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 text-green-500 mr-2">📹</div>
                <h4 className="font-bold text-xl">Event Mode</h4>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-base">Virtual</span>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5"
                    checked={filters.eventMode.includes('Virtual')}
                    onChange={() => {
                      const updatedModes = filters.eventMode.includes('Virtual')
                        ? filters.eventMode.filter(mode => mode !== 'Virtual')
                        : [...filters.eventMode, 'Virtual'];
                      setFilters({...filters, eventMode: updatedModes});
                    }}
                  />
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-base">In-Person</span>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5"
                    checked={filters.eventMode.includes('In-Person')}
                    onChange={() => {
                      const updatedModes = filters.eventMode.includes('In-Person')
                        ? filters.eventMode.filter(mode => mode !== 'In-Person')
                        : [...filters.eventMode, 'In-Person'];
                      setFilters({...filters, eventMode: updatedModes});
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Suitable for Filter - Age Groups */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 text-green-500 mr-2">👥</div>
                <h4 className="font-bold text-xl">Suitable for</h4>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-base">Young Children (0-6 years old)</span>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5"
                    checked={filters.ageGroup.includes('0-6')}
                    onChange={() => {
                      const updatedAgeGroups = filters.ageGroup.includes('0-6')
                        ? filters.ageGroup.filter(age => age !== '0-6')
                        : [...filters.ageGroup, '0-6'];
                      setFilters({...filters, ageGroup: updatedAgeGroups});
                    }}
                  />
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-base">Children & Youth (7-17 years old)</span>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5"
                    checked={filters.ageGroup.includes('7-17')}
                    onChange={() => {
                      const updatedAgeGroups = filters.ageGroup.includes('7-17')
                        ? filters.ageGroup.filter(age => age !== '7-17')
                        : [...filters.ageGroup, '7-17'];
                      setFilters({...filters, ageGroup: updatedAgeGroups});
                    }}
                  />
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-base">Young Adults (18-25 years old)</span>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5"
                    checked={filters.ageGroup.includes('18-25')}
                    onChange={() => {
                      const updatedAgeGroups = filters.ageGroup.includes('18-25')
                        ? filters.ageGroup.filter(age => age !== '18-25')
                        : [...filters.ageGroup, '18-25'];
                      setFilters({...filters, ageGroup: updatedAgeGroups});
                    }}
                  />
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-base">Adults (26-49 years old)</span>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5"
                    checked={filters.ageGroup.includes('26-49')}
                    onChange={() => {
                      const updatedAgeGroups = filters.ageGroup.includes('26-49')
                        ? filters.ageGroup.filter(age => age !== '26-49')
                        : [...filters.ageGroup, '26-49'];
                      setFilters({...filters, ageGroup: updatedAgeGroups});
                    }}
                  />
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-base">Older Adults (50 years old and above)</span>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5"
                    checked={filters.ageGroup.includes('50+')}
                    onChange={() => {
                      const updatedAgeGroups = filters.ageGroup.includes('50+')
                        ? filters.ageGroup.filter(age => age !== '50+')
                        : [...filters.ageGroup, '50+'];
                      setFilters({...filters, ageGroup: updatedAgeGroups});
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Activity Type Filter - New Section */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 text-green-500 mr-2">🏋️</div>
                <h4 className="font-bold text-xl">Activity Type</h4>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {activityTypes.map(type => (
                  <div 
                    key={type.id}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                      filters.activityType.includes(type.id) 
                        ? 'bg-green-100 border-green-500' 
                        : 'bg-white border-gray-300'
                    }`}
                    onClick={() => {
                      const updatedTypes = filters.activityType.includes(type.id)
                        ? filters.activityType.filter(t => t !== type.id)
                        : [...filters.activityType, type.id];
                      setFilters({...filters, activityType: updatedTypes});
                    }}
                  >
                    <span className="mr-2 text-xl">{type.emoji}</span>
                    <span className="text-sm font-medium">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom Action Buttons */}
          <div className="p-4 flex border-t border-gray-200">
            <button
              onClick={resetFilters}
              className="flex-1 py-3 text-blue-500 font-medium text-center"
            >
              Clear filters
            </button>
            <button
              onClick={() => setShowFilterModal(false)}
              className="flex-1 py-3 bg-blue-500 text-white font-medium rounded-none"
            >
              Apply
            </button>
          </div>
        </div>
      )}
      
      {/* Bottom padding for navigation bar */}
      <div className="h-20"></div>
      
      {/* Bottom Navigation */}
      <Healthy365Nav />
    </div>
  );
};

export default Events;