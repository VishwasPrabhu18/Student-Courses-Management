import { useState } from 'react';

const ProgressBar = ({ progress }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="w-full relative">
      <div className="w-full bg-gray-200 rounded-full h-3 mt-3 relative">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
        
        {/* Progress Pointer */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
          style={{ left: `${progress}%` }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Pointer Circle */}
          <div className="w-5 h-5 bg-blue-700 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform duration-200">
            <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          {/* Tooltip/Popover */}
          {showTooltip && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                {Math.round(progress)}%
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;