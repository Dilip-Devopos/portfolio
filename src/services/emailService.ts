// Optimized email service for portfolio contact forms
// Time Complexity: O(1) for all operations
// Space Complexity: O(1) for configuration, O(n) for form data where n is message length

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface InterviewRequestData {
  name: string;
  email: string;
  company: string;
  date: string;
  time: string;
  type: 'virtual' | 'offline';
  location: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

// Configuration constants - O(1) space complexity
const CONFIG = {
  FORMSUBMIT_CODE: '2c2fbf23f8d790dc32674b62e3b5128c',
  TO_EMAIL: 'dilipbca99@gmail.com',
  THANK_YOU_URL: 'https://formsubmit.co/thankyou'
} as const;

// Optimized form submission - O(1) time complexity
const submitForm = async (formData: FormData): Promise<EmailResponse> => {
  try {
    const response = await fetch(`https://formsubmit.co/${CONFIG.FORMSUBMIT_CODE}`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      return { success: true, message: 'Email sent successfully!' };
    }
    throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
};

// Contact form email - O(1) time complexity
export const sendContactEmail = async (data: ContactFormData): Promise<EmailResponse> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('subject', `Portfolio Contact: ${data.subject}`);
  formData.append('message', data.message);
  formData.append('_next', CONFIG.THANK_YOU_URL);
  formData.append('_captcha', 'false');
  formData.append('_template', 'table');

  // Store locally for backup - O(1) amortized time complexity
  const submission = {
    ...data,
    timestamp: new Date().toISOString(),
    id: Date.now().toString()
  };
  
  try {
    const existing = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    existing.push(submission);
    localStorage.setItem('contactSubmissions', JSON.stringify(existing));
  } catch (e) {
    console.warn('Failed to store submission locally');
  }

  return submitForm(formData);
};

// Interview request email - O(1) time complexity
export const sendInterviewRequest = async (data: InterviewRequestData): Promise<EmailResponse> => {
  const interviewDetails = `
INTERVIEW REQUEST

Candidate: ${data.name}
Email: ${data.email}
Company: ${data.company}
Date: ${new Date(data.date).toLocaleDateString()}
Time: ${data.time}
Type: ${data.type === 'virtual' ? 'Virtual (Online)' : 'In-Person (Offline)'}
${data.type === 'offline' && data.location ? `Location: ${data.location}` : ''}
${data.message ? `Notes: ${data.message}` : ''}
  `.trim();

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('subject', `Interview Request - ${data.company}`);
  formData.append('message', interviewDetails);
  formData.append('_next', CONFIG.THANK_YOU_URL);
  formData.append('_captcha', 'false');
  formData.append('_template', 'table');

  // Store locally for backup - O(1) amortized time complexity
  const submission = {
    ...data,
    timestamp: new Date().toISOString(),
    id: Date.now().toString(),
    type: 'interview_request'
  };
  
  try {
    const existing = JSON.parse(localStorage.getItem('interviewRequests') || '[]');
    existing.push(submission);
    localStorage.setItem('interviewRequests', JSON.stringify(existing));
  } catch (e) {
    console.warn('Failed to store interview request locally');
  }

  return submitForm(formData);
};
