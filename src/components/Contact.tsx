import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, CheckCircle, AlertCircle, Calendar, Clock, Building, Video, MapPin as LocationIcon, X } from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';
import { sendContactEmail, sendInterviewRequest } from '../services/emailService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [interviewData, setInterviewData] = useState({
    name: '',
    email: '',
    company: '',
    date: '',
    time: '',
    type: 'virtual' as 'virtual' | 'offline',
    location: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [isSubmittingInterview, setIsSubmittingInterview] = useState(false);
  const [interviewSubmitStatus, setInterviewSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [interviewStatusMessage, setInterviewStatusMessage] = useState('');

  // Listen for interview modal open event
  React.useEffect(() => {
    const handleOpenInterviewModal = () => {
      setShowInterviewModal(true);
    };

    window.addEventListener('openInterviewModal', handleOpenInterviewModal);

    // Cleanup event listener
    return () => {
      window.removeEventListener('openInterviewModal', handleOpenInterviewModal);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Store the message locally for backup
      const submission = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      };

      // Store in localStorage as backup
      const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      existingSubmissions.push(submission);
      localStorage.setItem('contactSubmissions', JSON.stringify(existingSubmissions));

      // Log the submission for the developer
      console.log('📧 New Contact Form Submission:', submission);

      // Send email using FormSubmit.co
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage(result.message);

        // Reset form on success
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Log success for developer
        console.log('✅ Email sent successfully to dilipbca99@gmail.com via FormSubmit.co');
      } else {
        throw new Error(result.message);
      }

    } catch (error) {
      console.error('❌ Error sending email:', error);
      setSubmitStatus('error');

      // Provide fallback option
      const errorMsg = error instanceof Error ? error.message : 'Failed to send message.';
      setStatusMessage(`${errorMsg} You can also contact me directly at dilipbca99@gmail.com`);

    } finally {
      setIsSubmitting(false);

      // Clear status message after 8 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 8000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInterviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setInterviewData({
      ...interviewData,
      [e.target.name]: e.target.value
    });
  };

  const handleInterviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingInterview(true);
    setInterviewSubmitStatus('idle');

    try {
      // Send interview request email
      const result = await sendInterviewRequest(interviewData);

      if (result.success) {
        setInterviewSubmitStatus('success');
        setInterviewStatusMessage(result.message);

        // Reset form and close modal on success
        setInterviewData({
          name: '',
          email: '',
          company: '',
          date: '',
          time: '',
          type: 'virtual',
          location: '',
          message: ''
        });

        // Close modal after 2 seconds
        setTimeout(() => {
          setShowInterviewModal(false);
          setInterviewSubmitStatus('idle');
          setInterviewStatusMessage('');
        }, 2000);

        console.log('✅ Interview request sent successfully to dilipbca99@gmail.com');
      } else {
        throw new Error(result.message);
      }

    } catch (error) {
      console.error('❌ Error sending interview request:', error);
      setInterviewSubmitStatus('error');

      const errorMsg = error instanceof Error ? error.message : 'Failed to send interview request.';
      setInterviewStatusMessage(`${errorMsg} You can also contact me directly at dilipbca99@gmail.com`);

    } finally {
      setIsSubmittingInterview(false);

      // Clear status message after 5 seconds
      setTimeout(() => {
        setInterviewSubmitStatus('idle');
        setInterviewStatusMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto responsive-container">
        <ScrollAnimatedSection animation="fadeInUp" delay={100}>
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="responsive-text-3xl md:responsive-text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Get In Touch
              {/* Animated Communication Icons */}
              <div className="absolute -top-6 -right-12 hidden lg:block">
                <div className="flex space-x-1">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
                    <span className="text-white text-xs">📧</span>
                  </div>
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
                    <span className="text-white text-xs">💬</span>
                  </div>
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }}>
                    <span className="text-white text-xs">🤝</span>
                  </div>
                </div>
              </div>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to discuss your next DevOps project? Let's connect and explore how we can work together.
            </p>
          </div>
        </ScrollAnimatedSection>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Form */}
          <ScrollAnimatedSection animation="fadeInLeft" delay={200}>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 sm:p-6 md:p-8">
              <h3 className="responsive-text-xl md:responsive-text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                      placeholder="Dilip"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                      placeholder="dilipbca99@gmail.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                    placeholder="Project Discussion"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors resize-none"
                    placeholder="Tell me about your project requirements..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 border ${
                    isSubmitting
                      ? 'bg-gray-400 dark:bg-gray-500 cursor-not-allowed border-gray-400 dark:border-gray-500'
                      : submitStatus === 'success'
                        ? 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white border-green-600 dark:border-green-500'
                        : submitStatus === 'error'
                          ? 'bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white border-red-600 dark:border-red-500'
                          : 'bg-gray-800 dark:bg-gray-600 hover:bg-gray-900 dark:hover:bg-gray-500 text-white border-gray-700 dark:border-gray-500 hover:border-gray-600 dark:hover:border-gray-400'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <AlertCircle className="h-5 w-5" />
                      <span>Try Again</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                      <span className="transition-all duration-300 group-hover:tracking-wide">Send Message</span>
                    </>
                  )}
                </button>

                {/* Status Message */}
                {statusMessage && (
                  <div className={`mt-4 p-4 rounded-lg text-center ${
                    submitStatus === 'success'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700'
                  }`}>
                    <p className="text-sm font-medium">{statusMessage}</p>
                  </div>
                )}
              </form>
            </div>
          </ScrollAnimatedSection>

          {/* Contact Info */}
          <ScrollAnimatedSection animation="fadeInRight" delay={300}>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">dilipbca99@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-300">+91 6369257304</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">Bangalore, IND</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Follow Me
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center transition-colors hover:scale-110"
                >
                  <Linkedin className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
                </a>
                <a
                  href="https://github.com/Dilip-Devopos?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center transition-colors hover:scale-110"
                >
                  <Github className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center transition-colors hover:scale-110"
                >
                  <Twitter className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="group bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Open to New Opportunities
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                DevOps Engineer seeking challenging roles with innovative companies.
                Ready to discuss how I can contribute to your team's success.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">Ready for Interviews</span>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </div>

      {/* Interview Scheduling Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700 animate-slideUp">
            <div className="p-8">
              {/* Modal Header */}
              <div className="relative mb-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Schedule Interview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Let's discuss how I can contribute to your team's success
                  </p>
                </div>
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Interview Form */}
              <form onSubmit={handleInterviewSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="interview-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="interview-name"
                        name="name"
                        value={interviewData.name}
                        onChange={handleInterviewChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="interview-email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="interview-email"
                        name="email"
                        value={interviewData.email}
                        onChange={handleInterviewChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Section */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Company Details
                  </h4>
                  <div>
                    <label htmlFor="interview-company" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Building className="h-4 w-4 text-green-600" />
                      Company/Organization *
                    </label>
                    <input
                      type="text"
                      id="interview-company"
                      name="company"
                      value={interviewData.company}
                      onChange={handleInterviewChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                {/* Date and Time Section */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Schedule Preferences
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="interview-date" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        id="interview-date"
                        name="date"
                        value={interviewData.date}
                        onChange={handleInterviewChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="interview-time" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-600" />
                        Preferred Time *
                      </label>
                      <input
                        type="time"
                        id="interview-time"
                        name="time"
                        value={interviewData.time}
                        onChange={handleInterviewChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Interview Type Section */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Interview Format
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`relative flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      interviewData.type === 'virtual'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                    }`}>
                      <input
                        type="radio"
                        name="type"
                        value="virtual"
                        checked={interviewData.type === 'virtual'}
                        onChange={handleInterviewChange}
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                          interviewData.type === 'virtual'
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                        }`}>
                          <Video className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">Virtual Interview</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Online meeting via video call</div>
                        </div>
                      </div>
                      {interviewData.type === 'virtual' && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </label>

                    <label className={`relative flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      interviewData.type === 'offline'
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md'
                        : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/10'
                    }`}>
                      <input
                        type="radio"
                        name="type"
                        value="offline"
                        checked={interviewData.type === 'offline'}
                        onChange={handleInterviewChange}
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                          interviewData.type === 'offline'
                            ? 'bg-green-500 text-white'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-600'
                        }`}>
                          <LocationIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">In-Person Interview</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Face-to-face meeting at office</div>
                        </div>
                      </div>
                      {interviewData.type === 'offline' && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Location (conditional) */}
                {interviewData.type === 'offline' && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700 animate-slideDown">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Meeting Location
                    </h4>
                    <div>
                      <label htmlFor="interview-location" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <LocationIcon className="h-4 w-4 text-green-600" />
                        Office Address *
                      </label>
                      <input
                        type="text"
                        id="interview-location"
                        name="location"
                        value={interviewData.location}
                        onChange={handleInterviewChange}
                        required={interviewData.type === 'offline'}
                        className="w-full px-4 py-4 border-2 border-green-200 dark:border-green-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                        placeholder="Office address or meeting location"
                      />
                    </div>
                  </div>
                )}

                {/* Additional Message Section */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Additional Information
                  </h4>
                  <div>
                    <label htmlFor="interview-message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Special Requirements or Notes
                    </label>
                    <textarea
                      id="interview-message"
                      name="message"
                      value={interviewData.message}
                      onChange={handleInterviewChange}
                      rows={4}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition-all duration-200 shadow-sm hover:shadow-md"
                      placeholder="Any specific requirements, topics to discuss, or additional notes..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmittingInterview}
                    className={`w-full px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ${
                      isSubmittingInterview
                        ? 'bg-gray-400 dark:bg-gray-500 cursor-not-allowed'
                        : interviewSubmitStatus === 'success'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                          : interviewSubmitStatus === 'error'
                            ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }`}
                  >
                    {isSubmittingInterview ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Scheduling Interview...</span>
                      </>
                    ) : interviewSubmitStatus === 'success' ? (
                      <>
                        <CheckCircle className="h-6 w-6" />
                        <span>Interview Scheduled Successfully!</span>
                      </>
                    ) : interviewSubmitStatus === 'error' ? (
                      <>
                        <AlertCircle className="h-6 w-6" />
                        <span>Try Again</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="h-6 w-6" />
                        <span>Schedule Interview</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Status Message */}
                {interviewStatusMessage && (
                  <div className={`p-6 rounded-2xl text-center border-2 animate-slideDown ${
                    interviewSubmitStatus === 'success'
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700 shadow-lg'
                      : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700 shadow-lg'
                  }`}>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      {interviewSubmitStatus === 'success' ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      )}
                      <p className="text-lg font-semibold">{interviewStatusMessage}</p>
                    </div>
                    {interviewSubmitStatus === 'success' && (
                      <p className="text-sm opacity-80">I'll get back to you soon to confirm the interview details.</p>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
