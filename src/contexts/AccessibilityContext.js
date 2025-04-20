import React, { createContext, useState, useContext } from 'react';

// Create context
export const AccessibilityContext = createContext();

// Custom hook to use the accessibility context
export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
  const [textSize, setTextSize] = useState('medium'); // small, medium, large, x-large
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Get text size class based on selected size
  const getTextSizeClass = () => {
    switch (textSize) {
      case 'small': return 'text-base';
      case 'medium': return 'text-lg';
      case 'large': return 'text-xl';
      case 'x-large': return 'text-2xl';
      default: return 'text-lg';
    }
  };

  // Get color scheme based on contrast preference
  const getColorScheme = () => {
    if (highContrast) {
      return {
        bg: 'bg-black',
        text: 'text-white',
        border: 'border-white',
        highlight: 'bg-yellow-400 text-black'
      };
    }
    return {
      bg: 'bg-white',
      text: 'text-gray-900',
      border: 'border-gray-300',
      highlight: 'bg-elderly-blue text-white'
    };
  };

  return (
    <AccessibilityContext.Provider value={{
      textSize,
      setTextSize,
      highContrast,
      setHighContrast,
      reducedMotion,
      setReducedMotion,
      getTextSizeClass,
      getColorScheme
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};