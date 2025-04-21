import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const Footer = () => {
  const { getTextSizeClass } = useAccessibility();
  
  return (
    <footer className="bg-white py-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className={`text-primary text-2xl font-bold ${getTextSizeClass()}`}>
                ElderFit
              </span>
            </Link>
            <p className={`text-neutral-text mt-2 ${getTextSizeClass()}`}>
              Helping seniors stay active and connected
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-3">
              <Link to="/elderlink" className={`text-neutral-text ${getTextSizeClass()} hover:text-primary`}>
                ElderLink Chat
              </Link>
              <Link to="/rewards" className={`text-neutral-text ${getTextSizeClass()} hover:text-primary`}>
                Elderly Rewards
              </Link>
              <Link to="/help" className={`text-neutral-text ${getTextSizeClass()} hover:text-primary`}>
                Help
              </Link>
              <Link to="/about" className={`text-neutral-text ${getTextSizeClass()} hover:text-primary`}>
                About
              </Link>
              <Link to="/privacy" className={`text-neutral-text ${getTextSizeClass()} hover:text-primary`}>
                Privacy
              </Link>
            </div>
            <p className={`text-neutral-text text-sm ${getTextSizeClass()}`}>
              © 2025 ElderFit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;