import React, { useState, useMemo } from 'react';
import { Cloud, Server, Shield, Monitor, Code, Container, GitBranch, Settings } from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';

// Optimized data structures - O(1) lookup time
const TECH_DATA = {
  categories: [
    { id: 'cloud', name: 'Cloud', icon: Cloud },
    { id: 'containers', name: 'Containers', icon: Container },
    { id: 'iac', name: 'Infrastructure as Code', icon: Code },
    { id: 'cicd', name: 'CI/CD', icon: GitBranch },
    { id: 'monitoring', name: 'Monitoring', icon: Monitor },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'config', name: 'Configuration', icon: Server },
  ],
  technologies: [
    { name: 'AWS', category: 'cloud', color: 'bg-orange-500', icon: Cloud },
    { name: 'Kubernetes', category: 'containers', color: 'bg-blue-500', icon: Container },
    { name: 'Docker', category: 'containers', color: 'bg-blue-600', icon: Container },
    { name: 'Jenkins', category: 'cicd', color: 'bg-red-500', icon: GitBranch },
    { name: 'Terraform', category: 'iac', color: 'bg-purple-500', icon: Code },
    { name: 'Prometheus', category: 'monitoring', color: 'bg-orange-500', icon: Monitor },
    { name: 'Grafana', category: 'monitoring', color: 'bg-orange-600', icon: Monitor },
    { name: 'Helm', category: 'containers', color: 'bg-blue-700', icon: Container },
    { name: 'Ansible', category: 'config', color: 'bg-red-600', icon: Server },
    { name: 'SonarQube', category: 'security', color: 'bg-blue-600', icon: Shield },
    { name: 'Trivy', category: 'security', color: 'bg-green-600', icon: Shield },
    { name: 'Nexus', category: 'cicd', color: 'bg-green-500', icon: Server },
  ]
} as const;

const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Memoized filtered technologies - O(n) only when activeCategory changes
  const filteredTechnologies = useMemo(() =>
    activeCategory
      ? TECH_DATA.technologies.filter(tech => tech.category === activeCategory)
      : [],
    [activeCategory]
  );

  return (
    <section id="tech-stack" className="py-20 bg-gray-50 dark:bg-gray-900">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedSection animation="fadeInUp" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Expertise
              {/* Animated Tech Icons */}
              <div className="absolute -top-8 -right-8 hidden md:block">
                <div className="flex space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
                    <span className="text-white text-xs">⚡</span>
                  </div>
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
                    <span className="text-white text-xs">🔧</span>
                  </div>
                  <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
                    <span className="text-white text-xs">☁️</span>
                  </div>
                </div>
              </div>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade proficiency in cutting-edge DevOps technologies and cloud platforms.
              <br />
              <span className="text-lg text-blue-600 dark:text-white font-semibold">
                Click on a category to explore my technical competencies
              </span>
            </p>
          </div>
        </ScrollAnimatedSection>

        {/* Category Filters */}
        <ScrollAnimatedSection animation="fadeInUp" delay={200}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {TECH_DATA.categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 dark:bg-white text-white dark:text-gray-900 shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                {category.name}
              </button>
            );
            })}
          </div>
        </ScrollAnimatedSection>

        {/* Technology Grid */}
        <ScrollAnimatedSection animation="fadeInUp" delay={300}>
          <div className="min-h-[300px] flex items-center justify-center">
          {filteredTechnologies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
              {filteredTechnologies.map((tech, index) => {
                const IconComponent = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 ${tech.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {tech.name}
                      </h3>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 dark:bg-white h-2 rounded-full transition-all duration-1000 delay-300"
                          style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:bg-gradient-to-br dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                {/* Animated Background Pulse */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full animate-pulse opacity-30"></div>

                {/* Rotating Border */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-spin" style={{ animationDuration: '3s', background: 'linear-gradient(45deg, transparent, transparent, rgba(59, 130, 246, 0.3), transparent, transparent)' }}></div>

                {/* Main Icon */}
                <Settings className="h-12 w-12 text-blue-600 dark:text-white relative z-10 animate-bounce" style={{ animationDuration: '2s' }} />

                {/* Floating Tech Particles */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-60"></div>
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 -left-3 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 -right-3 w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '1.5s' }}></div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Explore My Technical Skills
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Dive into each section to see how I bring top-tier DevOps and cloud platforms to life through real-world experience and technical excellence.
              </p>
            </div>
          )}
          </div>
        </ScrollAnimatedSection>

        {/* Stats */}
        <ScrollAnimatedSection animation="fadeInUp" delay={400}>  
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-white mb-2">
              2+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Years of Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-white mb-2">
              7+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Projects Completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-white mb-2">
              7+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Technologies Mastered
            </div>
          </div>
        </div>
      </ScrollAnimatedSection>
      </div>
    </section>
  );
};

export default TechStack;