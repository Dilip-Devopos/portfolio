import React from 'react';
import { Server, Cloud, Database, Settings } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 transition-all duration-500">
      <div className="text-center">
        {/* DevOps Loading Animation */}
        <div className="w-64 h-64 mx-auto mb-8 relative">
          {/* Rotating DevOps Icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Center Server Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center animate-pulse">
                  <Server className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Rotating Icons */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pulsing Dots */}
          <div className="absolute inset-0">
            <div className="absolute top-8 left-8 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-8 right-8 w-3 h-3 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-8 left-8 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-8 right-8 w-3 h-3 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Loading Portfolio
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Preparing your DevOps experience...
          </p>

          {/* Progress Bar */}
          <div className="w-64 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                 style={{ width: '100%', animation: 'loading-progress 3s ease-in-out infinite' }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
