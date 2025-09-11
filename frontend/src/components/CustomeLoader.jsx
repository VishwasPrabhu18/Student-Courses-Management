import React from "react";

const CustomeLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-72 h-40 flex flex-col items-center justify-center gap-3 p-4">
        {/* React logo (inline SVG) */}
        <svg
          className="w-14 h-14 animate-spin-smooth"
          viewBox="0 0 841.9 595.3"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <g fill="#61DAFB">
            <path d="M666.3 296.5c0 47.5-6.9 93.7-20.2 136.7C603.8 493 428.2 595.3 420.9 595.3c-7.3 0-182.9-102.3-225.2-161.9-13.3-43-20.2-89.2-20.2-136.9s6.9-93.9 20.2-136.9C238 102 413.6 0 421 0c7.3 0 182.9 102.3 225.2 161.9 13.3 43 20.1 89.2 20.1 136.6z" />
            <circle cx="420.9" cy="296.5" r="45.7" fill="#fff" />
          </g>
        </svg>

        <div className="text-center">
          <div className="text-sm font-medium text-gray-700">Loading</div>
          <div className="text-xs text-gray-500">Please wait a moment...</div>
        </div>
      </div>

      {/* small style tweak for smoother spin (you can put this in your global CSS) */}
      <style>{`
        @keyframes spin-smooth { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        .animate-spin-smooth { animation: spin-smooth 1.6s linear infinite; }
      `}</style>
    </div>
  );
};

export default CustomeLoader;
