import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedSection animation="fadeInUp" delay={100}>
          <div className="grid md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Dilip Kumar
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              DevOps Engineer with 2+ years of enterprise experience. Specializing in Devops & cloud,
              Kubernetes orchestration, and automated CI/CD solutions. Open to discussing exciting opportunities
              with innovative technology companies.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/Dilip-Devopos?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:dilipbca99@gmail.com"
                className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="text-gray-400 hover:text-white transition-colors">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-400 hover:text-white transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">DevOps Consulting</span>
              </li>
              <li>
                <span className="text-gray-400">CI/CD Setup</span>
              </li>
              <li>
                <span className="text-gray-400">Kubernetes Deployment</span>
              </li>
              <li>
                <span className="text-gray-400">Infrastructure as Code</span>
              </li>
              <li>
                <span className="text-gray-400">Monitoring & Alerting</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Dilip Kumar. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-gray-400 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>by a DevOps Engineer</span>
            </div>
          </div>
        </div>
        </ScrollAnimatedSection>
      </div>
    </footer>
  );
};

export default Footer;