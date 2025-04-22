import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ 
  title, 
  backgroundColor = "bg-green-600", // Changed to green-600 for consistency
  textColor = "text-white",
  onBackClick,
  showBack = true,
  rightElement,
}) => {
  const navigate = useNavigate();

  // Handle back button click using the browser's history
  // or custom function if provided
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1); // Use browser history
    }
  };

  return (
    <header className={`${backgroundColor} ${textColor} shadow-md sticky top-0 z-10`}>
      <div className="max-w-md mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center">
          {showBack && (
            <button 
              onClick={handleBackClick}
              className="mr-2"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        
        {rightElement && <div>{rightElement}</div>}
      </div>
    </header>
  );
};

export default Header;