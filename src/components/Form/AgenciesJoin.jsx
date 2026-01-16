import React, { useState, useEffect } from 'react';
import '../styles/form/AgenciesJoin.scss';

const AgenciesJoin = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    agencyName: '',
    agencyType: '',
    contactEmail: '',
    phone: '',

    // Step 2: Details - simplified
    additionalInfo: '',
    smsConsent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [animationStep, setAnimationStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    setIsVisible(true);
    const timer = setTimeout(() => setAnimationStep(1), 500);
    return () => clearTimeout(timer);
  }, []);

  const agencyTypes = [
    { value: 'Home Health Agency', icon: '🏠', description: 'In-home patient care' },
    { value: 'Skilled Nursing Facility', icon: '🏥', description: '24/7 skilled care' },
    { value: 'Hospital/Health System', icon: '🏨', description: 'Acute care facilities' },
    { value: 'Outpatient Clinic', icon: '🩺', description: 'Ambulatory care' },
    { value: 'Rehabilitation Center', icon: '💪', description: 'Recovery & therapy' },
    { value: 'Hospice Care', icon: '🤲', description: 'Compassionate end-of-life care' },
    { value: 'Assisted Living', icon: '🏘️', description: 'Independent living support' },
    { value: 'Memory Care Facility', icon: '🧠', description: 'Specialized dementia care' },
    { value: 'Long Term Care', icon: '⏳', description: 'Extended care services' },
    { value: 'Other Homehealth Facility', icon: '🔧', description: 'Tell us about your specialty' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      if (formattedPhone.replace(/[^\d]/g, '').length <= 10) {
        setFormData(prev => ({ ...prev, [field]: formattedPhone }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.agencyName.trim()) {
      newErrors.agencyName = 'Please share your agency name with us';
    }
    
    if (!formData.agencyType) {
      newErrors.agencyType = 'Please help us understand your care facility';
    }
    
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'An email address helps us connect with you';
    } else if (!validateEmail(formData.contactEmail)) {
      newErrors.contactEmail = 'Please provide a valid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'A contact number helps us reach you efficiently';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please use format: (213) 555-0123';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      setAnimationStep(0);
      setTimeout(() => setAnimationStep(1), 100);
    }
  };

  // ✅ NUEVA FUNCIÓN CON FORMSUBMIT
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Crear FormData para FormSubmit
      const formDataToSend = new FormData();
      
      // Campos principales del formulario
      formDataToSend.append('Agency_Name', formData.agencyName);
      formDataToSend.append('Agency_Type', formData.agencyType);
      formDataToSend.append('Contact_Email', formData.contactEmail);
      formDataToSend.append('Phone', formData.phone);
      formDataToSend.append('Additional_Information', formData.additionalInfo || 'No additional information provided');
      
      // Mensaje estructurado y profesional
      const structuredMessage = `
🏥 NEW AGENCY APPLICATION - ${formData.agencyName}

═══════════════════════════════════════

📋 AGENCY INFORMATION:
• Agency Name: ${formData.agencyName}
• Facility Type: ${formData.agencyType}
• Contact Email: ${formData.contactEmail}
• Phone Number: ${formData.phone}

📱 SMS CONSENT: ${formData.smsConsent ? 'YES - Agreed to receive SMS messages' : 'NO'}

💬 ADDITIONAL DETAILS:
${formData.additionalInfo || 'No additional information provided'}

📅 APPLICATION DATE: ${new Date().toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

🌐 SOURCE: Website Application Form
      `;
      
      formDataToSend.append('message', structuredMessage);
      
      // Configuraciones de FormSubmit
      formDataToSend.append('_subject', 'We have a new referral by the page - Agency Application');
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_template', 'table'); // Formato tabla más profesional
      formDataToSend.append('_autoresponse', 
        `Thank you for your interest in partnering with Motive Home Care, ${formData.agencyName}! We have received your application and will contact you within 2 hours to discuss how we can work together to serve your community.`
      );
      
      // Metadatos adicionales
      formDataToSend.append('_form_source', 'Agency Partnership Application');
      formDataToSend.append('_timestamp', new Date().toISOString());
      
      console.log('Enviando formulario a FormSubmit...');
      
      // Enviar a FormSubmit
      const response = await fetch('https://formsubmit.co/info@motivehomecare.com', {
        method: 'POST',
        body: formDataToSend
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok || response.status === 200) {
        console.log('✅ Formulario enviado exitosamente');
        
        // Analytics tracking (opcional)
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'agency_application_submit', {
            agency_type: formData.agencyType,
            agency_name: formData.agencyName
          });
        }
        
        setSubmitted(true);
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
    } catch (error) {
      console.error('❌ Error sending form:', error);
      alert('There was an error submitting your application. Please try again or contact us directly at (213) 495-0092.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="agencies-join">
        <div className="container">
          <div className="success-screen">
            <div className="success-animation">
              <div className="success-circle">
                <div className="success-ripples">
                  <div className="ripple"></div>
                  <div className="ripple"></div>
                  <div className="ripple"></div>
                </div>
                <div className="checkmark">
                  <svg viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="25" fill="none"/>
                    <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="success-content">
              <div className="success-badge">
                <span className="badge-sparkle">✨</span>
                Application Received
              </div>
              <h1>Thank You, {formData.agencyName}</h1>
              <p className="success-subtitle">
                We appreciate your interest in partnering with us. Your application has been received, and we look forward to exploring how we can work together to serve your community with excellence.
              </p>
              
              <div className="success-metrics">
                <div className="metric-card">
                  <div className="metric-icon">⏱️</div>
                  <div className="metric-content">
                    <span className="metric-value">Within 2 Hours</span>
                    <span className="metric-label">We'll reach out to you</span>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-icon">☕</div>
                  <div className="metric-content">
                    <span className="metric-value">Professional Discussion</span>
                    <span className="metric-label">Focused on your needs</span>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-icon">🎯</div>
                  <div className="metric-content">
                    <span className="metric-value">Tailored Solutions</span>
                    <span className="metric-label">Designed for your agency</span>
                  </div>
                </div>
              </div>
              
              <div className="success-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.href = '/motive'}
                >
                  <span className="btn-icon">🏠</span>
                  Return to Homepage
                </button>
                <a href="tel:+12134950092" className="btn btn-secondary">
                  <span className="btn-icon">📞</span>
                  Call Us: (213) 495-0092
                </a>
              </div>

              <div className="success-note">
                <p>🤝 We are committed to supporting your agency's mission with the same dedication you show your patients every day.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agencies-join">
      {/* Hero Section */}
      <section className={`hero ${isVisible ? 'hero--visible' : ''}`}>
        <div className="hero-background">
          <div className="floating-elements">
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
          </div>
          <div className="gradient-overlay"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title hero-title--enhanced">
              Together, We Strengthen
              <span className="gradient-text"> Home health Communities</span>
            </h1>

            <p className="hero-subtitle">
              Same-day access to licensed PT, OT & ST professionals across Southern California.
            </p>

            <div className="hero-cta-container">
              <button
                onClick={() => {
                  const formSection = document.querySelector('.form-section');
                  formSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary btn-hero-cta"
              >
                Start Partnership Application
              </button>

              <a href="/#/therapists/apply" className="therapist-link">
                Are you a therapist? <span className="therapist-link-arrow">→</span> Join our team
              </a>
            </div>

            <div className="journey-steps">
              <div className={`step ${currentStep >= 1 ? 'step--active' : ''} ${currentStep > 1 ? 'step--completed' : ''}`}>
                <div className="step-indicator">
                  <div className="step-number">
                    {currentStep > 1 ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                      </svg>
                    ) : '1'}
                  </div>
                  <div className="step-pulse"></div>
                </div>
                <div className="step-content">
                  <span className="step-title">Share Your Information</span>
                  <span className="step-subtitle">Tell us about your agency</span>
                </div>
              </div>
              
              <div className="step-connector">
                <div className="connector-line"></div>
                <div className="connector-flow"></div>
              </div>
              
              <div className={`step ${currentStep >= 2 ? 'step--active' : ''} ${submitted ? 'step--completed' : ''}`}>
                <div className="step-indicator">
                  <div className="step-number">
                    {submitted ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                      </svg>
                    ) : '2'}
                  </div>
                  <div className="step-pulse"></div>
                </div>
                <div className="step-content">
                  <span className="step-title">Additional Details</span>
                  <span className="step-subtitle">Help us understand your needs</span>
                </div>
              </div>
              
              <div className="step-connector">
                <div className="connector-line"></div>
                <div className="connector-flow"></div>
              </div>
              
              <div className={`step ${submitted ? 'step--active step--completed' : ''}`}>
                <div className="step-indicator">
                  <div className="step-number">
                    {submitted ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                      </svg>
                    ) : '3'}
                  </div>
                  <div className="step-pulse"></div>
                </div>
                <div className="step-content">
                  <span className="step-title">Begin Partnership</span>
                  <span className="step-subtitle">Start working together</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="container">
          <div className="form-layout">
            
            <div className={`form-content ${animationStep ? 'form-content--visible' : ''}`}>
              {currentStep === 1 ? (
                <div className="form-card">
                  <div className="form-header">
                    <div className="step-microcopy">Step 1 to 3 • Takes about 2 minutes</div>
                    <h2>Let's Connect</h2>
                    <p>We'd like to learn more about your home health agency and how we might work together to better serve your community. Please share some basic information to get started.</p>
                  </div>

                  <div className="form-body">
                    <div className="form-row">
                      <div className="form-group agency-name-group">
                        <label htmlFor="agencyName">
                          <span className="label-icon">🏢</span>
                          Agency Name
                        </label>
                        <input
                          type="text"
                          id="agencyName"
                          value={formData.agencyName}
                          onChange={(e) => handleInputChange('agencyName', e.target.value)}
                          placeholder="Your home health agency name"
                          className={errors.agencyName ? 'input--error' : ''}
                        />
                        {errors.agencyName && <span className="error-message">{errors.agencyName}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="agencyType">
                          <span className="label-icon">🏥</span>
                          Select your facility type (Home Health, SNF, Outpatient, Other)
                        </label>
                        <select
                          id="agencyType"
                          value={formData.agencyType}
                          onChange={(e) => handleInputChange('agencyType', e.target.value)}
                          className={errors.agencyType ? 'input--error' : ''}
                        >
                          <option value="">Facility type</option>
                          {agencyTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.icon} {type.value} - {type.description}
                            </option>
                          ))}
                        </select>
                        {errors.agencyType && <span className="error-message">{errors.agencyType}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contactEmail">
                          <span className="label-icon">📧</span>
                          Contact Email
                        </label>
                        <input
                          type="email"
                          id="contactEmail"
                          value={formData.contactEmail}
                          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                          placeholder="your.email@agency.com"
                          className={errors.contactEmail ? 'input--error' : ''}
                        />
                        {errors.contactEmail && <span className="error-message">{errors.contactEmail}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="phone">
                          <span className="label-icon">📱</span>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(213) 555-0123"
                          className={errors.phone ? 'input--error' : ''}
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="form-footer">
                    <button 
                      onClick={handleStep1Submit}
                      className="btn btn-primary btn-large"
                    >
                      <span className="btn-icon">➡️</span>
                      Continue to Step 2
                      <div className="btn-shine"></div>
                    </button>
                    
                    <div className="security-note">
                      <span className="security-icon">🔒</span>
                      <span>Your information is secure and will be kept confidential.</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-card">
                  <div className="form-header">
                    <div className="header-icon">📝</div>
                    <h2>Additional Information</h2>
                    <p>Please share any additional details about your agency, specific needs, or questions you may have. This helps us prepare for our conversation and better understand how we can assist you.</p>
                  </div>

                  <div className="form-body">
                    <div className="form-group">
                      <label htmlFor="additionalInfo">
                        <span className="label-icon">💬</span>
                        Tell us more about your agency and needs (Optional)
                      </label>
                      <textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                        placeholder="Share any specific information about your agency, current challenges, or how you envision a partnership might benefit your patients and staff..."
                        rows="6"
                        style={{
                          resize: 'vertical',
                          minHeight: '120px'
                        }}
                      />
                    </div>

                    {/* SMS Consent Checkbox */}
                    <div className="form-group form-group--checkbox">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={formData.smsConsent}
                          onChange={(e) => handleInputChange('smsConsent', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        <span className="checkbox-text">
                          I agree to receive SMS messages from Motive Home Care. Message frequency varies.
                          Message & data rates may apply. Reply STOP to opt out at any time.
                          View our <a href="/#/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="form-footer">
                    <div className="form-actions">
                      <button 
                        onClick={() => setCurrentStep(1)}
                        className="btn btn-outline"
                      >
                        <span className="btn-icon">←</span>
                        Previous Step
                      </button>
                      
                      <button 
                        onClick={handleFinalSubmit}
                        className="btn btn-primary btn-large"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="spinner"></div>
                            Submitting Application...
                          </>
                        ) : (
                          <>
                            <span className="btn-icon">✉️</span>
                            Submit Application
                            <div className="btn-shine"></div>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className='ColorBack'>Your Community Deserves Excellence</h2>
            <p className='ColorBack'>Every home health agency plays a vital role in community well-being. Let's explore how we can work together to enhance the care you provide.</p>
            
            <div className="cta-actions">
              <button
                onClick={() => {
                  const formSection = document.querySelector('.form-section');
                  formSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary btn-hero"
              >
                <span className="btn-icon">📝</span>
                Start Partnership Application – Connect with Licensed Clinicians
                <div className="btn-shine"></div>
              </button>

              <a href="tel:+12134950092" className="btn btn-secondary">
                <span className="btn-icon">📞</span>
                Call Our Partnership Team
              </a>
            </div>

            <div className="cta-social-proof">
              Trusted by home health agencies across Southern California
            </div>

            <div className="cta-promise">
              <div className="promise-icon">🤝</div>
              <p className='ColorBack'>We are committed to supporting your agency's mission with the same professionalism and dedication you bring to patient care.</p>
            </div>

            <a href="/#/therapists/apply" className="therapist-redirect-link">
              Therapist looking for work? <span>→</span> Join our team
            </a>
          </div>
        </div>
      </section>

      {/* Pre-Footer Agency Banner */}
      <div className="agency-footer-banner">
        Proudly partnering with home health agencies throughout Southern California
      </div>
    </div>
  );
};

export default AgenciesJoin;