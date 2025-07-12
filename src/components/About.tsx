import React, { useState } from 'react';
import { User, Award, Target, Code, Coffee, Calendar, CheckCircle } from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';

const About: React.FC = () => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleComplete, setScheduleComplete] = useState(false);

  const handleScheduleInterview = () => {
    setIsScheduling(true);
    setScheduleComplete(false);

    // Show animation for 2 seconds, then open modal directly
    setTimeout(() => {
      setIsScheduling(false);
      setScheduleComplete(true);

      // Dispatch custom event to open interview modal immediately
      const openModalEvent = new CustomEvent('openInterviewModal');
      window.dispatchEvent(openModalEvent);

      // Reset the complete state after animation
      setTimeout(() => {
        setScheduleComplete(false);
      }, 1000);
    }, 2000);
  };

  const stats = [
    { label: 'Years Experience', value: '2+', icon: Award },
    { label: 'Projects Completed', value: '3+', icon: Target },
    { label: 'Technologies Mastered', value: '7+', icon: Code },
    { label: 'Coffee Consumed', value: '∞', icon: Coffee },
  ];



  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimatedSection animation="fadeInUp" delay={100}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <User className="h-8 w-8 text-blue-600 dark:text-white animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                About Me
              </h2>
              {/* Animated DevOps Badge */}
              <div className="absolute -top-4 -right-8 hidden md:block">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
                  <span className="text-white text-xs font-bold">🚀</span>
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              DevOps Professional
            </p>
          </div>
        </ScrollAnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Image and Stats */}
          <ScrollAnimatedSection animation="fadeInLeft" delay={200}>
            <div className="space-y-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-96 h-96 mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/screenshots/profile.png"
                  alt="Dilip Kumar - DevOps Engineer"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-green-600 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-300 dark:bg-green-600 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Open to Opportunities</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-fade-in-up cursor-pointer relative overflow-hidden"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Simple Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <IconComponent className="h-8 w-8 text-blue-600 dark:text-white mx-auto mb-3 group-hover:animate-bounce relative z-10" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1 group-hover:animate-pulse relative z-10">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 relative z-10">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          </ScrollAnimatedSection>

          {/* Right Side - About Content */}
          <ScrollAnimatedSection animation="fadeInRight" delay={300}>
            <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              DevOps Engineer 
            </h3>

            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                <strong>DevOps Engineer</strong> with 2+ years of proven experience in designing and implementing
                enterprise-grade infrastructure solutions. Currently driving digital transformation initiatives
                at scale, with expertise in microservices architecture, and automated deployment strategies.
              </p>

              <p>
                <strong>Technical Leadership:</strong> Led cross-functional teams in delivering mission-critical projects,
                reducing deployment time by 80% and improving system reliability to 99.9% uptime. Specialized in
                AWS cloud platforms, Kubernetes orchestration, and comprehensive CI/CD pipeline automation.
              </p>

              <p>
                <strong>Innovation & Results:</strong> Architected scalable solutions serving millions of users,
                implemented Infrastructure as Code practices, and established DevSecOps workflows that enhanced
                security posture while accelerating delivery cycles. Proven track record of cost optimization
                and performance enhancement in enterprise environments.
              </p>

              <p>
                <strong>Continuous Growth:</strong> Actively pursuing advanced certifications and staying current
                with emerging technologies. Open to discussing exciting opportunities with forward-thinking
                organizations that value innovation and technical excellence.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button
                onClick={handleScheduleInterview}
                disabled={isScheduling}
                className={`relative overflow-hidden px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
                  scheduleComplete
                    ? 'bg-green-600 text-white cursor-default'
                    : isScheduling
                      ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900'
                }`}
              >

                {/* Content */}
                <div className="relative z-10 flex items-center gap-2">
                  {scheduleComplete ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Redirecting...</span>
                    </>
                  ) : isScheduling ? (
                    <div className="flex items-center justify-center">
                      {/* GIF Animation */}
                      <img
                        src="https://i.gifer.com/7efs.gif"
                        alt="Loading..."
                        className="w-8 h-8 rounded"
                      />
                    </div>
                  ) : (
                    <>
                      <span>Schedule Interview</span>
                      <Calendar className="h-5 w-5" />
                    </>
                  )}
                </div>


              </button>
            </div>
            </div>
          </ScrollAnimatedSection>
        </div>


      </div>
    </section>
  );
};

export default About;
