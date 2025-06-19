import React, { useState, useEffect, useRef } from 'react';
import '../styles/Hero.scss';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentMetric, setCurrentMetric] = useState(0);
  const heroRef = useRef(null);

  // Premium metrics with real-time feel
  const executiveMetrics = [
    { 
      value: "300+", 
      label: "Certified Professionals", 
      sublabel: "Ready to Deploy",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      color: "from-blue-500 to-indigo-600"
    },
    { 
      value: "<5min", 
      label: "Response Excellence", 
      sublabel: "When You Need Us",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "from-emerald-500 to-teal-600"
    },
    { 
      value: "89%", 
      label: "Placement Success", 
      sublabel: "Proven Results",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      color: "from-violet-500 to-purple-600"
    },
    { 
      value: "2023", 
      label: "Growth Trajectory", 
      sublabel: "Building Excellence",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      color: "from-orange-500 to-red-500"
    }
  ];

  // Premium service offerings
  const professionalServices = [
    {
      type: "Physical Therapy",
      count: "180+",
      availability: "Immediate",
      coverage: "Statewide Network",
      icon: "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m4-2v4m0 0l3-3m-3 3l-3-3",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      type: "Occupational Therapy", 
      count: "85+",
      availability: "Available Now",
      coverage: "Major Metro Areas",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      type: "Speech Therapy",
      count: "35+", 
      availability: "Priority Access",
      coverage: "Key Regions",
      icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
      gradient: "from-violet-500 to-indigo-500"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Metric cycling for dynamic feel
    const metricInterval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % executiveMetrics.length);
    }, 4000);

    // Mouse tracking for premium interactions
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    if (heroRef.current) {
      heroRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      clearInterval(metricInterval);
      if (heroRef.current) {
        heroRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleCTAClick = (type) => {
    if (type === 'primary') {
      // Analytics: Primary CTA conversion
      window.gtag?.('event', 'cta_click', {
        event_category: 'hero',
        event_label: 'find_therapists'
      });
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Analytics: Secondary CTA engagement
      window.gtag?.('event', 'cta_click', {
        event_category: 'hero', 
        event_label: 'learn_more'
      });
      document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      
      {/* Executive-Grade Background System */}
      <div className="hero__background">
        <div 
          className="hero__interactive-mesh" 
          style={{
            '--mouse-x': `${mousePosition.x}%`,
            '--mouse-y': `${mousePosition.y}%`
          }}
        />
        <div className="hero__geometric-pattern" />
        <div className="hero__ambient-glow" />
        <div className="hero__floating-orbs">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`hero__orb hero__orb--${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hero__container">
        <div className="hero__content">
          
          {/* Executive Content Section */}
          <div className="hero__executive-content">

            {/* Executive Headline */}
            <div className="hero__headline-section">
              <h1 className={`hero__executive-title ${isVisible ? 'animate-elegant-rise' : ''}`}>
                <span className="hero__title-primary">Professional Healthcare</span>
                <span className="hero__title-emphasis">
                  <span className="hero__emphasis-text">Staffing Excellence</span>
                  <div className="hero__emphasis-underline" />
                </span>
                <span className="hero__title-location">for California Agencies</span>
              </h1>

              <p className={`hero__executive-subtitle ${isVisible ? 'animate-elegant-rise' : ''}`}>
                We connect healthcare agencies with California's most dedicated therapy professionals. 
                Exceptional response times, quality outcomes, and genuine partnership—
                <span className="hero__subtitle-emphasis">accessible to every agency.</span>
              </p>
            </div>

            {/* Executive Metrics Dashboard */}
            <div className={`hero__metrics-dashboard ${isVisible ? 'animate-elegant-rise' : ''}`}>
              <div className="hero__dashboard-header">
                <h3 className="hero__dashboard-title">Performance Analytics</h3>
                <div className="hero__dashboard-status">
                  <div className="hero__status-indicator" />
                  <span className="hero__status-text">Live Data</span>
                </div>
              </div>
              
              <div className="hero__metrics-grid">
                {executiveMetrics.map((metric, index) => (
                  <div 
                    key={index}
                    className={`hero__metric-card ${index === currentMetric ? 'hero__metric-card--featured' : ''}`}
                  >
                    <div className={`hero__metric-icon bg-gradient-to-br ${metric.color}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d={metric.icon} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="hero__metric-content">
                      <div className="hero__metric-value">{metric.value}</div>
                      <div className="hero__metric-label">{metric.label}</div>
                      <div className="hero__metric-sublabel">{metric.sublabel}</div>
                    </div>
                    <div className="hero__metric-trend">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="hero__trend-icon">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Services Portfolio */}
            <div className={`hero__services-portfolio ${isVisible ? 'animate-elegant-rise' : ''}`}>
              <div className="hero__portfolio-header">
                <h3 className="hero__portfolio-title">Professional Specialties</h3>
                <p className="hero__portfolio-subtitle">Expert professionals ready for immediate deployment</p>
              </div>
              
              <div className="hero__services-grid">
                {professionalServices.map((service, index) => (
                  <div key={index} className="hero__service-card">
                    <div className={`hero__service-icon bg-gradient-to-br ${service.gradient}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d={service.icon} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="hero__service-content">
                      <h4 className="hero__service-type">{service.type}</h4>
                      <div className="hero__service-metrics">
                        <span className="hero__service-count">{service.count} Professionals</span>
                        <span className="hero__service-availability">{service.availability}</span>
                      </div>
                      <p className="hero__service-coverage">{service.coverage}</p>
                    </div>
                    <div className="hero__service-action">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="hero__action-arrow">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Call-to-Action Suite */}
            <div className={`hero__executive-actions ${isVisible ? 'animate-elegant-rise' : ''}`}>
              <button 
                className="hero__primary-action"
                onClick={() => handleCTAClick('primary')}
              >
                <span className="hero__action-text">Connect with Professionals</span>
                <div className="hero__action-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                </div>
                <div className="hero__action-shimmer" />
              </button>
              
              <button 
                className="hero__secondary-action"
                onClick={() => handleCTAClick('secondary')}
              >
                <div className="hero__secondary-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="10,8 16,12 10,16 10,8"/>
                  </svg>
                </div>
                <span className="hero__secondary-text">Discover Our Process</span>
              </button>
            </div>

            {/* Premium Contact Channel */}
            <div className={`hero__premium-contact ${isVisible ? 'animate-elegant-rise' : ''}`}>
              <div className="hero__contact-priority">
                <div className="hero__priority-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div className="hero__contact-content">
                  <span className="hero__contact-label">Priority Support Line</span>
                  <a href="tel:+12134950092" className="hero__contact-number">
                    (213) 495-0092
                  </a>
                  <span className="hero__contact-hours">Available During Business Hours</span>
                </div>
                <div className="hero__contact-status">
                  <div className="hero__status-dot" />
                  <span className="hero__status-label">Online</span>
                </div>
              </div>
            </div>

          </div>

          {/* Executive Network Visualization */}
          <div className="hero__network-visualization">
            <div className="hero__visualization-container">
              
              {/* Central Command Hub */}
              <div className="hero__command-center">
                <div className="hero__center-core">
                  <div className="hero__core-logo">
                    <img src="/logo.png" alt="Motive Home Care" />
                  </div>
                  <div className="hero__core-rings">
                    <div className="hero__ring hero__ring--primary" />
                    <div className="hero__ring hero__ring--secondary" />
                    <div className="hero__ring hero__ring--tertiary" />
                  </div>
                </div>
                <div className="hero__center-pulse" />
              </div>

              {/* Network Nodes */}
              <div className="hero__network-nodes">
                {[...Array(8)].map((_, i) => (
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

              {/* Connection Lines */}
              <div className="hero__network-connections">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className={`hero__connection-line hero__connection-line--${i + 1}`}
                    style={{ '--connection-delay': `${i * 0.4}s` }}
                  />
                ))}
              </div>

              {/* Data Flow Particles */}
              <div className="hero__data-flow">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className={`hero__data-particle hero__data-particle--${i + 1}`}
                    style={{ '--particle-delay': `${i * 0.5}s` }}
                  />
                ))}
              </div>

              {/* Coverage Overlay */}
              <div className="hero__coverage-overlay">
                <div className="hero__coverage-title">California Coverage</div>
                <div className="hero__coverage-regions">
                  <span className="hero__region">Los Angeles</span>
                  <span className="hero__region">Orange County</span>
                  <span className="hero__region">Riverside</span>
                  <span className="hero__region">San Bernardino</span>
                  <span className="hero__region">Ventura</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Executive Scroll Indicator */}
        <div className={`hero__scroll-prompt ${isVisible ? 'animate-elegant-bounce' : ''}`}>
          <span className="hero__scroll-label">Explore Our Capabilities</span>
          <div className="hero__scroll-indicator">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l3 3 7-7"/>
              <path d="M7 6l3 3 7-7"/>
            </svg>
          </div>
        </div>

      </div>

      {/* Premium Accessibility */}
      <button className="hero__accessibility-control" aria-label="Accessibility options">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      </button>

    </section>
  );
};

export default Hero;