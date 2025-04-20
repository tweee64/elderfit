import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import AccessibilityControls from './AccessibilityControls';

const Header = () => {
  const { getTextSizeClass, getColorScheme } = useAccessibility();
  const colorScheme = getColorScheme();
  const [accessibilityMenuOpen, setAccessibilityMenuOpen] = useState(false);
  
  const toggleAccessibilityMenu = () => {
    setAccessibilityMenuOpen(!accessibilityMenuOpen);
  };
  
  return (
    <>
      {/* Accessibility toolbar - fixed at the top */}
      <div className={`${colorScheme.bg} border-b ${colorScheme.border} py-2 px-4`}>
        <div className="container mx-auto flex justify-end">
          <button 
            onClick={toggleAccessibilityMenu}
            className={`flex items-center px-3 py-2 rounded-lg bg-elderly-blue text-white ${getTextSizeClass()}`}
            aria-expanded={accessibilityMenuOpen}
            aria-controls="accessibility-menu"
          >
            <span className="mr-2">Accessibility Options</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={accessibilityMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Accessibility controls panel */}
      {accessibilityMenuOpen && (
        <div 
          id="accessibility-menu"
          className={`${colorScheme.bg} border-b ${colorScheme.border} shadow-md py-4`}
        >
          <div className="container mx-auto">
            <AccessibilityControls />
          </div>
        </div>
      )}
      
      {/* Main header */}
      <header className={`${colorScheme.bg} shadow-md`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Link to="/" className="flex items-center">
                <span className={`text-elderly-blue text-3xl font-bold ${getTextSizeClass()}`}>ElderFit</span>
              </Link>
            </div>
            
            <nav className="w-full md:w-auto">
              <ul className="flex flex-wrap justify-center md:justify-end space-x-1 md:space-x-4">
                <li>
                  <Link 
                    to="/" 
                    className={`elderly-accessible-tap px-3 py-2 rounded-lg ${colorScheme.text} ${getTextSizeClass()} hover:bg-elderly-blue hover:text-white`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/activities" 
                    className={`elderly-accessible-tap px-3 py-2 rounded-lg ${colorScheme.text} ${getTextSizeClass()} hover:bg-elderly-blue hover:text-white`}
                  >
                    Activities
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/groups" 
                    className={`elderly-accessible-tap px-3 py-2 rounded-lg ${colorScheme.text} ${getTextSizeClass()} hover:bg-elderly-blue hover:text-white`}
                  >
                    Groups
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/whatsapp" 
                    className={`elderly-accessible-tap px-3 py-2 rounded-lg ${colorScheme.text} ${getTextSizeClass()} hover:bg-elderly-blue hover:text-white`}
                  >
                    WhatsApp
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profile" 
                    className={`elderly-accessible-tap px-3 py-2 rounded-lg ${colorScheme.text} ${getTextSizeClass()} hover:bg-elderly-blue hover:text-white`}
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;