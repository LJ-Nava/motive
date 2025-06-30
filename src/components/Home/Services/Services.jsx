import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/home/Services.scss';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const servicesRef = useRef(null);
  const navigate = useNavigate();

  // Servicios simplificados con textos de la página original
  const therapyServices = [
    {
      id: 'physical-therapy',
      type: 'Physical Therapy',
      shortName: 'PT',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m4-2v4m0 0l3-3m-3 3l-3-3"/>
        </svg>
      ),
      professionals: '150+',
      responseTime: '<2hrs',
      description: 'Experienced physical therapists specializing in post-surgical rehabilitation, neurological recovery, and mobility restoration. Our PTs bring years of home health experience to help patients regain strength and independence.',
      keyPoints: [
        'Post-surgical rehabilitation',
        'Neurological recovery',
        'Home safety assessments',
        'Equipment training',
        'Patient education',
        'Consistent care continuity'
      ]
    },
    {
      id: 'occupational-therapy',
      type: 'Occupational Therapy',
      shortName: 'OT',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
        </svg>
      ),
      professionals: '75+',
      responseTime: '<2hrs',
      description: 'Skilled occupational therapists focused on helping patients regain independence in daily activities. Our OTs provide meaningful, functional improvements that matter most to patients and families.',
      keyPoints: [
        'Activities of daily living training',
        'Cognitive rehabilitation support',
        'Adaptive equipment recommendations',
        'Home modification assessments',
        'Family education and support',
        'Integrated care coordination'
      ]
    },
    {
      id: 'speech-therapy',
      type: 'Speech Therapy',
      shortName: 'SLP',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
        </svg>
      ),
      professionals: '50+',
      responseTime: '<2hrs',
      description: 'Expert speech-language pathologists who provide patient, effective therapy for communication and swallowing disorders. Our SLPs are dedicated to helping patients regain their voice and confidence.',
      keyPoints: [
        'Swallowing disorders evaluation',
        'Communication recovery programs',
        'Voice and speech rehabilitation',
        'Cognitive therapy support',
        'Technology-assisted therapy',
        'Caregiver training programs'
      ]
    }
  ];

  // Ventajas simplificadas
  const serviceBenefits = [
    
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Quality Assured',
      description: 'Thorough screening, background checks, and ongoing professional development for your peace of mind.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: 'Ongoing Support',
      description: 'Regular communication throughout the placement process with guaranteed patient continuity.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Professional Excellence',
      description: 'Reliable therapy staffing with clear communication and transparent process at every step.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-cycle exactamente 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % therapyServices.length);
    }, 10000); // Exactamente 10 segundos

    return () => clearInterval(interval);
  }, []);

  const handleServiceClick = (index) => {
    setActiveService(index);
  };

  // ✅ FUNCIONES DE NAVEGACIÓN CON REACT ROUTER
  const handleAgencyClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'agency_button_click', {
        event_category: 'services',
        event_label: 'join_network'
      });
    }
    
    // Navegar a la página de agencias
    navigate('/agencies/join');
    
    // Scroll to top después de navegar
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleTherapistClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'therapist_button_click', {
        event_category: 'services',
        event_label: 'apply_today'
      });
    }
    
    // Navegar a la página de terapeutas
    navigate('/therapists/apply');
    
    // Scroll to top después de navegar
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <section className="services" id="services" ref={servicesRef}>
      <div className="services__container">
        
        {/* Header simplificado */}
        <div className={`services__header ${isVisible ? 'fade-in' : ''}`}>
          <div className="services__badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Professional Healthcare Staffing</span>
          </div>
          
          <h2 className="services__title">
            Professional Therapy Staffing <br />
            <span className="services__title-highlight">That Actually Works for Everyone</span>
          </h2>
          
          <p className="services__subtitle">
            At Motive Home Care, we're committed to enhancing the quality of in-home therapy. 
            Located in the heart of Los Angeles, we specialize in staffing home health agencies 
            with the finest physical, occupational and speech therapists. Our dedicated team 
            prides itself on providing reliable and timely service, ensuring that we connect 
            you with clinicians who are not only experienced but also deeply passionate about 
            patient care.
          </p>
        </div>

        {/* Servicios principales */}
        <div className={`services__showcase ${isVisible ? 'fade-in' : ''}`}>
          <div className="services__showcase-header">
            <h3 className="services__showcase-title">Our Therapy Specialties</h3>
            <p className="services__showcase-subtitle">
              Expert professionals ready to help - because every patient deserves quality care
            </p>
          </div>

          {/* Navegación de servicios */}
          <div className="services__navigation">
            {therapyServices.map((service, index) => (
              <button
                key={index}
                className={`services__nav-button ${activeService === index ? 'active' : ''}`}
                onClick={() => handleServiceClick(index)}
              >
                <div className="services__nav-icon">
                  {service.icon}
                </div>
                <div className="services__nav-content">
                  <span className="services__nav-label">{service.shortName}</span>
                  <span className="services__nav-title">{service.type}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Servicio activo */}
          <div className="services__active-service">
            <div className="services__service-card">
              <div className="services__service-header">
                <div className="services__service-icon">
                  {therapyServices[activeService].icon}
                </div>
                <div className="services__service-info">
                  <h4 className="services__service-title">
                    {therapyServices[activeService].type}
                  </h4>
                </div>
              </div>
              
              <p className="services__service-description">
                {therapyServices[activeService].description}
              </p>

              {/* Tarjetas mejoradas de puntos clave */}
              <div className="services__service-features">
                <h5 className="services__features-title">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  Key Specialties
                </h5>
                <div className="services__features-grid">
                  {therapyServices[activeService].keyPoints.map((point, index) => (
                    <div key={index} className="services__feature-card">
                      <div className="services__feature-icon">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                      </div>
                      <span className="services__feature-text">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beneficios simplificados */}
        <div className={`services__benefits ${isVisible ? 'fade-in' : ''}`}>
          <div className="services__benefits-header">
            <h3 className="services__benefits-title">Why Choose Motive?</h3>
            <p className="services__benefits-subtitle">
              At Motive Home Care, we pride ourselves on connecting you with the most dedicated 
              and experienced therapists in the Southern California region. Our commitment to 
              reliability and timely service ensures that you receive the highest quality care 
              when it matters most.
            </p>
          </div>
          
          <div className="services__benefits-grid">
            {serviceBenefits.map((benefit, index) => (
              <div key={index} className="services__benefit-card">
                <div className="services__benefit-icon">
                  {benefit.icon}
                </div>
                <div className="services__benefit-content">
                  <h4 className="services__benefit-title">{benefit.title}</h4>
                  <p className="services__benefit-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action rediseñado con navegación React Router */}
        <div className={`services__cta ${isVisible ? 'fade-in' : ''}`}>
          <div className="services__cta-content">
            <h3 className="services__cta-title" id="ready-to-start">
              Ready to Get Started?
            </h3>
            <p className="services__cta-subtitle">
              Choose your path to connect with quality healthcare staffing solutions.
            </p>
            
            <div className="services__cta-options">
              <div className="services__cta-option">
                <div className="services__option-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <h4 className="services__option-title">I'm an Agency</h4>
                <p className="services__option-description">
                  Looking for qualified therapists to serve your patients
                </p>
                <button 
                  onClick={handleAgencyClick}
                  className="services__option-button"
                >
                  Join Our Network
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                </button>
              </div>

              <div className="services__cta-option">
                <div className="services__option-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h4 className="services__option-title">I'm a Therapist</h4>
                <p className="services__option-description">
                  Ready to connect with premium healthcare opportunities
                </p>
                <button 
                  onClick={handleTherapistClick}
                  className="services__option-button"
                >
                  Apply Today
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Información de contacto alternativa */}
            <div className="services__cta-contact">
              <p className="services__contact-text">
                Have questions? Call us directly:
              </p>
              <a href="tel:+12134950092" className="services__contact-phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>(213) 495-0092</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;