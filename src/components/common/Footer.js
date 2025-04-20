import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const Footer = () => {
  const { getTextSizeClass, getColorScheme } = useAccessibility();
  const colorScheme = getColorScheme();
  
  return (
    <footer className={`${colorScheme.bg} py-8 border-t ${colorScheme.border}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-cexnter">
              <span className={`text-elderly-blue text-2xl font-bold ${getTextSizeClass()}`}>
                ElderFit
              </span>
            </Link>
            <p className={`${colorScheme.text} mt-2 ${getTextSizeClass()}`}>
              Helping seniors stay active and connected
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-2">
              <Link to="/help" className={`${colorScheme.text} ${getTextSizeClass()} hover:text-elderly-blue`}>
                Help
              </Link>
              <Link to="/about" className={`${colorScheme.text} ${getTextSizeClass()} hover:text-elderly-blue`}>
                About
              </Link>
              <Link to="/privacy" className={`${colorScheme.text} ${getTextSizeClass()} hover:text-elderly-blue`}>
                Privacy
              </Link>
            </div>
            <p className={`${colorScheme.text} text-sm ${getTextSizeClass()}`}>
              © 2025 ElderFit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;