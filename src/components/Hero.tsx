import React, { useState } from 'react';
import { Github, Linkedin, Mail, Download, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownloadResume = () => {
    setIsDownloading(true);

    // Simulate download process with animation
    setTimeout(() => {
      const resumeUrl = '/resume.pdf';
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Dilip_Kumar_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
      setDownloadComplete(true);

      // Reset the complete state after 3 seconds
      setTimeout(() => {
        setDownloadComplete(false);
      }, 3000);
    }, 1000);
  };



  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-stone-200 dark:from-gray-800 dark:to-gray-900"></div>



      {/* Download Resume Button - Top Right */}
      <div className="absolute top-20 right-4 sm:right-8 z-20">
        <button
          onClick={handleDownloadResume}
          disabled={isDownloading}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl group overflow-hidden ${
            downloadComplete
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : isDownloading
                ? 'bg-blue-500 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
          }`}
        >
          {/* Background Animation */}
          {isDownloading && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse"></div>
          )}

          {/* Content */}
          <div className="relative flex items-center gap-2">
            {downloadComplete ? (
              <>
                <CheckCircle className="h-4 w-4 animate-bounce" />
                <span className="animate-pulse">Downloaded!</span>
              </>
            ) : isDownloading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 group-hover:animate-bounce transition-transform" />
                <span>Resume</span>
              </>
            )}
          </div>

          {/* Success Confetti Effect */}
          {downloadComplete && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-0 left-4 w-1 h-1 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute top-2 right-0 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                <div className="absolute bottom-0 left-2 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                <div className="absolute bottom-1 right-2 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Content - Responsive Layout */}
      <div className="relative z-10 max-w-7xl mx-auto responsive-container h-full flex items-start">
        <div className="w-full max-w-2xl mt-20 sm:mt-24 md:mt-28 lg:mt-32">
          <h1 className="responsive-text-4xl md:responsive-text-5xl lg:responsive-text-6xl xl:responsive-text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            <span className="block animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              Dilip Kumar
            </span>
            <span className="block text-gray-700 dark:text-gray-300 responsive-text-3xl md:responsive-text-4xl lg:responsive-text-5xl xl:responsive-text-6xl">
              DevOps Engineer
            </span>
          </h1>

          <p className="responsive-text-lg md:responsive-text-xl lg:responsive-text-2xl text-gray-800 dark:text-white mb-6 sm:mb-8 leading-relaxed animate-fade-in-up max-w-2xl" style={{ animationDelay: '0.6s' }}>
            <span className="inline-block animate-typewriter">DevOps Engineer • CI/CD Specialist</span>
            <br />
            <span className="responsive-text-base md:responsive-text-lg text-blue-700 dark:text-blue-300 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              Transforming enterprise infrastructure with cutting-edge automation and scalable solutions
            </span>
          </p>

          {/* CTA Buttons - Enhanced for Mobile */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <a
              href="#projects"
              className="touch-target bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl responsive-text-base"
            >
              View My Projects
            </a>

            <a
              href="#contact"
              className="touch-target bg-transparent border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white hover:bg-gray-800 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 text-center responsive-text-base"
            >
              Let's Connect
            </a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="https://www.linkedin.com/in/dilipkumarselvam" target="_blank" rel="noopener noreferrer" className="group">
              <div className="p-3 bg-gray-800/15 dark:bg-white/15 backdrop-blur-sm rounded-full hover:bg-gray-800/25 dark:hover:bg-white/25 transition-all duration-200 group-hover:scale-110">
                <Linkedin className="h-6 w-6 text-gray-800 dark:text-white" />
              </div>
            </a>
            <a href="https://github.com/Dilip-Devopos?tab=repositories" target="_blank" rel="noopener noreferrer" className="group">
              <div className="p-3 bg-gray-800/15 dark:bg-white/15 backdrop-blur-sm rounded-full hover:bg-gray-800/25 dark:hover:bg-white/25 transition-all duration-200 group-hover:scale-110">
                <Github className="h-6 w-6 text-gray-800 dark:text-white" />
              </div>
            </a>
            <a href="mailto:dilipbca99@gmail.com" className="group">
              <div className="p-3 bg-gray-800/15 dark:bg-white/15 backdrop-blur-sm rounded-full hover:bg-gray-800/25 dark:hover:bg-white/25 transition-all duration-200 group-hover:scale-110">
                <Mail className="h-6 w-6 text-gray-800 dark:text-white" />
              </div>
            </a>
          </div>
        </div>

        {/* DevOps Animation Section */}
        <div className="lg:w-1/2 flex items-center justify-center">
          <div className="relative w-96 h-96">
            {/* DevOps Infrastructure Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 relative">
                {/* Cloud Infrastructure GIF-like Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-3xl opacity-20 animate-pulse"></div>

                {/* Animated DevOps Pipeline */}
                <div className="absolute inset-4 flex flex-col justify-center space-y-6">
                  {/* Code Repository */}
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
                      <span className="text-white font-bold text-sm">CODE</span>
                    </div>
                  </div>

                  {/* Pipeline Arrow */}
                  <div className="flex justify-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-blue-500 animate-pulse"></div>
                  </div>

                  {/* CI/CD Pipeline */}
                  <div className="flex justify-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
                      <span className="text-white font-bold text-xs">CI</span>
                    </div>
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }}>
                      <span className="text-white font-bold text-xs">CD</span>
                    </div>
                  </div>

                  {/* Pipeline Arrow */}
                  <div className="flex justify-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-orange-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>

                  {/* Cloud Deployment */}
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2s' }}>
                      <span className="text-white font-bold text-sm">☁️</span>
                    </div>
                  </div>
                </div>

                {/* Floating DevOps Icons */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-ping">
                  <span className="text-white text-xs">🐳</span>
                </div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-ping" style={{ animationDelay: '1s' }}>
                  <span className="text-white text-xs">⚙️</span>
                </div>
                <div className="absolute top-1/2 left-4 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center animate-ping" style={{ animationDelay: '2s' }}>
                  <span className="text-white text-xs">🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-800 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-800 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;