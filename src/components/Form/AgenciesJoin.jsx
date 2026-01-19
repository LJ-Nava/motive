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
  const [heroActiveStep, setHeroActiveStep] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    setIsVisible(true);
    const timer = setTimeout(() => setAnimationStep(1), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-animate hero steps every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroActiveStep(prev => prev >= 3 ? 1 : prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.custom-select')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const agencyTypes = [
    {
      value: 'Home Health Agency',
      description: 'In-home patient care',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
      color: '#1e3a8a'
    },
    {
      value: 'Skilled Nursing Facility',
      description: '24/7 skilled care',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/></svg>,
      color: '#7c3aed'
    },
    {
      value: 'Hospital/Health System',
      description: 'Acute care facilities',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/></svg>,
      color: '#dc2626'
    },
    {
      value: 'Outpatient Clinic',
      description: 'Ambulatory care',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>,
      color: '#0ea5e9'
    },
    {
      value: 'Rehabilitation Center',
      description: 'Recovery & therapy',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>,
      color: '#10b981'
    },
    {
      value: 'Hospice Care',
      description: 'Compassionate end-of-life care',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
      color: '#ec4899'
    },
    {
      value: 'Assisted Living',
      description: 'Independent living support',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      color: '#f59e0b'
    },
    {
      value: 'Memory Care Facility',
      description: 'Specialized dementia care',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M12 18v4"/></svg>,
      color: '#8b5cf6'
    },
    {
      value: 'Long Term Care',
      description: 'Extended care services',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      color: '#06b6d4'
    },
    {
      value: 'Other Homehealth Facility',
      description: 'Tell us about your specialty',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
      color: '#64748b'
    }
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
              Same-day access to licensed <span className="hero-abbrev">PT</span>, <span className="hero-abbrev">OT</span> & <span className="hero-abbrev">ST</span> professionals across Southern California.
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
                Are you a therapist? <span className="therapist-link-separator">—</span> <span className="therapist-link-cta">Join our team</span> <span className="therapist-link-arrow">→</span>
              </a>
            </div>

            <div className="journey-steps">
              <div className={`step ${heroActiveStep === 1 ? 'step--active' : ''}`}>
                <div className="step-indicator">
                  <div className="step-number">1</div>
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

              <div className={`step ${heroActiveStep === 2 ? 'step--active' : ''}`}>
                <div className="step-indicator">
                  <div className="step-number">2</div>
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

              <div className={`step ${heroActiveStep === 3 ? 'step--active' : ''}`}>
                <div className="step-indicator">
                  <div className="step-number">3</div>
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
                          <span className="label-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 21h18"/>
                              <path d="M5 21V7l8-4v18"/>
                              <path d="M19 21V11l-6-4"/>
                              <path d="M9 9v.01"/>
                              <path d="M9 12v.01"/>
                              <path d="M9 15v.01"/>
                              <path d="M9 18v.01"/>
                            </svg>
                          </span>
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
                      
                      <div className="form-group facility-type-group">
                        <label>
                          <span className="label-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 21h18"/>
                              <path d="M9 8h1"/>
                              <path d="M9 12h1"/>
                              <path d="M9 16h1"/>
                              <path d="M14 8h1"/>
                              <path d="M14 12h1"/>
                              <path d="M14 16h1"/>
                              <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
                            </svg>
                          </span>
                          Select your facility type
                        </label>
                        <div className={`custom-select ${dropdownOpen ? 'custom-select--open' : ''} ${errors.agencyType ? 'custom-select--error' : ''}`}>
                          <div
                            className="custom-select__trigger"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                          >
                            <span className={formData.agencyType ? 'custom-select__value' : 'custom-select__placeholder'}>
                              {formData.agencyType ? (
                                <>
                                  <span className="custom-select__selected-icon" style={{ color: agencyTypes.find(t => t.value === formData.agencyType)?.color }}>
                                    {agencyTypes.find(t => t.value === formData.agencyType)?.icon}
                                  </span>
                                  {formData.agencyType}
                                </>
                              ) : 'Select facility type'}
                            </span>
                            <svg className="custom-select__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m6 9 6 6 6-6"/>
                            </svg>
                          </div>
                          {dropdownOpen && (
                            <div className="custom-select__dropdown">
                              {agencyTypes.map(type => (
                                <div
                                  key={type.value}
                                  className={`custom-select__option ${formData.agencyType === type.value ? 'custom-select__option--selected' : ''}`}
                                  onClick={() => {
                                    handleInputChange('agencyType', type.value);
                                    setDropdownOpen(false);
                                  }}
                                >
                                  <span className="custom-select__option-icon" style={{ color: type.color }}>{type.icon}</span>
                                  <div className="custom-select__option-content">
                                    <span className="custom-select__option-title">{type.value}</span>
                                    <span className="custom-select__option-desc">{type.description}</span>
                                  </div>
                                  {formData.agencyType === type.value && (
                                    <svg className="custom-select__check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={type.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {errors.agencyType && <span className="error-message">{errors.agencyType}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group email-group">
                        <label htmlFor="contactEmail">
                          <span className="label-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="4" width="20" height="16" rx="2"/>
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                            </svg>
                          </span>
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
                      
                      <div className="form-group phone-group">
                        <label htmlFor="phone">
                          <span className="label-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                          </span>
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
                      <span className="btn-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"/>
                          <path d="m12 5 7 7-7 7"/>
                        </svg>
                      </span>
                      Continue to Step 2
                      <div className="btn-shine"></div>
                    </button>
                    
                    <div className="security-note">
                      <span className="security-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                      </span>
                      <span>Your information is secure and will be kept confidential.</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-card">
                  <div className="form-header">
                    <div className="header-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <line x1="10" y1="9" x2="8" y2="9"/>
                      </svg>
                    </div>
                    <h2>Additional Information</h2>
                    <p>Please share any additional details about your agency, specific needs, or questions you may have. This helps us prepare for our conversation and better understand how we can assist you.</p>
                  </div>

                  <div className="form-body">
                    <div className="form-group message-group">
                      <label htmlFor="additionalInfo">
                        <span className="label-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                          </svg>
                        </span>
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
            <div className="cta-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              Partner With Us
            </div>
            <h2>Your Community Deserves Excellence</h2>
            <p>Every home health agency plays a vital role in community well-being. Let's explore how we can work together to enhance the care you provide.</p>

            <div className="cta-actions">
              <button
                onClick={() => {
                  const formSection = document.querySelector('.form-section');
                  formSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="cta-btn cta-btn--primary"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Start Partnership Application
              </button>

              <a href="tel:+12134950092" className="cta-btn cta-btn--secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Our Team
              </a>
            </div>

            <div className="cta-trust">
              <div className="cta-trust__item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Trusted Partner
              </div>
              <div className="cta-trust__item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Same-Day Support
              </div>
              <div className="cta-trust__item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Licensed Clinicians
              </div>
            </div>

            <a href="/#/therapists/apply" className="cta-therapist-link">
              <span className="cta-therapist-link__text">Are you a therapist looking for opportunities?</span>
              <span className="cta-therapist-link__cta">Join our team <span className="cta-therapist-link__arrow">→</span></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgenciesJoin;