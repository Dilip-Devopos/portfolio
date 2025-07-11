import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ScrollNavigation: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  if (!showScrollTop) return null;

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
      {/* Page Up Button */}
      <button
        onClick={scrollToTop}
        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      >
        <ChevronUp className="h-4 w-4" />
      </button>

      {/* Page Down Button */}
      <button
        onClick={scrollToBottom}
        className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      >
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Progress Indicator */}
      <div className="w-8 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{
            width: `${Math.min(100, (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
          }}
        ></div>
      </div>
    </div>
  );
};

export default ScrollNavigation;
