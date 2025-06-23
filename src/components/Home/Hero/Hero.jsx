import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import '../../styles/home/Hero.scss';
import LogoMini from '../../../assets/motive_homecare_transparent.png';

// Logo component optimizado para imagen real
const MotiveLogo = () => (
  <img 
    src={LogoMini} 
    alt="Motive Home Care - Professional Healthcare Staffing Excellence"
    width="70"
    height="70"
    loading="eager"
    style={{
      objectFit: 'contain',
      filter: 'drop-shadow(0 2px 8px rgba(30, 64, 175, 0.1))'
    }}
    onError={(e) => {
      // Fallback en caso de error de carga
      e.target.style.display = 'none';
      console.warn('Logo image failed to load');
    }}
  />
);

const Hero = () => {
  // State management optimizado
  const [isVisible, setIsVisible] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroRef = useRef(null);
  const animationRef = useRef(null);

  // Datos optimizados con useMemo
  const metrics = useMemo(() => [
    { 
      value: "8,000+", 
      label: "Successful Placements", 
      sublabel: "Since 2023",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      gradient: "from-blue-500 to-indigo-600",
      delay: 0
    },
    { 
      value: "<2hrs", 
      label: "Response Time", 
      sublabel: "When You Need Us",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      gradient: "from-emerald-500 to-teal-600",
      delay: 200
    },
    { 
      value: "98.5%", 
      label: "Client Satisfaction", 
      sublabel: "Consistently High",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      gradient: "from-violet-500 to-purple-600",
      delay: 400
    },
    { 
      value: "150+", 
      label: "Active Professionals", 
      sublabel: "Ready to Help",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      gradient: "from-orange-500 to-red-500",
      delay: 600
    }
  ], []);

  const services = useMemo(() => [
    {
      type: "Physical Therapy",
      count: "",
      availability: "Immediate",
      coverage: "Statewide Network",
      icon: "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m4-2v4m0 0l3-3m-3 3l-3-3",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      type: "Occupational Therapy", 
      count: "",
      availability: "Available Now",
      coverage: "Major Metro Areas",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      type: "Speech Therapy",
      count: "", 
      availability: "Priority Access",
      coverage: "Key Regions",
      icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
      gradient: "from-violet-500 to-indigo-500"
    }
  ], []);

  // Detección de reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer para animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Metric cycling optimizado
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % metrics.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [metrics.length, reducedMotion]);

  // Handlers optimizados con useCallback
  const handleCTAClick = useCallback((type) => {
    // Analytics mejorado
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'hero',
        event_label: type === 'primary' ? 'connect_professionals' : 'discover_process',
        value: type === 'primary' ? 1 : 0.5
      });
    }

    const targetId = type === 'primary' ? '#contact' : '#services';
    const target = document.querySelector(targetId);
    
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const handlePhoneClick = useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'phone_click', {
        event_category: 'contact',
        event_label: 'hero_phone'
      });
    }
  }, []);

  const handleScrollPrompt = useCallback(() => {
    const target = document.querySelector('#services');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section 
      className="hero" 
      id="hero" 
      ref={heroRef}
      role="banner"
      aria-label="Professional Healthcare Staffing Excellence for California Agencies"
    >
      
      {/* Background optimizado */}
      <div className="hero__background" aria-hidden="true">
        <div className="hero__geometric-pattern" />
        <div className="hero__ambient-glow" />
        {!reducedMotion && (
          <div className="hero__floating-orbs">
            {Array.from({ length: 6 }, (_, i) => (
              <div 
                key={i} 
                className={`hero__orb hero__orb--${i + 1}`}
                style={{ '--delay': `${i * 0.5}s` }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hero__container">
        <div className="hero__content">
          
          {/* Content Section Optimizado */}
          <div className="hero__executive-content">

            {/* SEO-Optimized Headline */}
            <header className="hero__headline-section">
              <h1 className={`hero__executive-title ${isVisible ? 'animate-fade-in-up' : ''}`}>
                Professional Healthcare 
                <span className="hero__title-emphasis">
                  Staffing Excellence
                </span>
                for California Agencies
              </h1>

              <p className={`hero__executive-subtitle ${isVisible ? 'animate-fade-in-up' : ''}`}>
                We connect healthcare agencies with California's most 
                <strong className="hero__subtitle-emphasis"> dedicated therapy professionals</strong>. 
                Exceptional response times, quality outcomes, and genuine partnership—accessible to every agency.
              </p>
            </header>

            {/* Metrics Dashboard Optimizado */}
            <div 
              className={`hero__metrics-dashboard ${isVisible ? 'animate-fade-in-up' : ''}`}
              role="region"
              aria-label="Performance metrics"
            >
              <div className="hero__dashboard-header">
                <h2 className="hero__dashboard-title">Real Numbers, Real Results</h2>
                <div className="hero__dashboard-status">
                  <div className="hero__status-indicator" aria-label="Live data" />
                  <span className="hero__status-text">Live Data</span>
                </div>
              </div>
              
              <div className="hero__metrics-grid">
                {metrics.map((metric, index) => (
                  <div 
                    key={index}
                    className={`hero__metric-card ${index === activeMetric ? 'hero__metric-card--featured' : ''}`}
                    style={{ '--delay': `${metric.delay}ms` }}
                    role="article"
                    aria-label={`${metric.value} ${metric.label}`}
                  >
                    <div 
                      className={`hero__metric-icon bg-gradient-to-br ${metric.gradient}`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d={metric.icon} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="hero__metric-content">
                      <div className="hero__metric-value">{metric.value}</div>
                      <div className="hero__metric-label">{metric.label}</div>
                      <div className="hero__metric-sublabel">{metric.sublabel}</div>
                    </div>
                    <div className="hero__metric-trend" aria-label="Trending up">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="hero__trend-icon">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Portfolio Optimizado */}
            <div 
              className={`hero__services-portfolio ${isVisible ? 'animate-fade-in-up' : ''}`}
              role="region"
              aria-label="Our therapy specialties"
            >
              <div className="hero__portfolio-header">
                <h2 className="hero__portfolio-title">Our Therapy Specialties</h2>
                <p className="hero__portfolio-subtitle">Expert professionals ready to help - because every patient deserves quality care</p>
              </div>
              
              <div className="hero__services-grid">
                {services.map((service, index) => (
                  <article 
                    key={index} 
                    className="hero__service-card"
                    style={{ '--delay': `${index * 100}ms` }}
                  >
                    <div 
                      className={`hero__service-icon bg-gradient-to-br ${service.gradient}`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d={service.icon} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="hero__service-content">
                      <h3 className="hero__service-type">{service.type}</h3>
                      <div className="hero__service-metrics">
                        <span className="hero__service-count">{service.count} </span>
                        <span className="hero__service-availability">{service.availability}</span>
                      </div>
                      <p className="hero__service-coverage">{service.coverage}</p>
                    </div>
                    <div className="hero__service-action" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="hero__action-arrow">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                      </svg>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* CTA Section Optimizado */}
            <div className={`hero__executive-actions ${isVisible ? 'animate-fade-in-up' : ''}`}>
              <button 
                className="hero__primary-action"
                onClick={() => handleCTAClick('primary')}
                aria-label="Connect with our professional therapists"
              >
                <span className="hero__action-text">Connect with Professionals</span>
                <div className="hero__action-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                </div>
                <div className="hero__action-shimmer" aria-hidden="true" />
              </button>
              
              <button 
                className="hero__secondary-action"
                onClick={() => handleCTAClick('secondary')}
                aria-label="Learn more about our process"
              >
                <div className="hero__secondary-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="10,8 16,12 10,16 10,8"/>
                  </svg>
                </div>
                <span className="hero__secondary-text">Discover Our Process</span>
              </button>
            </div>

            {/* Contact Section Optimizado */}
            <div 
              className={`hero__premium-contact ${isVisible ? 'animate-fade-in-up' : ''}`}
              role="complementary"
              aria-label="Priority contact information"
            >
              <div className="hero__contact-priority">
                <div className="hero__priority-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div className="hero__contact-content">
                  <span className="hero__contact-label">Priority Support Line</span>
                  <a 
                    href="tel:+12134950092" 
                    className="hero__contact-number"
                    onClick={handlePhoneClick}
                    aria-label="Call us at (213) 495-0092"
                  >
                    (213) 495-0092
                  </a>
                  <span className="hero__contact-hours">Mon - Fri, 9AM - 6PM</span>
                </div>
                <div className="hero__contact-status">
                  <div className="hero__status-dot" aria-label="Currently online" />
                  <span className="hero__status-label">Online</span>
                </div>
              </div>
            </div>

          </div>

          {/* Network Visualization Optimizado */}
          <div className="hero__network-visualization" role="img" aria-label="Network visualization showing our California coverage">
            <div className="hero__visualization-container">
              
              {/* Central Hub con Logo */}
              <div className="hero__command-center">
                <div className="hero__center-core">
                  <div className="hero__core-logo">
                    <MotiveLogo />
                  </div>
                  {!reducedMotion && (
                    <div className="hero__core-rings" aria-hidden="true">
                      <div className="hero__ring hero__ring--primary" />
                      <div className="hero__ring hero__ring--secondary" />
                      <div className="hero__ring hero__ring--tertiary" />
                    </div>
                  )}
                </div>
                {!reducedMotion && <div className="hero__center-pulse" aria-hidden="true" />}
              </div>

              {/* Network Nodes Optimizado */}
              {!reducedMotion && (
                <>
                  <div className="hero__network-nodes" aria-hidden="true">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div 
                        key={i}
                        className={`hero__network-node hero__network-node--${i + 1}`}
                        style={{ '--node-delay': `${i * 0.3}s` }}
                      >
                        <div className="hero__node-core" />
                        <div className="hero__node-pulse" />
                      </div>
                    ))}
                  </div>

                  <div className="hero__network-connections" aria-hidden="true">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div 
                        key={i}
                        className={`hero__connection-line hero__connection-line--${i + 1}`}
                        style={{ '--connection-delay': `${i * 0.4}s` }}
                      />
                    ))}
                  </div>

                  <div className="hero__data-flow" aria-hidden="true">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div 
                        key={i}
                        className={`hero__data-particle hero__data-particle--${i + 1}`}
                        style={{ '--particle-delay': `${i * 0.5}s` }}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Coverage Overlay */}
              <div className="hero__coverage-overlay">
                <div className="hero__coverage-title">California Coverage</div>
                <div className="hero__coverage-regions">
                  {['Los Angeles', 'Orange County', 'Riverside', 'San Bernardino', 'Ventura'].map((region, index) => (
                    <span key={index} className="hero__region">{region}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <button 
          className={`hero__scroll-prompt ${isVisible && !reducedMotion ? 'animate-bounce' : ''}`}
          onClick={handleScrollPrompt}
          aria-label="Scroll to explore our capabilities"
        >
          <span className="hero__scroll-label">Explore Our Capabilities</span>
          <div className="hero__scroll-indicator">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l3 3 7-7"/>
              <path d="M7 6l3 3 7-7"/>
            </svg>
          </div>
        </button>

      </div>

    </section>
  );
};

export default Hero;