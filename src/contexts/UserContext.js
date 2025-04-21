import React, { createContext, useState, useContext } from 'react';

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
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  
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

  return (
    <UserContext.Provider value={{
      currentUser,
      joinedGroups,
      savedEvents,
      whatsappConnected,
      joinGroup,
      leaveGroup,
      saveEvent,
      removeEvent,
      connectWhatsapp,
      disconnectWhatsapp
    }}>
      {children}
    </UserContext.Provider>
  );
};