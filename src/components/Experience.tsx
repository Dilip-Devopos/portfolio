import React, { useState } from 'react';
import { Award, Calendar, MapPin, ExternalLink, X, Download, Eye } from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';

const Experience: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const experiences = [
    {
      title: 'Software Developer - DevOps Engineer',
      company: 'Zeomage Infotech Pvt Ltd',
      location: 'Bangalore, IND',
      period: '2022 - 2024',
      description: 'Enterprise WSO2 API Management & DevOps Implementation.',
      achievements: [
        'Engineered robust CI/CD pipeline for security scanning utilizing the Dependency Check tool for JAR files and vulnerability detection',
        'Devised automated workflows to transfer artifacts, orchestrate environments, and deploy WSO2 API Manager via Puppet',
        'WSO2 API Manager and Micro Integrator instances from Windows to Kubernetes platform',
        'Orchestrated WSO2 API Manager security patch updates leveraging built-in executable tools with zero downtime'
      ]
    },
    {
      title: 'Egaisoft Projects',
      company: 'Egaisoft',
      location: 'Bangalore, IND',
      period: '2021 - 2022',
      description: 'EndtoEndImplementingFullstackWebApplication.',
      achievements: [
        ' Developed auser-friendly and responsive online web application using ReactJS, CSS, HTML,andBootstrap.',
        'Integrated RESTful APIs with the Java Spring Boot backend tohandleuserdata andproductinformation, ensuring real-time updates.',
        'Utilized MySQL asthedatabase for data storage and retrieval, ensuring dataintegrity and reliability'
      ]
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'Guvi DevOps Certification',
      issuer: 'DevOps Institute',
      year: '2025',
      logo: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      certificateUrl: '/devops_cert.png',
      description: 'Comprehensive DevOps certification covering CI/CD pipelines, containerization, cloud platforms, and infrastructure automation. This certification validates expertise in modern DevOps practices, including continuous integration, continuous deployment, infrastructure as code, and cloud-native technologies.',
      skills: ['Docker & Kubernetes', 'AWS Cloud Services', 'Jenkins CI/CD', 'Terraform IaC', 'Monitoring & Logging', 'GitOps', 'Microservices Architecture', 'Security Best Practices'],
      validUntil: 'Lifetime',
      credentialId: 'DEVOPS-2025-001',
      achievements: [
        'Successfully completed 40+ hours of hands-on DevOps training',
        'Demonstrated proficiency in container orchestration with Kubernetes',
        'Built and deployed scalable CI/CD pipelines using Jenkins and GitLab',
        'Implemented Infrastructure as Code using Terraform and Ansible',
        'Configured monitoring and alerting systems with Prometheus and Grafana'
      ],
      learningOutcomes: [
        'Design and implement robust CI/CD pipelines',
        'Deploy and manage containerized applications at scale',
        'Automate infrastructure provisioning and configuration',
        'Implement security best practices in DevOps workflows',
        'Monitor and troubleshoot distributed systems effectively'
      ],
      projectsCompleted: 5,
      totalHours: 120,
      grade: 'A+',
      verificationUrl: 'https://v2.zenclass.in/certificate'
    }
  ];

  const handleCertificateClick = (certificate: any) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCertificate(null), 300);
  };

  const downloadCertificate = () => {
    if (selectedCertificate?.certificateUrl) {
      const link = document.createElement('a');
      link.href = selectedCertificate.certificateUrl;
      link.download = `${selectedCertificate.name.replace(/\s+/g, '_')}.png`;
      link.click();
    }
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedSection animation="fadeInUp" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Experience & Certifications
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional journey and industry-recognized certifications
            </p>
          </div>
        </ScrollAnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Timeline */}
          <ScrollAnimatedSection animation="fadeInLeft" delay={200}>
            <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Professional Experience
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-8 pb-8 border-l-2 border-blue-200 dark:border-blue-800 last:border-l-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {exp.title}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </ScrollAnimatedSection>

          {/* Certifications */}
          <ScrollAnimatedSection animation="fadeInRight" delay={300}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Certifications
            </h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="group bg-gray-50 dark:bg-gray-700 p-6 rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 hover:-translate-y-2 hover:scale-105 animate-fade-in-up relative overflow-hidden"
                  onClick={() => handleCertificateClick(cert)}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Simple Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-12 h-12 bg-blue-600 dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0 group-hover:animate-bounce group-hover:shadow-lg transition-all duration-300">
                      <Award className="h-6 w-6 text-white dark:text-blue-600 group-hover:animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-600 dark:text-white font-medium">
                          {cert.year}
                        </span>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-white">
                          <span className="text-sm font-medium">View Certificate</span>
                          <ExternalLink className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Progress */}
            <div className="mt-12">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Core Skills
              </h4>
              <div className="space-y-4">
                {[
                  { skill: 'Kubernetes', level: 85 },
                  { skill: 'AWS/Cloud', level: 80 },
                  { skill: 'CI/CD', level: 80 },
                  { skill: 'Docker', level: 87 },
                  { skill: 'Jenkins', level: 82 },
                  { skill: 'Monitoring', level: 75 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.skill}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </ScrollAnimatedSection>
        </div>
      </div>

      {/* Certificate Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 dark:bg-white rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-white dark:text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedCertificate?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedCertificate?.issuer} • {selectedCertificate?.year}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Certificate Image */}
              <div className="relative group">
                <img
                  src={selectedCertificate?.certificateUrl}
                  alt={selectedCertificate?.name}
                  className="w-full h-auto rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>

              {/* Certificate Details */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {selectedCertificate?.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Skills Covered</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate?.skills?.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Middle Column */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements</h4>
                    <ul className="space-y-2">
                      {selectedCertificate?.achievements?.map((achievement: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Learning Outcomes</h4>
                    <ul className="space-y-2">
                      {selectedCertificate?.learningOutcomes?.map((outcome: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Certificate Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Credential ID:</span>
                        <span className="text-gray-900 dark:text-white font-mono text-xs">
                          {selectedCertificate?.credentialId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Grade:</span>
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          {selectedCertificate?.grade}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total Hours:</span>
                        <span className="text-gray-900 dark:text-white">
                          {selectedCertificate?.totalHours}h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Projects:</span>
                        <span className="text-gray-900 dark:text-white">
                          {selectedCertificate?.projectsCompleted}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Valid Until:</span>
                        <span className="text-gray-900 dark:text-white">
                          {selectedCertificate?.validUntil}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Issued:</span>
                        <span className="text-gray-900 dark:text-white">
                          {selectedCertificate?.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Verification Link */}
                  {selectedCertificate?.verificationUrl && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Verification</h4>
                      <a
                        href={selectedCertificate.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Verify Certificate
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={downloadCertificate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Certificate
                </button>
                <button
                  onClick={() => window.open(selectedCertificate?.certificateUrl, '_blank')}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View Full Size
                </button>
                {selectedCertificate?.verificationUrl && (
                  <button
                    onClick={() => window.open(selectedCertificate.verificationUrl, '_blank')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Verify Online
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;