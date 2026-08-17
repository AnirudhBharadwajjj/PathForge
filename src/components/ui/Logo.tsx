import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Simple, modern logo - stylized compass/path */}
        <div className="w-10 h-10 bg-gradient-to-br from-ios-blue to-ios-purple rounded-xl flex items-center justify-center shadow-lg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            {/* Stylized P with forward path */}
            <path
              d="M7 19V5H13C15.5 5 17 6.5 17 9C17 11.5 15.5 13 13 13H10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Arrow indicating forward path */}
            <path
              d="M12 13L17 18M17 18H14M17 18V15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      {showText && (
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-ios-blue to-ios-purple bg-clip-text text-transparent">
            PathForge
          </h1>
          <p className="text-xs text-ios-gray-500 -mt-1">AI Career Navigator</p>
        </div>
      )}
    </div>
  );
};

export default Logo;