import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/home/Hero.scss';
import LogoMini from '../../../assets/motive_homecare_transparent.png';

// Importar videos desde assets
import video1 from '../../../assets/videos/video2.mp4';
import video2 from '../../../assets/videos/video3.mp4';
import video3 from '../../../assets/videos/video4.mp4';
import video4 from '../../../assets/videos/video5.mp4';
import video5 from '../../../assets/videos/video1.mp4';

// Logo component optimizado
const MotiveLogo = () => (
  <img 
    src={LogoMini} 
    alt="Motive Home Care Logo"
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

// Componente de Video Background
const VideoBackground = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);
  const nextVideoRef = useRef(null);

  const videos = useMemo(() => [
    video1,
    video2, 
    video3,
    video4,
    video5
  ], []);

  const handleVideoEnd = useCallback(() => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => 
        (prevIndex + 1) % videos.length
      );
      setIsTransitioning(false);
    }, 1000);
  }, [videos.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      video.play().catch(console.error);
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [currentVideoIndex, handleVideoEnd]);

  return (
    <div className="hero__video-background">
      <video
        ref={videoRef}
        className={`hero__video ${isTransitioning ? 'transitioning-out' : ''}`}
        src={videos[currentVideoIndex]}
        muted
        playsInline
        preload="metadata"
      />
      {isTransitioning && (
        <video
          ref={nextVideoRef}
          className="hero__video transitioning-in"
          src={videos[(currentVideoIndex + 1) % videos.length]}
          muted
          playsInline
          preload="metadata"
        />
      )}
      <div className="hero__video-overlay"></div>
    </div>
  );
};

// Hook para verificar horario de oficina
const useOfficeHours = () => {
  const [isOfficeOpen, setIsOfficeOpen] = useState(true);

  useEffect(() => {
    const checkOfficeHours = () => {
      const now = new Date();
      const laTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
      const currentHour = laTime.getHours();
      const currentDay = laTime.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      // Horario: Lunes a Viernes (1-5), 9AM a 6PM
      const isWeekday = currentDay >= 1 && currentDay <= 5;
      const isBusinessHour = currentHour >= 9 && currentHour < 18;
      
      setIsOfficeOpen(isWeekday && isBusinessHour);
    };

    checkOfficeHours();
    
    // Verificar cada minuto
    const interval = setInterval(checkOfficeHours, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return isOfficeOpen;
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showKeySpecialties, setShowKeySpecialties] = useState(false);
  const [cardsElevated, setCardsElevated] = useState(false);
  const heroRef = useRef(null);
  const serviceCardsRef = useRef([]);
  const navigate = useNavigate();
  const isOfficeOpen = useOfficeHours();

  // Datos de servicios simplificados
  const therapyServices = useMemo(() => [
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
      keyPoints: [
        'Swallowing disorders evaluation',
        'Communication recovery programs',
        'Voice and speech rehabilitation',
        'Cognitive therapy support',
        'Technology-assisted therapy',
        'Caregiver training programs'
      ]
    }
  ], []);

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
      value: "550+", 
      label: "Active Professionals",
      icon: "🏥"
    }
  ], []);

  // ========================================== 
  // FAST & CLEAN ANIMATION SYSTEM
  // ==========================================

  const handleServiceClick = useCallback((serviceIndex) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSelectedService(serviceIndex);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'service_expansion', {
        event_category: 'hero',
        event_label: therapyServices[serviceIndex].type
      });
    }

    // FAST ANIMATIONS - Total: 600ms
    // STEP 1: Elevar tarjetas (200ms)
    setTimeout(() => {
      setCardsElevated(true);
    }, 50);

    // STEP 2: Mostrar Key Specialties (300ms después)
    setTimeout(() => {
      setShowKeySpecialties(true);
    }, 350);

    // STEP 3: Finalizar animación (600ms total)
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [isAnimating, therapyServices]);

  const handleReturnToServices = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // FAST RETURN - Total: 400ms
    // STEP 1: Ocultar Key Specialties (100ms)
    setShowKeySpecialties(false);
    
    // STEP 2: Bajar tarjetas (200ms después)
    setTimeout(() => {
      setCardsElevated(false);
    }, 150);
    
    // STEP 3: Reset completo (400ms total)
    setTimeout(() => {
      setSelectedService(null);
      setIsAnimating(false);
    }, 400);
  }, [isAnimating]);

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

  const targetId = type === 'primary' ? '#formlol' : '#services';
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
    
    navigate('/coverage-areas');
    
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
      <VideoBackground />
      
      <div className="hero__container">
        <div className="hero__content">
          
          {/* Main Content - Left Side */}
          <div className="hero__main-content">

            {/* Main Headlines */}
            <div className={`hero__headlines ${isVisible ? 'animate-fade-in-up' : ''}`}>
              <h1 className="hero__main-title">
                Connect with California's 
                <span className="hero__title-highlight"> Top Therapy Professionals</span>
              </h1>

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
            </div>

            {/* Contact Info - PERMANECE IGUAL */}
            <div className={`hero__contact-info ${isVisible ? 'animate-fade-in-up' : ''}`}>
              <div className={`hero__contact-card ${!isOfficeOpen ? 'office-closed' : ''}`}>
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
                  <div className={`hero__status-dot ${!isOfficeOpen ? 'offline' : ''}`}></div>
                  <span className={`hero__status-text ${!isOfficeOpen ? 'offline' : ''}`}>
                    {isOfficeOpen ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>

              {/* Coverage Areas Link - PERMANECE IGUAL */}
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

          {/* Right Side - Stats & Services SIMPLIFICADO */}
          <div className="hero__sidebar">
            
            {/* Quick Metrics */}
            <div className={`hero__metrics-card ${isVisible ? 'animate-fade-in' : ''} ${selectedService !== null ? 'metrics-collapsed' : ''}`}>
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

            {/* SIMPLIFIED SERVICES CARD SYSTEM */}
            <div className={`hero__services-card ${isVisible ? 'animate-fade-in' : ''} ${selectedService !== null ? 'services-expanded' : ''}`}>
              
              <h2 className="hero__services-title">Our Specialties</h2>
              <p className="hero__services-subtitle">
                Expert professionals ready to help - click to learn more
              </p>
              
              {/* FAST INTERACTIVE CARDS */}
              <div className={`hero__services-interactive ${cardsElevated ? 'cards-elevated' : ''}`}>
                {therapyServices.map((service, index) => (
                  <button
                    key={index}
                    ref={el => serviceCardsRef.current[index] = el}
                    className={`hero__service-card-interactive ${isAnimating ? 'animating' : ''} ${
                      selectedService === index ? 'selected-card' : ''
                    } ${
                      cardsElevated && selectedService !== index ? 'stacked-behind' : ''
                    }`}
                    onClick={() => handleServiceClick(index)}
                    disabled={isAnimating}
                    style={{
                      '--card-index': selectedService === index ? 0 : (selectedService !== null ? index + 1 : 0)
                    }}
                  >
                    <div className="hero__service-card-icon">
                      {service.icon}
                    </div>
                    <div className="hero__service-card-content">
                      <div className="hero__service-card-label">{service.shortName}</div>
                      <div className="hero__service-card-title">{service.type}</div>
                      <div className="hero__service-card-stats">
                        <span>{service.professionals} Professionals</span>
                        <span>{service.responseTime} Response</span>
                      </div>
                    </div>
                    <div className="hero__service-card-arrow">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>

              {/* SIMPLIFIED KEY SPECIALTIES ONLY */}
              {selectedService !== null && (
                <div className={`hero__key-specialties ${showKeySpecialties ? 'specialties-visible' : ''}`}>
                  
                  {/* Return Button */}
                  <div className="hero__specialties-header">
                    <button 
                      className="hero__return-button"
                      onClick={handleReturnToServices}
                      disabled={isAnimating}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"/>
                      </svg>
                      Back to Services
                    </button>
                  </div>

                  {/* Key Specialties Content */}
                  <div className="hero__specialties-content">
                    <h4 className="hero__specialties-title">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      {therapyServices[selectedService].type} Key Specialties
                    </h4>
                    
                    <div className="hero__specialties-grid">
                      {therapyServices[selectedService].keyPoints.map((point, index) => (
                        <div key={index} className="hero__specialty-item">
                          <div className="hero__specialty-icon">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                          </div>
                          <span className="hero__specialty-text">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;