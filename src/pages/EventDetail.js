import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsData } from '../data/events';
import { useUser } from '../contexts/UserContext';
import Healthy365Nav from '../components/common/Healthy365Nav';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventId = parseInt(id);
  
  const { 
    savedEvents, 
    saveEvent, 
    removeEvent, 
    registeredEvents, 
    registerForEvent,
    cancelRegistration,
    buddies,
    hasBuddyForActivity,
    inviteBuddyToActivity,
    removeBuddyFromActivity,
    getBuddyForActivity,
    addNotification,
    rsvpWithBuddy
  } = useUser();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBuddyModal, setShowBuddyModal] = useState(false);
  const [showBuddySuccessModal, setShowBuddySuccessModal] = useState(false);
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  // State for registration confirmation modals
  const [showBuddyConfirmModal, setShowBuddyConfirmModal] = useState(false);
  const [showRegConfirmModal, setShowRegConfirmModal] = useState(false);
  const [showRegSuccessModal, setShowRegSuccessModal] = useState(false);
  
  useEffect(() => {
    // Find the event with the matching ID
    const foundEvent = eventsData.find(e => e.id === eventId);
    if (foundEvent) {
      // Add buddy-friendly flag for certain events
      const enhancedEvent = {
        ...foundEvent,
        buddyFriendly: foundEvent.buddyFriendly !== undefined ? foundEvent.buddyFriendly : [1, 3, 5, 7, 9].includes(foundEvent.id),
        rewardPoints: foundEvent.rewardPoints || 100,
        // Use specific local images for certain events
        image: foundEvent.id === 3 ? '/images/karaoke-social.jpg' : foundEvent.imageUrl || 'https://via.placeholder.com/400x200'
      };
      setEvent(enhancedEvent);
    }
    setLoading(false);
  }, [eventId]);
  
  const handleBack = () => {
    navigate('/events');
  };
  
  const toggleSaved = () => {
    if (savedEvents && savedEvents.includes(eventId)) {
      removeEvent(eventId);
    } else {
      saveEvent(eventId);
    }
  };
  
  const handleRegister = () => {
    if (event && event.buddyFriendly && buddies.length > 0) {
      // For buddy-friendly events with available buddies, show confirmation
      setShowBuddyConfirmModal(true);
    } else if (event && !event.buddyFriendly) {
      // For non-buddy-friendly events, show simple confirmation
      setShowRegConfirmModal(true);
    } else {
      // For buddy-friendly events but no buddies available
      registerForEvent(eventId);
      setShowRegSuccessModal(true);
    }
  };
  
  const handleBuddyInvite = (buddy) => {
    setSelectedBuddy(buddy);
    inviteBuddyToActivity(eventId, buddy);
    
    // Show notification about potential double points
    addNotification({
      id: Date.now(),
      type: 'buddyInvite',
      message: `You've invited ${buddy.name} to join you for ${event.title}`,
      timestamp: new Date(),
      read: false,
      activityId: eventId
    });
    
    setShowBuddyModal(false);
    setShowBuddySuccessModal(true);
    
    // For demo purposes, automatically confirm buddy acceptance after a short delay
    setTimeout(() => {
      // Add mock buddy confirmation
      rsvpWithBuddy(buddy, event);
      
      // Send confirmation notification
      addNotification({
        id: Date.now() + 1,
        type: 'buddyConfirmed',
        message: `${buddy.name} has accepted your invitation for ${event.title}! You'll both earn double points!`,
        timestamp: new Date(),
        read: false,
        activityId: eventId
      });
    }, 2000);
  };
  
  const handleCancelBuddy = () => {
    removeBuddyFromActivity(eventId);
  };
  
  const handleCancelRegistration = () => {
    setShowCancelModal(true);
  };
  
  // Confirm cancellation
  const confirmCancelRegistration = () => {
    cancelRegistration(eventId);
    setShowCancelModal(false);
    
    // Show notification about cancellation
    addNotification({
      id: Date.now(),
      type: 'cancellation',
      message: `You've cancelled your registration for ${event.title}`,
      timestamp: new Date(),
      read: false
    });
  };

  // Handle confirmation of registration
  const confirmRegistration = () => {
    // Register for the event
    registerForEvent(eventId);
    
    // Close confirmation modal and show success modal
    setShowRegConfirmModal(false);
    setShowRegSuccessModal(true);
  };
  
  // Handle buddy registration confirmation
  const confirmBuddyRegistration = () => {
    // Get the buddy for this activity
    const buddy = getBuddyForActivity(eventId);
    
    if (buddy) {
      // Register for the event with the buddy
      registerForEvent(eventId);
      
      // Close confirmation modal and show success modal
      setShowBuddyConfirmModal(false);
      setShowRegSuccessModal(true);
    } else {
      // This shouldn't happen, but just in case
      setShowBuddyConfirmModal(false);
      setShowBuddyModal(true);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to get the event date (handles different data structures)
  const getEventDate = (event) => {
    if (event.date) {
      return event.date;
    } else if (event.schedule && event.schedule.startDate) {
      return event.schedule.startDate;
    }
    return new Date().toISOString().split('T')[0]; // Fallback to today
  };

  // Helper function to get the event time (handles different data structures)
  const getEventTime = (event) => {
    if (event.time) {
      return event.time;
    } else if (event.schedule && event.schedule.time) {
      return event.schedule.time;
    }
    return "TBD"; // Fallback
  };

  // Helper function to get the event location as string
  const getEventLocation = (event) => {
    if (typeof event.location === 'string') {
      return event.location;
    } else if (event.location && event.location.name) {
      return event.location.name;
    } else if (event.location && event.location.address) {
      return event.location.address;
    }
    return "Location not specified"; // Fallback
  };

  // Add an enhanced buddy rewards calculation
  const calculateReward = () => {
    const baseReward = event.rewardPoints || 100;
    const multiplier = hasBuddyForActivity(eventId) ? 2 : 1;
    return baseReward * multiplier;
  };
  
  // Track a check-in with buddy
  const handleBuddyCheckIn = () => {
    // Get the buddy that's going to this activity with the user
    const buddy = getBuddyForActivity(eventId);
    
    if (!buddy) {
      alert("You don't have a buddy for this activity.");
      return;
    }
    
    // In a real app, this would involve a QR code scan or other verification
    // For now, we'll just show a success message
    
    // Create a buddy check-in notification
    addNotification({
      id: Date.now(),
      type: 'buddyCheckIn',
      message: `You and ${buddy.name} checked in for ${event.title}!`,
      timestamp: new Date(),
      read: false,
      activityId: eventId
    });
    
    // Show success message
    alert(`You and ${buddy.name} have successfully checked in!`);
  };
  
  if (loading) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center p-8">
          <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-medium text-gray-600">Event not found</h3>
          <p className="mt-2 text-gray-500">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={handleBack}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Go Back to Events
          </button>
        </div>
      </div>
    );
  }
  
  // Get the buddy that's going to this activity with the user (if any)
  const currentActivityBuddy = getBuddyForActivity(eventId);
  const isRegistered = registeredEvents && registeredEvents.includes(eventId);
  const isSaved = savedEvents && savedEvents.includes(eventId);
  
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Event Image & Header */}
      <div className="relative">
        <img 
          src={event.image || 'https://via.placeholder.com/400x200'} 
          alt={event.title} 
          className="w-full h-64 object-cover"
        />
        
        {/* Category Badge */}
        {event.category && (
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {typeof event.category === 'string' 
              ? (
                <span className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
              )
              : Array.isArray(event.category) && event.category.map((cat, index) => (
                <span key={index} className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
              ))
            }
          </div>
        )}
        
        {/* Buddy-Friendly Badge */}
        {event.buddyFriendly && (
          <div className="absolute bottom-4 right-4 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full flex items-center">
            <span className="mr-1">👥</span> Buddy Friendly
          </div>
        )}
      </div>
      
      {/* Navigation and Save Actions - Moved out of the image */}
      <div className="flex justify-between items-center bg-white px-4 py-2 border-b border-gray-100">
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        <button 
          onClick={toggleSaved}
          className="flex items-center text-gray-600"
        >
          {isSaved ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>Saved</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Save</span>
            </>
          )}
        </button>
      </div>
      
      {/* Event Details */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
        
        {/* Activity Tags - Added this section to display tags like 'social', 'exercise', etc. */}
        {event.tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {Array.isArray(event.tags) 
              ? event.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))
              : (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {event.tags}
                </span>
              )
            }
          </div>
        )}
        
        <div className="flex items-center mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-700">{formatDate(getEventDate(event))}</p>
        </div>
        
        <div className="flex items-center mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-700">{getEventTime(event)}</p>
        </div>
        
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-gray-700">{getEventLocation(event)}</p>
        </div>
        
        {/* Buddy Benefits Banner (for buddy-friendly events) */}
        {event.buddyFriendly && !isRegistered && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
            <h3 className="font-medium text-yellow-800 flex items-center text-lg">
              <span className="mr-2">👥</span> Better Together!
            </h3>
            <p className="mt-1 text-sm text-yellow-700">
              This is a buddy-friendly event. Bring a friend and you'll both earn <strong>double points</strong>!
            </p>
            
            {/* Points Comparison Visualization */}
            <div className="mt-3 flex justify-between items-center">
              <div className="text-center">
                <p className="text-xs text-gray-500">Solo</p>
                <div className="mt-1 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-semibold">{event.rewardPoints} pts</span>
                </div>
              </div>
              
              <div className="h-8 border-r border-gray-300"></div>
              
              <div className="text-center">
                <p className="text-xs text-gray-500">With Buddy</p>
                <div className="mt-1 flex items-center justify-center bg-yellow-100 px-3 py-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-semibold text-yellow-800">{event.rewardPoints * 2} pts</span>
                </div>
              </div>
            </div>
            
         
          </div>
        )}
        
        {/* Registered Sticker */}
        {isRegistered && (
          <div className="bg-green-100 border border-green-200 rounded-md p-3 mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full p-1 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-green-800">You're registered!</h3>
                <p className="text-sm text-green-700">We'll remind you before the event starts.</p>
              </div>
            </div>
            <button 
              onClick={handleCancelRegistration}
              className="text-red-500 text-sm underline"
            >
              Cancel
            </button>
          </div>
        )}
        
        {/* Buddy Section (if registered with buddy) */}
        {isRegistered && currentActivityBuddy && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
            <h3 className="font-medium text-yellow-800 mb-2">Going with Buddy</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                  {currentActivityBuddy.profileImage ? (
                    <img 
                      src={currentActivityBuddy.profileImage} 
                      alt={currentActivityBuddy.name} 
                      className="w-10 h-10 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-yellow-200 flex items-center justify-center text-yellow-600 font-bold">
                      {currentActivityBuddy.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{currentActivityBuddy.name}</p>
                  <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full inline-flex items-center">
                    <span className="mr-1">2x</span> Rewards
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleCancelBuddy}
                className="text-xs text-gray-500 underline"
              >
                Remove
              </button>
            </div>
          </div>
        )}
        
        {/* Buddy Check-In Button (only shown for upcoming events with buddies) */}
        {isRegistered && currentActivityBuddy && new Date(getEventDate(event)) >= new Date() && (
          <div className="mb-6">
            <button 
              onClick={handleBuddyCheckIn}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium shadow-md hover:bg-yellow-600 transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Check In With Buddy
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">Both you and your buddy need to check in to earn double rewards</p>
          </div>
        )}
        
        {/* Event Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">About This Event</h2>
          <p className="text-gray-700">{event.description || "Join us for this exciting event designed for active seniors! This event will help you stay physically active, socially connected, and mentally engaged."}</p>
        </div>
        
        {/* What's Included */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">What's Included</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Healthy refreshments</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Professional instructors</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{calculateReward()} Healthy365 points</span>
            </li>
            {event.buddyFriendly && (
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Double points when attending with a buddy</span>
              </li>
            )}
          </ul>
        </div>
        
        {/* People Attending */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">People Attending</h2>
          <div className="flex -space-x-2">
            {/* Display up to 5 profile pics */}
            {[...Array(Math.min(5, event.participants || 0))].map((_, index) => (
              <div 
                key={index}
                className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden"
              >
                <img 
                  src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${20 + index}.jpg`}
                  alt="Attendee"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            
            {(event.participants || 0) > 5 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500">
                +{(event.participants || 0) - 5}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">{event.participants || 0} seniors are attending this event</p>
        </div>
        
        {/* Registration Button */}
        {!isRegistered ? (
          <button 
            onClick={handleRegister}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium shadow-md hover:bg-green-600 transition-colors"
          >
            Register for Event
          </button>
        ) : (
          <button 
            onClick={() => navigate('/events')}
            className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg font-medium"
          >
            Find More Events
          </button>
        )}
      </div>
      
      {/* Buddy Selection Modal */}
      {showBuddyModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Bring a Buddy</h3>
              <button onClick={() => setShowBuddyModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="mb-4 text-gray-600">
              This is a buddy-friendly activity! Invite a buddy to join you and both of you will earn 2x the reward points.
            </p>
            
            <h4 className="text-sm font-medium text-gray-700 mb-2">Your Buddies</h4>
            <div className="space-y-3 mb-4">
              {buddies.length === 0 ? (
                <div className="text-center py-4 bg-gray-50 rounded-md">
                  <p className="text-gray-500">You don't have any buddies yet.</p>
                  <button 
                    onClick={() => {
                      setShowBuddyModal(false);
                      navigate('/buddies');
                    }}
                    className="mt-2 text-green-500 underline text-sm"
                  >
                    Find Buddies
                  </button>
                </div>
              ) : (
                buddies.map(buddy => (
                  <div key={buddy.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                        {buddy.profileImage ? (
                          <img 
                            src={buddy.profileImage} 
                            alt={buddy.name} 
                            className="w-10 h-10 object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-green-100 flex items-center justify-center text-green-600 font-bold">
                            {buddy.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{buddy.name}</p>
                        <p className="text-xs text-gray-500">{buddy.location || "No location"}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleBuddyInvite(buddy)}
                      className="text-green-500 text-sm py-1 px-3 border border-green-500 rounded-full"
                    >
                      Invite
                    </button>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => {
                  setShowBuddyModal(false);
                  registerForEvent(eventId);
                  navigate('/events');
                }}
                className="text-gray-600 py-2 px-4"
              >
                Skip for now
              </button>
              <button 
                onClick={() => setShowBuddyModal(false)}
                className="bg-gray-100 text-gray-600 py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Buddy Success Modal */}
      {showBuddySuccessModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Buddy Invited!</h3>
            <p className="mb-4 text-gray-600">
              We've sent an invitation to {selectedBuddy?.name}. You'll both earn double points when they join you!
            </p>
            
            {/* Double Points Badge */}
            <div className="mb-4 bg-yellow-50 border border-yellow-100 rounded-lg p-3 flex items-center justify-center">
              <span className="text-yellow-600 font-bold text-lg mr-2">2x</span>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-yellow-800">{event.rewardPoints * 2} points</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setShowBuddySuccessModal(false);
                registerForEvent(eventId);
                navigate('/events');
              }}
              className="w-full bg-green-500 text-white py-2 rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      )}
      
      {/* Cancel Registration Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Cancel Registration?</h3>
              <button onClick={() => setShowCancelModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="mb-6 text-gray-600">
              Are you sure you want to cancel your registration for {event.title}?
              {currentActivityBuddy && (
                <span className="block mt-2 text-yellow-600">
                  <strong>Note:</strong> This will also remove your buddy pairing with {currentActivityBuddy.name}.
                </span>
              )}
            </p>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
              >
                Keep Registration
              </button>
              <button 
                onClick={confirmCancelRegistration}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel Registration
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Standard Registration Confirmation Modal */}
      {showRegConfirmModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Confirm Registration</h3>
              <button onClick={() => setShowRegConfirmModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="mb-6 text-gray-600">
              Do you want to confirm registration for {event.title}?
            </p>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowRegConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
              >
                No
              </button>
              <button 
                onClick={confirmRegistration}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Buddy Registration Confirmation Modal */}
      {showBuddyConfirmModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Register with Buddy?</h3>
              <button onClick={() => setShowBuddyConfirmModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="mb-4 text-gray-600">
              Do you want to register with your buddy for {event.title}?
            </p>
            
            {/* Buddy selection - only shown if no buddy already selected */}
            {!currentActivityBuddy && buddies.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Choose a buddy:</p>
                {buddies.map(buddy => (
                  <div key={buddy.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md mb-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedBuddy(buddy)}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                        {buddy.profileImage ? (
                          <img 
                            src={buddy.profileImage} 
                            alt={buddy.name} 
                            className="w-10 h-10 object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-yellow-200 flex items-center justify-center text-yellow-600 font-bold">
                            {buddy.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{buddy.name}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${selectedBuddy?.id === buddy.id ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></div>
                  </div>
                ))}
                
                <div className="mt-3 bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">
                  <div className="flex items-center font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Buddy bonus
                  </div>
                  <p className="mt-1">Attending with a buddy earns you both 2x rewards points!</p>
                </div>
              </div>
            )}
            
            {/* Selected buddy info */}
            {(currentActivityBuddy || selectedBuddy) && (
              <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-md">
                <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                  {(currentActivityBuddy || selectedBuddy)?.profileImage ? (
                    <img 
                      src={(currentActivityBuddy || selectedBuddy).profileImage} 
                      alt={(currentActivityBuddy || selectedBuddy).name} 
                      className="w-10 h-10 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-yellow-200 flex items-center justify-center text-yellow-600 font-bold">
                      {(currentActivityBuddy || selectedBuddy).name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{(currentActivityBuddy || selectedBuddy).name}</p>
                  <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full inline-flex items-center">
                    <span className="mr-1">2x</span> Rewards
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowBuddyConfirmModal(false);
                  setShowRegConfirmModal(true);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
              >
                No
              </button>
              <button 
                onClick={() => {
                  if (selectedBuddy && !currentActivityBuddy) {
                    // Invite the selected buddy for this activity
                    handleBuddyInvite(selectedBuddy);
                  } else {
                    // Register with existing buddy
                    confirmBuddyRegistration();
                  }
                }}
                className={`px-4 py-2 bg-green-500 text-white rounded-md ${!selectedBuddy && !currentActivityBuddy ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!selectedBuddy && !currentActivityBuddy}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Registration Success Modal */}
      {showRegSuccessModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Registration Successful!</h3>
            
            {currentActivityBuddy ? (
              <p className="mb-4 text-gray-600">
                You have successfully registered for {event.title} with your buddy {currentActivityBuddy.name}!
              </p>
            ) : (
              <p className="mb-4 text-gray-600">
                You have successfully registered for {event.title}!
              </p>
            )}
            
            {/* Points Badge */}
            <div className="mb-4 bg-yellow-50 border border-yellow-100 rounded-lg p-3 flex items-center justify-center">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-yellow-800">
                  You've earned {calculateReward()} points!
                  {currentActivityBuddy && <span className="ml-1">(2x bonus!)</span>}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setShowRegSuccessModal(false);
                navigate('/events');
              }}
              className="w-full bg-green-500 text-white py-2 rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <div className="h-20"></div>
      <Healthy365Nav />
    </div>
  );
};

export default EventDetail;