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
      <h2 className={`text-2xl font-bold mb-4 ${colorScheme.text}`}>Accessibility Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Text Size Section */}
        <div className={`p-4 rounded-lg border ${colorScheme.border}`}>
          <h3 className={`${colorScheme.text} text-xl font-semibold mb-3`}>Text Size</h3>
          <p className={`${colorScheme.text} mb-4`}>Adjust how large the text appears throughout the app.</p>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setTextSize('small')}
              className={`py-3 px-4 text-left rounded-lg flex items-center ${textSize === 'small' ? 'bg-elderly-blue text-white' : `${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border}`}`}
              aria-pressed={textSize === 'small'}
            >
              <span className="text-base mr-2">A</span>
              <span>Normal</span>
            </button>
            
            <button
              onClick={() => setTextSize('medium')}
              className={`py-3 px-4 text-left rounded-lg flex items-center ${textSize === 'medium' ? 'bg-elderly-blue text-white' : `${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border}`}`}
              aria-pressed={textSize === 'medium'}
            >
              <span className="text-lg mr-2">A</span>
              <span>Medium</span>
            </button>
            
            <button
              onClick={() => setTextSize('large')}
              className={`py-3 px-4 text-left rounded-lg flex items-center ${textSize === 'large' ? 'bg-elderly-blue text-white' : `${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border}`}`}
              aria-pressed={textSize === 'large'}
            >
              <span className="text-xl mr-2">A</span>
              <span>Large</span>
            </button>
            
            <button
              onClick={() => setTextSize('x-large')}
              className={`py-3 px-4 text-left rounded-lg flex items-center ${textSize === 'x-large' ? 'bg-elderly-blue text-white' : `${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border}`}`}
              aria-pressed={textSize === 'x-large'}
            >
              <span className="text-2xl mr-2">A</span>
              <span>Extra Large</span>
            </button>
          </div>
        </div>
        
        {/* Display Options Section */}
        <div className={`p-4 rounded-lg border ${colorScheme.border}`}>
          <h3 className={`${colorScheme.text} text-xl font-semibold mb-3`}>Display Options</h3>
          <p className={`${colorScheme.text} mb-4`}>Change how the app appears on screen.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div>
                <p className={`${colorScheme.text} font-medium`}>High Contrast</p>
                <p className={`${colorScheme.text} text-sm`}>Make text and elements more visible</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={highContrast}
                  onChange={() => setHighContrast(!highContrast)}
                  className="sr-only peer"
                />
                <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-elderly-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-elderly-blue"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Motion Section */}
        <div className={`p-4 rounded-lg border ${colorScheme.border}`}>
          <h3 className={`${colorScheme.text} text-xl font-semibold mb-3`}>Motion Settings</h3>
          <p className={`${colorScheme.text} mb-4`}>Adjust animation effects in the app.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div>
                <p className={`${colorScheme.text} font-medium`}>Reduce Motion</p>
                <p className={`${colorScheme.text} text-sm`}>Minimize moving effects</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={reducedMotion}
                  onChange={() => setReducedMotion(!reducedMotion)}
                  className="sr-only peer"
                />
                <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-elderly-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-elderly-blue"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className={`${colorScheme.text} text-sm`}>
          These settings will be remembered when you return to the app.
        </p>
      </div>
    </div>
  );
};

export default AccessibilityControls;