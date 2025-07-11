import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';

// Lazy load components for better performance - O(1) initial bundle size
const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const TechStack = lazy(() => import('./components/TechStack'));
const Projects = lazy(() => import('./components/Projects'));
const PipelinesSection = lazy(() => import('./components/PipelinesSection'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const LoadingScreen = lazy(() => import('./components/LoadingScreen'));
const ScrollNavigation = lazy(() => import('./components/ScrollNavigation'));

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage if available - O(1) time complexity
    return localStorage.getItem('darkMode') === 'true';
  });
  const [isLoading, setIsLoading] = useState(true);

  // Optimized dark mode toggle with localStorage persistence
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  }, []);

  useEffect(() => {
    // Optimized DOM manipulation - O(1) time complexity
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Reduced loading time for better UX - O(1) time complexity
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>}>
      <LoadingScreen isLoading={isLoading} />
      <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <PipelinesSection />
        <Experience />
        <Contact />
        <Footer />
        <ScrollNavigation />
      </div>
    </Suspense>
  );
}

export default App;