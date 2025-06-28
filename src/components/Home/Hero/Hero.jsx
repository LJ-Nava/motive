import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/home/Hero.scss';
import LogoMini from '../../../assets/motive_homecare_transparent.png';

// Logo component optimizado
const MotiveLogo = () => (
  <img 
    src={LogoMini} 
    alt="Motive Home Care - Professional Healthcare Staffing"
    width="50"
    height="50"
    loading="eager"
    style={{
      objectFit: 'contain',
      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
    }}
    onError={(e) => {
      e.target.style.display = 'none';
      console.warn('Logo image failed to load');
    }}
  />
);

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  // Datos simplificados y optimizados
  const metrics = useMemo(() => [
    { 
      value: "8,000+", 
      label: "Successful Placements",
      icon: "👥"
    },
    { 
      value: "<2hrs", 
      label: "Response Time",
      icon: "⚡"
    },
    { 
      value: "98.5%", 
      label: "Client Satisfaction",
      icon: "⭐"
    },
    { 
      value: "150+", 
      label: "Active Professionals",
      icon: "🏥"
    }
  ], []);

  const services = useMemo(() => [
    {
      type: "Physical Therapy",
      availability: "Available Now",
      icon: "🏃‍♂️"
    },
    {
      type: "Occupational Therapy", 
      availability: "Available Now",
      icon: "🤲"
    },
    {
      type: "Speech Therapy",
      availability: "Available Now",
      icon: "💬"
    }
  ], []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handlers optimizados
  const handleCTAClick = useCallback((type) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'hero',
        event_label: type === 'primary' ? 'get_started' : 'learn_more'
      });
    }

    const targetId = type === 'primary' ? '#ready-to-start' : '#services';
    const target = document.querySelector(targetId);
    
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const handleCoverageClick = useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'coverage_click', {
        event_category: 'navigation',
        event_label: 'hero_coverage'
      });
    }
    
    // Navegar a la página de coverage areas usando React Router
    navigate('/coverage-areas');
    
    // Scroll to top after navigation (igual que en tu Header)
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, [navigate]);

  const handlePhoneClick = useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'phone_click', {
        event_category: 'contact',
        event_label: 'hero_phone'
      });
    }
  }, []);

  return (
    <section 
      className="hero" 
      id="hero" 
      ref={heroRef}
      role="banner"
      aria-label="Professional Healthcare Staffing for California"
    >
      
      <div className="hero__container">
        <div className="hero__content">
          
          {/* Main Content - Left Side */}
          <div className="hero__main-content">

            {/* Header with Logo */}
            <div className={`hero__header ${isVisible ? 'animate-fade-in' : ''}`}>
              <div className="hero__logo-section">
                <MotiveLogo />
                <div className="hero__brand-info">
                  <h1 className="hero__brand-name">Motive Home Care</h1>
                  <p className="hero__tagline">Professional Healthcare Staffing</p>
                </div>
              </div>
            </div>

            {/* Main Headlines */}
            <div className={`hero__headlines ${isVisible ? 'animate-fade-in-up' : ''}`}>
              <h2 className="hero__main-title">
                Connect with California's 
                <span className="hero__title-highlight"> Top Therapy Professionals</span>
              </h2>

              <p className="hero__subtitle">
                We help healthcare agencies find qualified therapists quickly and efficiently. 
                <strong> Same-day response</strong>, verified professionals, and dedicated support 
                for your agency's success.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`hero__actions ${isVisible ? 'animate-fade-in-up' : ''}`}>
              <button 
                className="hero__primary-btn"
                onClick={() => handleCTAClick('primary')}
                aria-label="Get started with our services"
              >
                Get Started Today
                <span className="hero__btn-arrow">→</span>
              </button>
              
              <button 
                className="hero__secondary-btn"
                onClick={() => handleCTAClick('secondary')}
                aria-label="Learn more about our process"
              >
                Learn Our Process
              </button>
            </div>

            {/* Contact Info */}
            <div className={`hero__contact-info ${isVisible ? 'animate-fade-in-up' : ''}`}>
              <div className="hero__contact-card">
                <div className="hero__contact-icon">📞</div>
                <div className="hero__contact-details">
                  <span className="hero__contact-label">Call us directly</span>
                  <a 
                    href="tel:+12134950092" 
                    className="hero__phone-number"
                    onClick={handlePhoneClick}
                  >
                    (213) 495-0092
                  </a>
                  <span className="hero__contact-hours">Mon-Fri, 9AM-6PM PST</span>
                </div>
                <div className="hero__status-indicator">
                  <div className="hero__status-dot"></div>
                  <span className="hero__status-text">Online</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side - Stats & Services */}
          <div className="hero__sidebar">
            
            {/* Quick Metrics */}
            <div className={`hero__metrics-card ${isVisible ? 'animate-fade-in' : ''}`}>
              <div className="hero__metrics-header">
                <span className="hero__metrics-label">Trusted by agencies across California</span>
              </div>
              
              <div className="hero__metrics-grid">
                {metrics.map((metric, index) => (
                  <div key={index} className="hero__metric-item">
                    <span className="hero__metric-icon">{metric.icon}</span>
                    <div className="hero__metric-info">
                      <div className="hero__metric-value">{metric.value}</div>
                      <div className="hero__metric-label">{metric.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Overview */}
            <div className={`hero__services-card ${isVisible ? 'animate-fade-in' : ''}`}>
              <h3 className="hero__services-title">Our Specialties</h3>
              <div className="hero__services-list">
                {services.map((service, index) => (
                  <div key={index} className="hero__service-item">
                    <span className="hero__service-icon">{service.icon}</span>
                    <div className="hero__service-info">
                      <div className="hero__service-name">{service.type}</div>
                      <div className="hero__service-status">{service.availability}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coverage Areas Link */}
            <div className={`hero__coverage-link ${isVisible ? 'animate-fade-in' : ''}`}>
              <button 
                className="hero__coverage-btn"
                onClick={handleCoverageClick}
                aria-label="View our coverage areas"
              >
                <div className="hero__coverage-content">
                  <div className="hero__coverage-icon">📍</div>
                  <div className="hero__coverage-info">
                    <div className="hero__coverage-title">Coverage Areas</div>
                    <div className="hero__coverage-subtitle">Serving 60+ cities across Southern California</div>
                  </div>
                  <div className="hero__coverage-arrow">→</div>
                </div>
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;