import React, { useState, useRef, useEffect } from 'react';
import '../styles/form/TherapistApplicationForm.scss';

const TherapistApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    discipline: '',
    yearsExperience: '',
    coverageAreas: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const disciplines = [
    { value: 'physical-therapy', label: 'Physical Therapy (PT)', icon: '🏃‍♂️' },
    { value: 'occupational-therapy', label: 'Occupational Therapy (OT)', icon: '🖐️' },
    { value: 'speech-therapy', label: 'Speech-Language Pathology (SLP)', icon: '💬' },
    { value: 'pta', label: 'Physical Therapist Assistant (PTA)', icon: '🤝' },
    { value: 'cota', label: ' Occupational Therapy Assistant (COTA)', icon: '✋' },
    { value: 'slpa', label: 'Speech-Language Pathology Assistant (SLPA)', icon: '🗣️' }
  ];

  const coverageAreas = [
    'Los Angeles County',
    'Orange County', 
    'Riverside County',
    'San Bernardino County',
    'Ventura County',
    'Imperial County',
    'Kern County',
    'Kings County',
    'Tulare County'
  ];

  const experienceOptions = [
    { value: '0-1', label: '0-1 years' },
    { value: '2-5', label: '2-5 years' },
    { value: '6-10', label: '6-10 years' },
    { value: '11-15', label: '11-15 years' },
    { value: '16+', label: '16+ years' }
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
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number in format (123) 456-7890';
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
      formDataToSend.append('Coverage_Areas', formData.coverageAreas.join(', '));
      
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
• Coverage Areas: ${formData.coverageAreas.join(', ')}

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
      
      const response = await fetch('https://formsubmit.co/info@motivehomecare.com', {
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
          <div className="motive-hero-badge">
            🌟 Join Our Network
          </div>
          <h1>Connect with Premium Healthcare Opportunities</h1>
          <p>Join California's leading therapy professionals. Quick application, fast placement, competitive opportunities.</p>
          <div className="motive-hero-stats">
            <div className="motive-stat-item">
              <span className="motive-stat-number">8,000+</span>
              <span className="motive-stat-label">Successful Placements</span>
            </div>
            <div className="motive-stat-item">
              <span className="motive-stat-number">98.5%</span>
              <span className="motive-stat-label">Satisfaction Rate</span>
            </div>
            <div className="motive-stat-item">
              <span className="motive-stat-number">24hrs</span>
              <span className="motive-stat-label">Response Time</span>
            </div>
          </div>
        </div>
      </div>

      <div className="motive-form-main-container">
        <div className="motive-form-card">
          <div className="motive-form-header">
            <h2>Therapist Application</h2>
            <p>Simple, quick, and secure. Get started in less than 2 minutes.</p>
          </div>

          <form onSubmit={handleSubmit} className="motive-application-form">
            
            {/* Personal Information */}
            <div className="motive-form-section">
              <h3>Personal Information</h3>
              <div className="motive-form-grid">
                <div className="motive-form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={errors.fullName ? 'motive-input-error' : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <span className="motive-error-message">{errors.fullName}</span>}
                </div>

                <div className="motive-form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'motive-input-error' : ''}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <span className="motive-error-message">{errors.email}</span>}
                </div>

          <div className="motive-form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={errors.phone ? 'motive-input-error' : ''}
              placeholder="(123) 456-7890"
              maxLength={14}
            />
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
                <span className="motive-discipline-icon">{disc.icon}</span>
                <span className="motive-discipline-label">{disc.label}</span>
              </div>
            ))}
          </div>
          {errors.discipline && <span className="motive-error-message">{errors.discipline}</span>}
        </div>

        <div className="motive-form-group">
          <label htmlFor="yearsExperience">Years of Experience *</label>
          <select
            id="yearsExperience"
            value={formData.yearsExperience}
            onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
            className={errors.yearsExperience ? 'motive-input-error' : ''}
          >
            <option value="">Select your experience level</option>
            {experienceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.yearsExperience && <span className="motive-error-message">{errors.yearsExperience}</span>}
        </div>
      </div>

      {/* Coverage Areas */}
      <div className="motive-form-section">
        <h3>Coverage Areas *</h3>
        <p className="motive-section-description">Select all areas where you're willing to provide services</p>
        <div className="motive-coverage-grid">
          {coverageAreas.map(area => (
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
        </div>
        {errors.coverageAreas && <span className="motive-error-message">{errors.coverageAreas}</span>}
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
              Submit Application
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
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
          <span className="motive-benefit-icon">⚡</span>
          <div>
            <strong>Fast Placement</strong>
            <p>Get matched within 48 hours</p>
          </div>
        </li>
        <li>
          <span className="motive-benefit-icon">💎</span>
          <div>
            <strong>Premium Agencies</strong>
            <p>Top-rated healthcare providers</p>
          </div>
        </li>
        <li>
          <span className="motive-benefit-icon">💰</span>
          <div>
            <strong>Competitive Rates</strong>
            <p>Best compensation packages</p>
          </div>
        </li>
        <li>
          <span className="motive-benefit-icon">🤝</span>
          <div>
            <strong>Personal Support</strong>
            <p>Dedicated account manager</p>
          </div>
        </li>
      </ul>
    </div>

    <div className="motive-contact-card">
      <h4>Questions?</h4>
      <p>Our team is here to help you every step of the way.</p>
      <a href="tel:+12134950092" className="motive-contact-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
        (213) 495-0092
      </a>
    </div>
  </div>
</div>
    </div>
  );
};

export default TherapistApplicationForm;