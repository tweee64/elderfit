import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
export const UserContext = createContext();

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Mock user data for demo purposes - using useState without destructuring the setter since we don't need it
  const [currentUser] = useState({
    id: 1,
    name: "Lim Ah Meng",
    age: 68,
    location: {
      address: "Toa Payoh, Singapore",
      coordinates: { lat: 1.3329, lng: 103.8485 }
    },
    healthy365Data: {
      dailySteps: 5432,
      weeklyAverage: 4985,
      healthConditions: ["Mild hypertension", "Type 2 diabetes"],
      fitnessLevel: "Moderate"
    },
    interests: ["Gardening", "Tai Chi", "Reading", "Singing"]
  });
  
  const [joinedGroups, setJoinedGroups] = useState([1, 3]); // Mock joined group IDs
  const [savedEvents, setSavedEvents] = useState([2, 5]); // Mock saved event IDs
  const [registeredEvents, setRegisteredEvents] = useState([]); // Track registered events
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    textSize: 'medium',
    highContrast: false,
    readAloud: false,
  });

  // New state for buddy system
  const [buddies, setBuddies] = useState([
    {
      id: 101,
      name: "Tan Mei Ling",
      age: 65,
      location: "Tampines, Singapore",
      profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
      interests: ["Tai Chi", "Cooking", "Reading"]
    },
    {
      id: 102,
      name: "Kumar Rajan",
      age: 70,
      location: "Bedok, Singapore",
      profileImage: "https://randomuser.me/api/portraits/men/72.jpg",
      interests: ["Walking", "Chess", "Gardening"]
    },
    {
      id: 103,
      name: "Wong Li Hua",
      age: 67,
      location: "Ang Mo Kio, Singapore",
      profileImage: "https://randomuser.me/api/portraits/women/75.jpg",
      interests: ["Dancing", "Yoga", "Singing"]
    }
  ]);
  const [pendingBuddyRequests, setPendingBuddyRequests] = useState({
    incoming: [],
    outgoing: [],
  });
  const [buddyActivities, setBuddyActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedEventsData = localStorage.getItem('savedEvents');
    const registeredEventsData = localStorage.getItem('registeredEvents');
    const accessibilityData = localStorage.getItem('accessibilitySettings');
    const buddiesData = localStorage.getItem('buddies');
    const pendingBuddyRequestsData = localStorage.getItem('pendingBuddyRequests');
    const buddyActivitiesData = localStorage.getItem('buddyActivities');
    const notificationsData = localStorage.getItem('notifications');

    if (savedEventsData) setSavedEvents(JSON.parse(savedEventsData));
    if (registeredEventsData) setRegisteredEvents(JSON.parse(registeredEventsData));
    if (accessibilityData) setAccessibilitySettings(JSON.parse(accessibilityData));
    if (buddiesData) setBuddies(JSON.parse(buddiesData));
    if (pendingBuddyRequestsData) setPendingBuddyRequests(JSON.parse(pendingBuddyRequestsData));
    if (buddyActivitiesData) setBuddyActivities(JSON.parse(buddyActivitiesData));
    if (notificationsData) setNotifications(JSON.parse(notificationsData));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
  }, [registeredEvents]);

  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
  }, [accessibilitySettings]);

  useEffect(() => {
    localStorage.setItem('buddies', JSON.stringify(buddies));
  }, [buddies]);

  useEffect(() => {
    localStorage.setItem('pendingBuddyRequests', JSON.stringify(pendingBuddyRequests));
  }, [pendingBuddyRequests]);

  useEffect(() => {
    localStorage.setItem('buddyActivities', JSON.stringify(buddyActivities));
  }, [buddyActivities]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Functions to modify user data
  const joinGroup = (groupId) => {
    if (!joinedGroups.includes(groupId)) {
      setJoinedGroups([...joinedGroups, groupId]);
      return true;
    }
    return false;
  };

  const leaveGroup = (groupId) => {
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(joinedGroups.filter(id => id !== groupId));
      return true;
    }
    return false;
  };

  const saveEvent = (eventId) => {
    if (!savedEvents.includes(eventId)) {
      setSavedEvents([...savedEvents, eventId]);
      return true;
    }
    return false;
  };

  const removeEvent = (eventId) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(savedEvents.filter(id => id !== eventId));
      return true;
    }
    return false;
  };

  const connectWhatsapp = (phoneNumber) => {
    // In a real app, this would involve an actual API call
    setWhatsappConnected(true);
    return true;
  };

  const disconnectWhatsapp = () => {
    setWhatsappConnected(false);
    return true;
  };

  const updateAccessibility = (settings) => {
    setAccessibilitySettings(prev => ({ ...prev, ...settings }));
  };

  // New methods for buddy system
  const sendBuddyRequest = (buddyToAdd) => {
    // Add to outgoing requests
    setPendingBuddyRequests(prev => ({
      ...prev,
      outgoing: [...prev.outgoing, buddyToAdd]
    }));
    
    // Create a notification for the added buddy (in a real app, this would send to their account)
    addNotification({
      id: Date.now(),
      type: 'buddyRequest',
      message: `You sent a buddy request to ${buddyToAdd.name}`,
      timestamp: new Date(),
      read: false
    });
  };

  const acceptBuddyRequest = (buddyToAccept) => {
    // Add to buddies list
    setBuddies(prev => [...prev, buddyToAccept]);
    
    // Remove from incoming requests
    setPendingBuddyRequests(prev => ({
      ...prev,
      incoming: prev.incoming.filter(request => request.id !== buddyToAccept.id)
    }));
    
    // Add notification
    addNotification({
      id: Date.now(),
      type: 'buddyAccepted',
      message: `You are now buddies with ${buddyToAccept.name}!`,
      timestamp: new Date(),
      read: false
    });
  };

  const rejectBuddyRequest = (buddyToReject) => {
    // Remove from incoming requests
    setPendingBuddyRequests(prev => ({
      ...prev,
      incoming: prev.incoming.filter(request => request.id !== buddyToReject.id)
    }));
  };

  const removeBuddy = (buddyToRemove) => {
    setBuddies(prev => prev.filter(buddy => buddy.id !== buddyToRemove.id));
  };

  const inviteBuddyToActivity = (buddy, activity) => {
    // In a real app, this would send the invitation to the buddy
    // For now, we'll simulate it with a notification
    addNotification({
      id: Date.now(),
      type: 'activityInvite',
      message: `You invited ${buddy.name} to join ${activity.title}`,
      timestamp: new Date(),
      read: false,
      activityId: activity.id
    });
  };

  const rsvpWithBuddy = (buddy, activity) => {
    // Add to buddy activities
    setBuddyActivities(prev => [...prev, {
      id: Date.now(),
      buddyId: buddy.id,
      activityId: activity.id,
      timestamp: new Date(),
      status: 'confirmed'
    }]);
    
    // Add notification
    addNotification({
      id: Date.now(),
      type: 'buddyRsvp',
      message: `You and ${buddy.name} are confirmed for ${activity.title}`,
      timestamp: new Date(),
      read: false,
      activityId: activity.id
    });
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getUnreadNotificationCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  // Check if an activity has buddy participation
  const hasBuddyForActivity = (activityId) => {
    return buddyActivities.some(ba => ba.activityId === activityId);
  };

  // Get buddy for a specific activity
  const getBuddyForActivity = (activityId) => {
    const buddyActivity = buddyActivities.find(ba => ba.activityId === activityId);
    if (!buddyActivity) return null;
    
    return buddies.find(buddy => buddy.id === buddyActivity.buddyId);
  };

  // Calculate reward multiplier (2x for buddy activities)
  const getRewardMultiplier = (activityId) => {
    return hasBuddyForActivity(activityId) ? 2 : 1;
  };

  // Register for an event
  const registerForEvent = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
      
      // Add a notification that the user has registered
      addNotification({
        id: Date.now(),
        type: 'eventRegistration',
        message: `You have successfully registered for this event!`,
        timestamp: new Date(),
        read: false,
        eventId: eventId
      });
      
      return true;
    }
    return false;
  };

  // Cancel event registration
  const removeBuddyFromActivity = (activityId) => {
    setBuddyActivities(prev => prev.filter(ba => ba.activityId !== activityId));
  };

  const cancelRegistration = (eventId) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
      
      // Remove any buddy associations for this event
      if (hasBuddyForActivity(eventId)) {
        removeBuddyFromActivity(eventId);
      }
      
      // Add a notification about the cancellation
      addNotification({
        id: Date.now(),
        type: 'eventCancellation',
        message: `You have cancelled your registration for this event.`,
        timestamp: new Date(),
        read: false,
        eventId: eventId
      });
      
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      joinedGroups,
      savedEvents,
      registeredEvents,
      whatsappConnected,
      joinGroup,
      leaveGroup,
      saveEvent,
      removeEvent,
      connectWhatsapp,
      disconnectWhatsapp,
      accessibilitySettings,
      updateAccessibility,
      buddies,
      pendingBuddyRequests,
      buddyActivities,
      notifications,
      sendBuddyRequest,
      acceptBuddyRequest,
      rejectBuddyRequest,
      removeBuddy,
      inviteBuddyToActivity,
      rsvpWithBuddy,
      addNotification,
      markNotificationAsRead,
      clearAllNotifications,
      getUnreadNotificationCount,
      hasBuddyForActivity,
      getBuddyForActivity,
      getRewardMultiplier,
      registerForEvent,
      cancelRegistration
    }}>
      {children}
    </UserContext.Provider>
  );
};