import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const AccessibilityControls = () => {
  const { 
    textSize, 
    setTextSize, 
    highContrast, 
    setHighContrast, 
    reducedMotion, 
    setReducedMotion,
    getColorScheme
  } = useAccessibility();
  
  const colorScheme = getColorScheme();
  
  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4 text-neutral-text">Accessibility Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Text Size Section */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-card">
          <h3 className="text-xl font-semibold mb-3 text-neutral-text">Text Size</h3>
          <p className="text-neutral-text mb-4">Adjust how large the text appears throughout the app.</p>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setTextSize('small')}
              className={`py-3 px-4 text-left rounded-xl flex items-center ${textSize === 'small' ? 'bg-primary text-white' : `bg-white text-neutral-text border border-gray-200`}`}
              aria-pressed={textSize === 'small'}
            >
              <span className="text-base mr-2">A</span>
              <span>Normal</span>
            </button>
            
            <button
              onClick={() => setTextSize('medium')}
              className={`py-3 px-4 text-left rounded-xl flex items-center ${textSize === 'medium' ? 'bg-primary text-white' : `bg-white text-neutral-text border border-gray-200`}`}
              aria-pressed={textSize === 'medium'}
            >
              <span className="text-lg mr-2">A</span>
              <span>Medium</span>
            </button>
            
            <button
              onClick={() => setTextSize('large')}
              className={`py-3 px-4 text-left rounded-xl flex items-center ${textSize === 'large' ? 'bg-primary text-white' : `bg-white text-neutral-text border border-gray-200`}`}
              aria-pressed={textSize === 'large'}
            >
              <span className="text-xl mr-2">A</span>
              <span>Large</span>
            </button>
            
            <button
              onClick={() => setTextSize('x-large')}
              className={`py-3 px-4 text-left rounded-xl flex items-center ${textSize === 'x-large' ? 'bg-primary text-white' : `bg-white text-neutral-text border border-gray-200`}`}
              aria-pressed={textSize === 'x-large'}
            >
              <span className="text-2xl mr-2">A</span>
              <span>Extra Large</span>
            </button>
          </div>
        </div>
        
        {/* Display Options Section */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-card">
          <h3 className="text-xl font-semibold mb-3 text-neutral-text">Display Options</h3>
          <p className="text-neutral-text mb-4">Change how the app appears on screen.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div>
                <p className="text-neutral-text font-medium">High Contrast</p>
                <p className="text-neutral-text text-sm">Make text and elements more visible</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={highContrast}
                  onChange={() => setHighContrast(!highContrast)}
                  className="sr-only peer"
                />
                <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Motion Section */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-card">
          <h3 className="text-xl font-semibold mb-3 text-neutral-text">Motion Settings</h3>
          <p className="text-neutral-text mb-4">Adjust animation effects in the app.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div>
                <p className="text-neutral-text font-medium">Reduce Motion</p>
                <p className="text-neutral-text text-sm">Minimize moving effects</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={reducedMotion}
                  onChange={() => setReducedMotion(!reducedMotion)}
                  className="sr-only peer"
                />
                <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-neutral-text text-sm">
          These settings will be remembered when you return to the app.
        </p>
      </div>
    </div>
  );
};

export default AccessibilityControls;