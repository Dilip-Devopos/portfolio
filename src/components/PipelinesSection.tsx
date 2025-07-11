import React, { useState } from 'react';
import { GitBranch, Play, CheckCircle, AlertCircle, Clock, Server, Database, Cloud, Shield, Code, Settings, ExternalLink, Github } from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';

const PipelinesSection: React.FC = () => {
  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const pipelines = {
    ecommerce: {
      title: 'Reactjs E-commerce Application',
      subtitle: 'Automated Deployment Pipeline',
      description: 'CI/CD pipeline with GitHub, Jenkins, SonarQube, Trivy, Docker and EC2-VM for automated application deployment',
      image: '/screenshots/DevOps Pipeline.png',
      demoLink: 'https://your-pipeline-demo.com',
      githubLink: 'https://github.com/Dilip-Devopos/Guvi-Project-1/blob/main/Jenkinsfile',
      technologies: ['Jenkins', 'Docker', 'SonarQube', 'Trivy', 'AWS EC2'],
      stages: [
        { name: 'Source', status: 'completed', time: '30s', icon: GitBranch },
        { name: 'Jenkins', status: 'completed', time: '1m 45s', icon: Code },
        { name: 'SonarQube', status: 'completed', time: '4m 30s', icon: Cloud },
        { name: 'Security Scan', status: 'completed', time: '2m 15s', icon: Server },
        { name: 'Trivy', status: 'completed', time: '1m 30s', icon: Shield },
        { name: 'Push to GitHub', status: 'completed', time: '3m 20s', icon: Cloud },
        { name: 'Deploy to EC2-VM', status: 'completed', time: '3m', icon: Database },
        { name: 'Verify', status: 'completed', time: '0s', icon: Clock },
      ],
      flow: [
        'GitHub Push',
        'Jenkins',
        'SonarQube',
        'Security Scan',
        'Trivy',
        'Push to GitHub',
        'Deploy to EC2-VM',
        'Verify'
      ],
      infrastructure: {
        aws: 'EC2, Security Groups',
        compute: 'EC2 instance with Docker',
        loadBalancer: 'Application Load Balancer with SSL termination',
        storage: 'EBS volumes for persistent data',
        networking: 'AWS ALB'
      }
    },
    infrastructure: {
      title: 'Reactjs MindTrack Application',
      subtitle: 'Aws Native Services',
      description: 'Automated CI/CD and EKS Cluster using Aws Native services for cloud deployments',
      image: '/screenshots/Infrastructure as Code.png',
      demoLink: 'https://your-iac-demo.com',
      githubLink: 'https://github.com/Dilip-Devopos/guvi-mini-project-1/blob/main/buildspec.yml',
      technologies: ['GitHub','AWS EC2', 'AWS EKS', 'AWS ALB', 'AWS codepipeline', 'AWS codebuild', 'AWS codedeploy', 'AWS ecr'],
      stages: [
        { name: 'GitHub Push', status: 'completed', time: '45s', icon: Code },
        { name: 'CodePipeline', status: 'completed', time: '1m 20s', icon: CheckCircle },
        { name: 'CodeBuild', status: 'completed', time: '2m 30s', icon: Cloud },
        { name: 'CodeDeploy', status: 'completed', time: '3m 45s', icon: Server },
        { name: 'ECR', status: 'completed', time: '1m 30s', icon: Shield },
        { name: 'EKS Cluster', status: 'completed', time: '2m 15s', icon: Database },
        { name: 'loadbalancer', status: 'completed', time: '1m 30s', icon: Settings },
        { name: 'Verify', status: 'completed', time: '0s', icon: Clock },
      ],
      flow: [
        'GitHub Push',
        'CodePipeline',
        'CodeBuild',
        'CodeDeploy',
        'ECR',
        'EC2 Instance',
        'EKS Cluster',
        'loadbalancer'
      ],
      infrastructure: {
        aws: 'Complete infrastructure provisioning with aws native services',
        compute: 'EC2 instance with Docker , EKS Cluster',
        loadBalancer: 'Network Load Balancer with target groups and health checks',
        storage: 'EBS volumes with encryption, EFS for shared storage, S3 buckets',
        networking: 'Loadbalancer ARN, CloudWatch logs ,Security Groups'
      }
    },
    monitoring: {
      title: 'Reactjs TrendStore Application',
      subtitle: 'Terraform + EKS + Prometheus + Grafana',
      description: 'Terraform for automated cloud infrastructure (vpc,subnet,securtiy-group,ec2 with jenkins) and EKS cluster deployment',
      image: '/screenshots/Kubernetes Monitoring.png',
      demoLink: 'https://your-monitoring-demo.com',
      githubLink: 'https://github.com/Dilip-Devopos/Guvi-TrendStore/blob/main/Jenkinsfile',
      technologies: ['GitHub','Jenkins','Sonarqube','Trivy','Terraform','Docker','Prometheus', 'Grafana', 'EKS'],
      stages: [
        { name: 'Terraform', status: 'completed', time: '1m 15s', icon: Code },
        { name: 'GitHub Push', status: 'completed', time: '4m 30s', icon: Cloud },
        { name: 'Jenkins', status: 'completed', time: '2m 15s', icon: Server },
        { name: 'SonarQube', status: 'completed', time: '3m 20s', icon: Database },
        { name: 'Trivy', status: 'completed', time: '2m 10s', icon: CheckCircle },
        { name: 'Dockerhub push', status: 'completed', time: '1m 45s', icon: Database },
        { name: 'EKS Cluster', status: 'completed', time: '1m 30s', icon: Shield },
        { name: 'ALB Controller', status: 'completed', time: '2m 10s', icon: Shield },

      ],
      flow: [
        'Terraform Init',
        'Terraform Apply',
        'GitHub Push',
        'Jenkins',
        'SonarQube',
        'Trivy',
        'Dockerhub push',
        'EKS Cluster',
        'ALB Controller'
      ],
      infrastructure: {
        terraform: 'EKS cluster, IAM roles, vpc, subnets, security groups, EC2 with jenkins',
        compute: 'EKS cluster with managed node groups , EC2 with jenkins',
        loadBalancer: 'Loadbalancer to access the application',
        storage: 'EBS Volumes, Docker volumes',
        networking: 'Network Load Balancer with target groups and health checks'
      },
      terraformResources: [
            'VPC',
            'Subnets',
            'Security Groups',
            'EC2 with Jenkins'
      ]
    }
  };

  const getStatusIcon = (status: string, IconComponent: any) => {
    const iconProps = "h-5 w-5";
    switch (status) {
      case 'completed':
        return <CheckCircle className={`${iconProps} text-green-500`} />;
      case 'running':
        return <Play className={`${iconProps} text-blue-500 animate-pulse`} />;
      case 'pending':
        return <Clock className={`${iconProps} text-gray-400`} />;
      default:
        return <IconComponent className={`${iconProps} text-gray-400`} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'running':
        return 'bg-blue-500 animate-pulse';
      case 'pending':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const handleCardClick = (pipelineKey: string) => {
    setSelectedPipeline(selectedPipeline === pipelineKey ? null : pipelineKey);
  };

  const handleLinkClick = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pipelines" className="py-20 bg-gray-50 dark:bg-gray-900">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedSection animation="fadeInUp" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Above Projects Pipelines
              {/* Animated Pipeline Icons */}
              <div className="absolute -top-6 -right-12 hidden lg:block">
                <div className="flex space-x-1">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div className="w-1 h-5 bg-gray-400 animate-pulse"></div>
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
                    <span className="text-white text-xs">⚡</span>
                  </div>
                  <div className="w-1 h-5 bg-gray-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }}>
                    <span className="text-white text-xs">🚀</span>
                  </div>
                </div>
              </div>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Different technologies are used to build different projects with automated CI/CD workflows.
            </p>
          </div>
        </ScrollAnimatedSection>

        {/* Project Cards Grid */}
        <ScrollAnimatedSection animation="fadeInUp" delay={200}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Object.entries(pipelines).map(([key, pipeline]) => (
            <div
              key={key}
              className={`group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                selectedPipeline === key ? 'ring-4 ring-blue-500 scale-105' : ''
              }`}
              onClick={() => handleCardClick(key)}
              onMouseEnter={() => setHoveredCard(key)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pipeline.image}
                  alt={pipeline.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === key ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Action Buttons */}
                <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${
                  hoveredCard === key ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}>
                  <button
                    onClick={(e) => handleLinkClick(pipeline.githubLink, e)}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors group"
                  >
                    <Github className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={(e) => handleLinkClick(pipeline.demoLink, e)}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors group"
                  >
                    <ExternalLink className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">Active</span>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {pipeline.title}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {pipeline.subtitle}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {pipeline.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {pipeline.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {pipeline.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                      +{pipeline.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Click to View Indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Click to view pipeline
                  </span>
                  <div className={`transform transition-transform duration-300 ${
                    selectedPipeline === key ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </ScrollAnimatedSection>

        {/* Selected Pipeline Details */}
        {selectedPipeline && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {pipelines[selectedPipeline as keyof typeof pipelines].title} Pipeline
                  </h3>
                  <p className="text-blue-100">
                    {pipelines[selectedPipeline as keyof typeof pipelines].description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPipeline(null)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* Pipeline Flow - Horizontal */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Terraform Infrastructure & Deployment Flow
                </h4>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg overflow-x-auto">
                  <div className="flex items-center gap-2 min-w-max">
                    {pipelines[selectedPipeline as keyof typeof pipelines].flow.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg transition-all duration-500 delay-${index * 100} ${
                            index < 3 ? 'bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-xs font-medium text-gray-900 dark:text-white mt-2 text-center max-w-20">
                            {step}
                          </span>
                        </div>
                        {index < pipelines[selectedPipeline as keyof typeof pipelines].flow.length - 1 && (
                          <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-2 rounded animate-pulse"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Pipeline Stages */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Pipeline Stages
                  </h4>
                  <div className="space-y-4">
                    {pipelines[selectedPipeline as keyof typeof pipelines].stages.map((stage, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-purple-500 transform transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(stage.status)}`}>
                              <span className="text-white text-sm font-semibold">{index + 1}</span>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {stage.name}
                            </span>
                          </div>
                          {getStatusIcon(stage.status, stage.icon)}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Duration: {stage.time}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            stage.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            stage.status === 'running' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                          }`}>
                            {stage.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AWS Infrastructure Details */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    AWS Infrastructure
                  </h4>
                  <div className="bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Code className="h-5 w-5 text-purple-500 mt-1" />
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">AWS Resources</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {(pipelines[selectedPipeline as keyof typeof pipelines].infrastructure as any).aws || (pipelines[selectedPipeline as keyof typeof pipelines].infrastructure as any).terraform}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Cloud className="h-5 w-5 text-orange-500 mt-1" />
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">Storage</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {pipelines[selectedPipeline as keyof typeof pipelines].infrastructure.storage}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Server className="h-5 w-5 text-blue-500 mt-1" />
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">Compute</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {pipelines[selectedPipeline as keyof typeof pipelines].infrastructure.compute}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Database className="h-5 w-5 text-green-500 mt-1" />
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">Load Balancer</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {pipelines[selectedPipeline as keyof typeof pipelines].infrastructure.loadBalancer}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-red-500 mt-1" />
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">Networking</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {pipelines[selectedPipeline as keyof typeof pipelines].infrastructure.networking}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terraform Resources - Only for Kubernetes Monitoring */}
                {selectedPipeline === 'monitoring' && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Terraform Resources
                    </h4>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
                      <div className="space-y-3">
                        {(pipelines[selectedPipeline as keyof typeof pipelines] as any).terraformResources?.map((resource: string, index: number) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse flex-shrink-0"></div>
                            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                              {resource}
                            </code>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <p className="text-sm text-purple-800 dark:text-purple-200">
                          <strong>Kubernetes Monitoring Stack:</strong> EKS cluster with Prometheus and Grafana deployed via Jenkins, including Network Load Balancer with target groups and health checks controller and external DNS for monitoring access.
                        </p>
                      </div>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        )}

        {/* Pipeline Metrics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-purple-500 transform transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Infrastructure as Code
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-green-500 transform transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
              1.5min
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Avg Terraform Apply
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-blue-500 transform transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              6+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              AWS Resources
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-orange-500 transform transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              2 AZs
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Multi-AZ Setup
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PipelinesSection;