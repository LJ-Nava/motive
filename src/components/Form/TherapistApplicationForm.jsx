import React, { useState, useEffect } from 'react';
import '../styles/form/TherapistApplicationForm.scss';

const TherapistApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    discipline: '',
    yearsExperience: '',
    coverageAreas: [],
    otherArea: '',
    smsConsent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countyFilter, setCountyFilter] = useState('');
  const [experienceDropdownOpen, setExperienceDropdownOpen] = useState(false);

  // Animated stats values
  const [animatedPlacements, setAnimatedPlacements] = useState(0);
  const [animatedSatisfaction, setAnimatedSatisfaction] = useState(0);
  const [animatedResponse, setAnimatedResponse] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close experience dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (experienceDropdownOpen && !event.target.closest('.custom-experience-select')) {
        setExperienceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [experienceDropdownOpen]);

  // Counting animation for stats
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    // Target values
    const targetPlacements = 8000;
    const targetSatisfaction = 98.5;
    const targetResponse = 24;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedPlacements(Math.round(targetPlacements * easeOut));
      setAnimatedSatisfaction(Math.round(targetSatisfaction * easeOut * 10) / 10);
      setAnimatedResponse(Math.round(targetResponse * easeOut));

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedPlacements(targetPlacements);
        setAnimatedSatisfaction(targetSatisfaction);
        setAnimatedResponse(targetResponse);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const disciplines = [
    { value: 'physical-therapy', label: 'Physical Therapy (PT)', tooltip: 'Licensed Physical Therapist providing rehabilitation services' },
    { value: 'occupational-therapy', label: 'Occupational Therapy (OT)', tooltip: 'Licensed Occupational Therapist helping patients with daily activities' },
    { value: 'speech-therapy', label: 'Speech Therapy (ST)', tooltip: 'Licensed Speech Therapist treating communication and swallowing disorders' },
    { value: 'pta', label: 'Physical Therapist Assistant (PTA)', tooltip: 'Assists Physical Therapists in providing treatment' },
    { value: 'cota', label: 'Occupational Therapy Assistant (COTA)', tooltip: 'Certified assistant working under OT supervision' },
    { value: 'sta', label: 'Speech Therapy Assistant (STA)', tooltip: 'Assists Speech Therapists in therapy sessions' }
  ];

  // Southern California Counties
  const coverageAreas = [
    'Los Angeles County',
    'Orange County',
    'Riverside County',
    'San Bernardino County',
    'Ventura County',
    'San Diego County',
    'Imperial County',
    'Kern County',
    'Santa Barbara County',
    'San Luis Obispo County'
  ];

  const experienceOptions = [
    {
      value: '0-1',
      label: '0–1 year',
      description: 'New graduate or recent entry',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 18v4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/></svg>,
      color: '#10b981'
    },
    {
      value: '2-4',
      label: '2–4 years',
      description: 'Growing professional',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
      color: '#3b82f6'
    },
    {
      value: '5+',
      label: '5+ years',
      description: 'Experienced professional',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
      color: '#f59e0b'
    }
  ];

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Apply (---) ---_--- format
    if (digits.length <= 3) {
      return `(${digits}`;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      // Format phone number as user types
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [field]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAreaChange = (area) => {
    setFormData(prev => ({
      ...prev,
      coverageAreas: prev.coverageAreas.includes(area)
        ? prev.coverageAreas.filter(item => item !== area)
        : [...prev.coverageAreas, area]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().split(' ').length < 2) {
      newErrors.fullName = 'Please include both first and last name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email (e.g., name@example.com)';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.discipline) {
      newErrors.discipline = 'Please select your discipline';
    }
    
    if (!formData.yearsExperience) {
      newErrors.yearsExperience = 'Please select your experience level';
    }
    
    if (formData.coverageAreas.length === 0) {
      newErrors.coverageAreas = 'Please select at least one coverage area';
    }

    if (formData.coverageAreas.includes('Other') && !formData.otherArea.trim()) {
      newErrors.otherArea = 'Please specify your coverage area';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('Full_Name', formData.fullName);
      formDataToSend.append('Email_Address', formData.email);
      formDataToSend.append('Phone_Number', formData.phone);
      formDataToSend.append('Primary_Discipline', formData.discipline);
      formDataToSend.append('Years_of_Experience', formData.yearsExperience);
      // Construir lista de áreas incluyendo "Other" con su especificación
      const areasToSend = formData.coverageAreas.map(area =>
        area === 'Other' && formData.otherArea.trim()
          ? `Other: ${formData.otherArea.trim()}`
          : area
      );
      formDataToSend.append('Coverage_Areas', areasToSend.join(', '));
      
      const disciplineLabel = disciplines.find(d => d.value === formData.discipline)?.label || formData.discipline;
      
      const structuredMessage = `
👩‍⚕️ NEW THERAPIST APPLICATION - ${formData.fullName}

═══════════════════════════════════════

📋 PERSONAL INFORMATION:
• Full Name: ${formData.fullName}
• Email: ${formData.email}
• Phone: ${formData.phone}

💼 PROFESSIONAL DETAILS:
• Primary Discipline: ${disciplineLabel}
• Years of Experience: ${formData.yearsExperience}
• Coverage Areas: ${areasToSend.join(', ')}

📱 SMS CONSENT: ${formData.smsConsent ? 'YES - Agreed to receive SMS messages' : 'NO'}

📅 APPLICATION DATE: ${new Date().toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

🌐 SOURCE: Website Therapist Application Form
      `;
      
      formDataToSend.append('message', structuredMessage);
      
      formDataToSend.append('_subject', 'We have a new referral by the page - Therapist Application');
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_template', 'table');
      formDataToSend.append('_autoresponse', 
        `Thank you for your interest in joining our therapy network, ${formData.fullName}! We have received your application and will review it within 24 hours. Our team will contact you soon to discuss opportunities that match your expertise in ${disciplineLabel}.`
      );
      
      formDataToSend.append('_form_source', 'Therapist Application');
      formDataToSend.append('_discipline_type', disciplineLabel);
      formDataToSend.append('_timestamp', new Date().toISOString());
      
      console.log('Enviando formulario de terapeuta a FormSubmit...');
      
      const response = await fetch('https://formsubmit.co/hr@motivehomecare.com', {
        method: 'POST',
        body: formDataToSend
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok || response.status === 200) {
        console.log('✅ Formulario de terapeuta enviado exitosamente');
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'therapist_application_submit', {
            discipline: formData.discipline,
            experience: formData.yearsExperience,
            coverage_areas: formData.coverageAreas.length
          });
        }
        
        setIsSubmitted(true);
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
    } catch (error) {
      console.error('❌ Error sending therapist form:', error);
      alert('There was an error submitting your application. Please try again or contact us directly at (213) 495-0092.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="motive-simplified-therapist-form-container">
        <div className="motive-form-success-wrapper">
          <div className="motive-success-content">
            <div className="motive-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <h2>🎉 Application Submitted Successfully!</h2>
            <p>Thank you for your interest in joining our therapy network. Our team will review your application and contact you within 24 hours.</p>
            <div className="motive-next-steps">
              <div className="motive-step-item">
                <span className eenmaal="motive-step-number">1</span>
                <span>Application Review (24hrs)</span>
              </div>
              <div className="motive-step-item">
                <span className="motive-step-number">2</span>
                <span>Initial Contact & Discussion</span>
              </div>
              <div className="motive-step-item">
                <span className="motive-step-number">3</span>
                <span>Placement Matching</span>
              </div>
            </div>
            <button 
              className="motive-return-home-btn"
              onClick={() => window.location.href = '/motive'}
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="motive-simplified-therapist-form-container">
      <div className="motive-form-hero-section">
        <div className="motive-hero-content">
          <h1>Connect with <span className="highlight-orange">Premium</span> Home Health Therapy Opportunities</h1>
          <p>Join Southern California's leading therapy professionals. Quick application, fast placement, competitive opportunities.</p>
          <div className="motive-hero-stats">
            <div className="motive-stat-item">
              <span className="motive-stat-number">{animatedPlacements.toLocaleString()}+</span>
              <span className="motive-stat-label">Successful Placements</span>
            </div>
            <div className="motive-stat-item">
              <span className="motive-stat-number">{animatedSatisfaction}%</span>
              <span className="motive-stat-label">Satisfaction Rate</span>
            </div>
            <div className="motive-stat-item">
              <span className="motive-stat-number">{animatedResponse}hrs</span>
              <span className="motive-stat-label">Response Time</span>
            </div>
          </div>
        </div>
      </div>

      <div className="motive-form-main-container">
        <div className="motive-form-card">
          <div className="motive-form-header">
            <span className="motive-form-step-indicator">Step 1 of 1 • Takes about 2 minutes</span>
            <h2>Therapist Application</h2>
            <p>Simple, quick and secure — start now in under 2 minutes.</p>
            <div className="motive-security-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Your information is secure and confidential</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="motive-application-form">
            
            {/* Personal Information */}
            <div className="motive-form-section">
              <h3>Personal Information</h3>
              <div className="motive-form-grid">
                <div className="motive-form-group fullname-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <div className="motive-input-wrapper">
                    <span className="motive-input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={errors.fullName ? 'motive-input-error' : ''}
                      placeholder="First and last name"
                    />
                  </div>
                  <span className="motive-helper-text">As it appears on your professional license</span>
                  {errors.fullName && <span className="motive-error-message">{errors.fullName}</span>}
                </div>

                <div className="motive-form-group email-group">
                  <label htmlFor="email">Email Address *</label>
                  <div className="motive-input-wrapper">
                    <span className="motive-input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </span>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'motive-input-error' : ''}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <span className="motive-helper-text">Used to contact you about placements</span>
                  {errors.email && <span className="motive-error-message">{errors.email}</span>}
                </div>

                <div className="motive-form-group phone-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <div className="motive-input-wrapper">
                    <span className="motive-input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'motive-input-error' : ''}
                      placeholder="Enter a 10-digit phone number"
                      maxLength={14}
                    />
                  </div>
                  <span className="motive-helper-text">For scheduling interviews and updates</span>
                  {errors.phone && <span className="motive-error-message">{errors.phone}</span>}
                </div>
              </div>
            </div>

      {/* Professional Information */}
      <div className="motive-form-section">
        <h3>Professional Information</h3>
        
        <div className="motive-form-group">
          <label>Primary Discipline *</label>
          <div className="motive-discipline-grid">
            {disciplines.map(disc => (
              <div
                key={disc.value}
                className={`motive-discipline-card ${formData.discipline === disc.value ? 'motive-discipline-selected' : ''}`}
                onClick={() => handleInputChange('discipline', disc.value)}
              >
                <span className="motive-discipline-label">{disc.label}</span>
                <span className="motive-discipline-tooltip">{disc.tooltip}</span>
              </div>
            ))}
          </div>
          {errors.discipline && <span className="motive-error-message">{errors.discipline}</span>}
        </div>

        <div className="motive-form-group experience-group">
          <label>Years of Experience *</label>
          <div className={`custom-experience-select ${experienceDropdownOpen ? 'open' : ''} ${errors.yearsExperience ? 'has-error' : ''}`}>
            <div
              className="custom-experience-select__trigger"
              onClick={() => setExperienceDropdownOpen(!experienceDropdownOpen)}
            >
              <span className="custom-experience-select__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8v4l3 3"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </span>
              {formData.yearsExperience ? (
                <span className="custom-experience-select__value">
                  <span className="custom-experience-select__value-icon" style={{ color: experienceOptions.find(o => o.value === formData.yearsExperience)?.color }}>
                    {experienceOptions.find(o => o.value === formData.yearsExperience)?.icon}
                  </span>
                  <span>{experienceOptions.find(o => o.value === formData.yearsExperience)?.label}</span>
                </span>
              ) : (
                <span className="custom-experience-select__placeholder">Select your experience level</span>
              )}
              <svg className="custom-experience-select__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            {experienceDropdownOpen && (
              <div className="custom-experience-select__dropdown">
                {experienceOptions.map(option => (
                  <div
                    key={option.value}
                    className={`custom-experience-select__option ${formData.yearsExperience === option.value ? 'selected' : ''}`}
                    onClick={() => {
                      handleInputChange('yearsExperience', option.value);
                      setExperienceDropdownOpen(false);
                    }}
                  >
                    <span className="custom-experience-select__option-icon" style={{ color: option.color }}>
                      {option.icon}
                    </span>
                    <div className="custom-experience-select__option-content">
                      <span className="custom-experience-select__option-label">{option.label}</span>
                      <span className="custom-experience-select__option-desc">{option.description}</span>
                    </div>
                    {formData.yearsExperience === option.value && (
                      <svg className="custom-experience-select__check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.yearsExperience && <span className="motive-error-message">{errors.yearsExperience}</span>}
        </div>
      </div>

      {/* Coverage Areas */}
      <div className="motive-form-section">
        <h3>Coverage Areas *</h3>
        <p className="motive-section-description">Select all counties where you can provide services</p>
        <div className="motive-county-filter">
          <span className="motive-search-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search counties..."
            value={countyFilter}
            onChange={(e) => setCountyFilter(e.target.value)}
          />
          {countyFilter && (
            <button
              type="button"
              className="motive-filter-clear"
              onClick={() => setCountyFilter('')}
            >
              ×
            </button>
          )}
        </div>
        <div className="motive-coverage-grid">
          {coverageAreas
            .filter(area => area.toLowerCase().includes(countyFilter.toLowerCase()))
            .map(area => (
              <label key={area} className="motive-checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.coverageAreas.includes(area)}
                  onChange={() => handleAreaChange(area)}
                />
                <span className="motive-checkmark"></span>
                <span className="motive-checkbox-label">{area}</span>
              </label>
            ))}
          {!countyFilter && (
            <label className="motive-checkbox-item">
              <input
                type="checkbox"
                checked={formData.coverageAreas.includes('Other')}
                onChange={() => handleAreaChange('Other')}
              />
              <span className="motive-checkmark"></span>
              <span className="motive-checkbox-label">Other (please specify)</span>
            </label>
          )}
        </div>
        {coverageAreas.filter(area => area.toLowerCase().includes(countyFilter.toLowerCase())).length === 0 && countyFilter && (
          <p className="motive-no-results">No counties match your search</p>
        )}
        {formData.coverageAreas.includes('Other') && (
          <div className="motive-other-area-input">
            <input
              type="text"
              placeholder="Please specify your coverage area"
              value={formData.otherArea}
              onChange={(e) => handleInputChange('otherArea', e.target.value)}
              className={errors.otherArea ? 'motive-input-error' : ''}
            />
            {errors.otherArea && <span className="motive-error-message">{errors.otherArea}</span>}
          </div>
        )}
        {errors.coverageAreas && <span className="motive-error-message">{errors.coverageAreas}</span>}
      </div>

      {/* SMS Consent */}
      <div className="motive-form-section">
        <div className="motive-sms-consent">
          <label className="motive-checkbox-item motive-sms-checkbox">
            <input
              type="checkbox"
              checked={formData.smsConsent}
              onChange={(e) => handleInputChange('smsConsent', e.target.checked)}
            />
            <span className="motive-checkmark"></span>
            <span className="motive-checkbox-label motive-sms-label">
              I consent to receive SMS updates about placement opportunities. Message & data rates may apply. Reply STOP to opt out at any time.
              View our <a href="/#/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
            </span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="motive-form-submit-section">
        <button
          type="submit"
          disabled={isSubmitting}
          className="motive-submit-button"
        >
          {isSubmitting ? (
            <>
              <div className="motive-spinner"></div>
              Submitting Application...
            </>
          ) : (
            <>
              Submit Application – Get Matched Today
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
        <p className="motive-response-time">Responses typically within 24 hours</p>
        <p className="motive-submit-note">
          By submitting this application, you agree to be contacted by our team regarding therapy opportunities.
        </p>
      </div>
    </form>
  </div>

  {/* Sidebar */}
  <div className="motive-form-sidebar">
    <div className="motive-benefits-card">
      <h4>Why Choose Motive?</h4>
      <ul className="motive-benefits-list">
        <li>
          <span className="motive-benefit-icon motive-benefit-icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </span>
          <div>
            <strong>Efficient Placement</strong>
            <p>Get matched within 48 hours</p>
          </div>
        </li>
        <li>
          <span className="motive-benefit-icon motive-benefit-icon--emerald">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18"/>
              <path d="M5 21V7l8-4v18"/>
              <path d="M19 21V11l-6-4"/>
              <path d="M9 9v.01"/>
              <path d="M9 12v.01"/>
              <path d="M9 15v.01"/>
            </svg>
          </span>
          <div>
            <strong>Accredited Providers</strong>
            <p>Verified and quality-assured partners</p>
          </div>
        </li>
        <li>
          <span className="motive-benefit-icon motive-benefit-icon--amber">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </span>
          <div>
            <strong>Competitive Compensation</strong>
            <p>Market-aligned packages for your expertise</p>
          </div>
        </li>
        <li>
          <span className="motive-benefit-icon motive-benefit-icon--sky">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </span>
          <div>
            <strong>Dedicated Coordinator</strong>
            <p>Personal support every step of the way</p>
          </div>
        </li>
      </ul>
      <div className="motive-social-proof">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span>Trusted by 8,000+ therapists across Southern California</span>
      </div>
    </div>

    <div className="motive-contact-card">
      <div className="motive-contact-header">
        <span className="motive-contact-icon-wrapper">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </span>
        <h4>Need Help?</h4>
        <p>Our partnership team is ready to assist you</p>
      </div>
      <a href="tel:+12134950092" className="motive-contact-button">
        <span className="motive-contact-button-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </span>
        <span className="motive-contact-button-text">
          <span className="motive-contact-button-label">Call Us Now</span>
          <span className="motive-contact-button-number">(213) 495-0092</span>
        </span>
      </a>
      <div className="motive-contact-divider">
        <span>or</span>
      </div>
      <a href="mailto:hr@motivehomecare.com" className="motive-email-button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        hr@motivehomecare.com
      </a>
      <div className="motive-contact-hours">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>Mon–Fri 9 AM–5:30 PM • Sat 9 AM–12 PM PT</span>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default TherapistApplicationForm;