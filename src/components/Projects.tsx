import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';

// Optimized project data structure - O(1) access time
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  workflow: string;
  details: Record<string, string>;
}

const Projects: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // Optimized projects data - reduced memory footprint
  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      title: 'Reactjs E-commerce Application',
      description: 'CI/CD pipeline with GitHub, Jenkins, SonarQube, Trivy, Docker and EC2-VM',
      image: '/screenshots/devops-pipeline.png',
      technologies: ['GitHub', 'Jenkins', 'SonarQube', 'Trivy', 'Docker', 'EC2'],
      github: 'https://github.com/Dilip-Devopos/Guvi-Project-1',
      demo: 'http://18.60.226.5/',
      workflow: 'Developer Push → GitHub → Jenkins → Build → Security Scan → Deploy → EC2',
      details: {
        architecture: 'Microservices with Docker containers',
        build: 'Jenkins CI/CD',
        containerization: 'Docker',
        monitoring: 'Prometheus + Grafana',
        security: 'SonarQube + Trivy scanning',
        infrastructure: 'AWS EC2 + CloudWatch'
      }
    },
    {
      id: 2,
      title: 'Reactjs MindTrack  Application',
      description: 'Aws Native service for automated CI/CD Cluster deployment',
      image: '/screenshots/iac-project.png',
      technologies: ['Guithub','aws-codepipeline', 'aws-codebuild', 'aws-codedeploy', 'aws-ecr ', 'aws-ec2', 'aws-eks'],
      github: 'https://github.com/Dilip-Devopos/guvi-mini-project-1',
      demo: '    http://abb59c4b452064c768a9c0975c9ced80-1446271263.us-east-1.elb.amazonaws.com',
      workflow: `
          Developer Push --> GitHub Repository
          --> codepipeline
          --> codebuild
          --> codedeploy
          --> aws-ecr
          --> aws-ec2
          --> aws-eks
          --> loadbalancer
          --> Access in Browser
      `,
      details: {
        architecture: 'Deployment Reactjs MindTrack Application',
        build: 'aws-codepipeline',
        Containerzation: 'aws-codebuild',
        monitoring: 'Fluentbit + Cloudwatch',
        security: 'OWASP scanning, container security with Trivy',
        infrastructure: 'aws-ec2, aws-codedeploy, aws-codepipeline, aws-codebuild, aws-ecr, aws-eks, aws-elb'
      }
    },
    {
      id: 3,
      title: 'Reactjs TrendStore Application',
      description: 'Terraform for automated cloud infrastructure (vpc,subnet,securtiy-group,ec2 with jenkins) and EKS cluster deployment',
      image: '/screenshots/k8s-monitoring.png',
      technologies: ['GitHub', 'Jenkins', 'Sonarqube', 'Dependency-check', 'Trivy', 'Docker', 'EC2-VM','Prometheus', 'Grafana','Aws-EKS','Aws-Cloudwatch'],
      github: 'https://github.com/Dilip-Devopos/Guvi-TrendStore',
      demo: 'http://a663570b339364482a86a9e6f3445b69-1151892002.us-west-2.elb.amazonaws.com/',
      workflow: `
          Developer Push --> GitHub Repository
          --> Jenkins Pipeline
          --> Build Docker Image
          --> Dependency-check
          --> Security Scanning
          --> Push to DockerHub
          --> Deploy to EC2-VM
          --> Health Check
          --> Access in Browser
      `,
      details: {
        architecture: 'Dploy Reactjs TrendStore Application on EKS',
        build: 'Jenkins',
        Containerzation: 'Docker',
        monitoring: 'Prometheus + Grafana + Cloudwatch',
        security: 'OWASP scanning, container security with Trivy',
        infrastructure: 'Terraform, Prometheus, Grafana, Aws-EKS, Aws-Cloudwatch'
      }
    }
  ], []);

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto responsive-container">
        <ScrollAnimatedSection animation="fadeInUp" delay={100}>
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="responsive-text-3xl md:responsive-text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Featured Projects
            </h2>
            <p className="responsive-text-lg md:responsive-text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real-world DevOps projects showcasing modern practices and technologies
            </p>
          </div>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection animation="fadeInUp" delay={200}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                 onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}>
              {/* Project Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Click to expand indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-lg transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="flex items-center text-blue-600 dark:text-white text-sm font-medium">
                    View Details
                    {expandedProject === project.id ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </ScrollAnimatedSection>

        {/* Expanded Project Details Modal/Overlay */}
        {expandedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
               onClick={() => setExpandedProject(null)}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              {(() => {
                const project = projects.find(p => p.id === expandedProject);
                if (!project) return null;

                return (
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          {project.description}
                        </p>
                      </div>
                      <button
                        onClick={() => setExpandedProject(null)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <ChevronUp className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Project Image */}
                    <div className="mb-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-xl"
                      />
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Project Details
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Architecture</h4>
                          <p className="text-gray-600 dark:text-gray-300">{project.details.architecture}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">build</h4>
                          <p className="text-gray-600 dark:text-gray-300">{project.details.build}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Containerzation</h4>
                          <p className="text-gray-600 dark:text-gray-300">{project.details.Containerzation}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Monitoring</h4>
                          <p className="text-gray-600 dark:text-gray-300">{project.details.monitoring}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Security</h4>
                          <p className="text-gray-600 dark:text-gray-300">{project.details.security}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Infrastructure</h4>
                          <p className="text-gray-600 dark:text-gray-300">{project.details.infrastructure}</p>
                        </div>
                      </div>
                    </div>

                    {/* Pipeline Workflow */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        CI/CD Pipeline Workflow
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                        <div id={`mermaid-${project.id}`} className="mermaid-diagram">
                          {project.workflow}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gray-900 dark:bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors"
                      >
                        <Github className="h-5 w-5" />
                        View Code
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;