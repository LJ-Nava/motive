import React, { useState, useEffect, useRef } from 'react';
import '../../styles/home/Services.scss';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);
  const servicesRef = useRef(null);

  // Enhanced service offerings with more specific data
  const therapyServices = [
    {
      id: 'physical-therapy',
      type: 'Physical Therapy',
      shortName: 'PT',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m4-2v4m0 0l3-3m-3 3l-3-3"/>
        </svg>
      ),
      gradient: 'from-blue-500 to-indigo-600',
      professionals: '300+',
      responseTime: '<2hrs',
      coverage: 'Statewide',
      description: 'Experienced physical therapists ready to help your patients regain mobility and strength. Our PTs bring years of home health experience and genuine care to every visit, ensuring consistent patient care.',
      keyPoints: [
        'Post-surgical rehabilitation specialists',
        'Neurological recovery expertise', 
        'Home safety assessments & modifications',
        'Equipment training and patient education',
        'Digital documentation & progress tracking',
        'Guaranteed patient continuity'
      ],
      coverageHighlights: [
        'Los Angeles County', 'Orange County', 'Riverside County', 'San Bernardino County', 'Kern County'
      ],
      specialties: [
        'Orthopedic Recovery',
        'Stroke Rehabilitation', 
        'Balance & Fall Prevention',
        'Chronic Pain Management'
      ]
    },
    {
      id: 'occupational-therapy',
      type: 'Occupational Therapy',
      shortName: 'OT',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
        </svg>
      ),
      gradient: 'from-emerald-500 to-teal-600',
      professionals: '150+',
      responseTime: '<2hrs',
      coverage: 'Major Areas',
      description: 'Skilled occupational therapists who help patients regain independence in daily activities. Our OTs focus on meaningful, functional improvements that matter most to patients and families.',
      keyPoints: [
        'Activities of daily living training',
        'Cognitive rehabilitation support',
        'Adaptive equipment recommendations',
        'Home modification assessments',
        'Integrated care coordination',
        'Family education and support'
      ],
      coverageHighlights: [
        'Central LA', 'San Fernando Valley', 'South Bay', 'Orange County', 'Inland Empire'
      ],
      specialties: [
        'ADL Independence',
        'Cognitive Therapy',
        'Hand Therapy',
        'Low Vision Training'
      ]
    },
    {
      id: 'speech-therapy',
      type: 'Speech Therapy',
      shortName: 'ST',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
        </svg>
      ),
      gradient: 'from-violet-500 to-purple-600',
      professionals: '100+',
      responseTime: '<2hrs',
      coverage: 'Key Regions',
      description: 'Expert speech-language pathologists who bring hope and progress to communication challenges. Our SLPs provide patient, effective therapy tailored to each individual\'s specific needs.',
      keyPoints: [
        'Swallowing disorders evaluation',
        'Communication recovery programs',
        'Cognitive therapy support',
        'Voice and speech rehabilitation',
        'Technology-assisted therapy',
        'Caregiver training programs'
      ],
      coverageHighlights: [
        'West LA', 'Beverly Hills', 'Torrance', 'Manhattan Beach', 'Pasadena'
      ],
      specialties: [
        'Dysphagia Management',
        'Aphasia Recovery',
        'Voice Therapy',
        'Cognitive Communication'
      ]
    }
  ];

  // Updated stats with more recent data
  const performanceStats = [
    { 
      value: '2,400+', 
      label: 'Successful Placements', 
      sublabel: 'Since 2023',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      )
    },
    { 
      value: '<2hrs', 
      label: 'Response Time', 
      sublabel: 'When You Need Us',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      )
    },
    { 
      value: '98.5%', 
      label: 'Client Satisfaction', 
      sublabel: 'Consistently High',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      )
    },
    { 
      value: '550+', 
      label: 'Active Professionals', 
      sublabel: 'Ready to Help',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        </svg>
      )
    }
  ];

  // Enhanced differentiators with corrected platform integration
  const serviceDifferentiators = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Rapid Response',
      description: 'Usually within 2 hours of your request through our streamlined matching process - because we understand urgency in healthcare.',
      highlight: 'Same Day',
      features: ['24/7 Availability', 'Real-time Matching', 'Urgent Care Priority']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Quality Assurance',
      description: 'Thorough screening, background checks, and ongoing professional development for your peace of mind and patient safety.',
      highlight: 'Verified',
      features: ['Background Verified', 'License Monitoring', 'Skill Assessments']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: 'Ongoing Support',
      description: 'Regular updates and communication throughout the placement process and beyond, with guaranteed patient continuity.',
      highlight: 'Always Available',
      features: ['Dedicated Support', 'Progress Tracking', 'Issue Resolution']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Transparent Process',
      description: 'Quality therapy staffing for all home health agencies - accessible service with clear communication at every step.',
      highlight: 'Transparent',
      features: ['Clear Communication', 'No Hidden Fees', 'Open Process']
    }
  ];

  // Technology integration features - Fixed to not claim ownership of TherapySync
  const technologyFeatures = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 19c-5 0-8-3-8-8s3-8 8-8 8 3 8 8-3 8-8 8zm0 0c5 0 8-3 8-8s-3-8-8-8"/>
        </svg>
      ),
      title: 'TherapySync Compatible',
      description: 'Our therapists are trained and ready to work with TherapySync platform for seamless documentation and scheduling.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
      title: 'Real-Time Communication',
      description: 'Direct communication channels for placement updates, therapist availability, and patient care coordination.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        </svg>
      ),
      title: 'Guaranteed Continuity',
      description: 'Our therapists commit to consistent patient care, ensuring uninterrupted treatment plans and better outcomes.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimatedStats(true), 600);
        }
      },
      { threshold: 0.3 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-cycle through services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % therapyServices.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleServiceClick = (index) => {
    setActiveService(index);
  };

  return (
    <section className="services" id="services" ref={servicesRef}>
      
      {/* Seamless Background Gradient System - Hero to Services Flow */}
      <div className="services__background">
        <div className="services__seamless-gradient" />
        <div className="services__premium-mesh" />
        <div className="services__floating-elements">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className={`services__floating-element services__floating-element--${i + 1}`}
            />
          ))}
        </div>
        <div className="services__geometric-overlay" />
      </div>

      <div className="services__container">
        
        {/* Premium Header with Enhanced Badge */}
        <div className={`services__header ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="services__header-badge">
            <div className="services__badge-shimmer" />
            <div className="services__badge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span className="services__badge-text">Premium Healthcare Staffing</span>
            <div className="services__badge-glow" />
          </div>
          
          <h2 className="services__title">
            <span className="services__title-main">Professional Therapy Staffing</span>
            <span className="services__title-emphasis">
              That Actually Works for Everyone
              <div className="services__title-decoration" />
              <div className="services__title-sparkle">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 0z"/>
                </svg>
              </div>
            </span>
          </h2>
          
          <p className="services__subtitle">
            At Motive Home Care, we’re committed to enhancing the quality of in-home therapy. Located in the heart of Los Angeles, we specialize in staffing home health agencies with the finest physical, occupational and speech therapists. Our dedicated team prides itself on providing reliable and timely service, ensuring that we connect you with clinicians who are not only experienced but also deeply passionate about patient care.
              
            <span className="services__subtitle-highlight">   Trust us to help you deliver outstanding home health therapy services to those who need it most.</span>
          </p>
        </div>

        {/* Enhanced Analytics Dashboard with Icons */}
        <div className={`services__analytics ${animatedStats ? 'services__analytics--animated' : ''}`}>
          <div className="services__analytics-glass" />
          <div className="services__analytics-border" />
          
          <div className="services__analytics-header">
            <div className="services__analytics-title-wrapper">
              <div className="services__analytics-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 className="services__analytics-title">Real Numbers, Real Results</h3>
            </div>
            <div className="services__analytics-status">
              <div className="services__status-dot" />
              <span className="services__status-text">Live Data</span>
            </div>
          </div>
          
          <div className="services__stats-grid">
            {performanceStats.map((stat, index) => (
              <div 
                key={index}
                className="services__stat-card"
                style={{ '--animation-delay': `${index * 0.2}s` }}
              >
                <div className="services__stat-glow" />
                <div className="services__stat-icon">
                  {stat.icon}
                </div>
                <div className="services__stat-content">
                  <div className="services__stat-value">{stat.value}</div>
                  <div className="services__stat-label">{stat.label}</div>
                  <div className="services__stat-sublabel">{stat.sublabel}</div>
                </div>
                <div className="services__stat-indicator">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Services Showcase */}
        <div className={`services__showcase ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="services__showcase-header">
            <div className="services__showcase-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 className="services__showcase-title">Our Therapy Specialties</h3>
            <p className="services__showcase-subtitle">
              Expert professionals ready to help - because every patient deserves quality care
            </p>
          </div>

          {/* Enhanced Service Navigation */}
          <div className="services__navigation">
            {therapyServices.map((service, index) => (
              <button
                key={index}
                className={`services__nav-button ${activeService === index ? 'services__nav-button--active' : ''}`}
                onClick={() => handleServiceClick(index)}
              >
                <div className="services__nav-shimmer" />
                <div className="services__nav-icon">
                  {service.icon}
                </div>
                <div className="services__nav-content">
                  <span className="services__nav-label">{service.shortName}</span>
                  <span className="services__nav-title">{service.type}</span>
                </div>
                <div className="services__nav-indicator" />
                <div className="services__nav-glow" />
              </button>
            ))}
          </div>

          {/* Enhanced Active Service Display */}
          <div className="services__display-panel">
            <div className="services__service-card">
              <div className="services__card-glass" />
              <div className="services__card-border" />
              <div className="services__card-glow" />
              
              <div className="services__card-content">
                <div className="services__card-header">
                  <div className="services__card-icon">
                    {therapyServices[activeService].icon}
                    <div className="services__icon-glow" />
                  </div>
                  <div className="services__card-info">
                    <h4 className="services__card-title">
                      {therapyServices[activeService].type}
                    </h4>
                    <div className="services__card-metrics">
                      <span className="services__metric">
                        <div className="services__metric-icon">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                          </svg>
                        </div>
                        {therapyServices[activeService].professionals} Available
                      </span>
                      <span className="services__metric">
                        <div className="services__metric-icon">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                          </svg>
                        </div>
                        {therapyServices[activeService].responseTime} Response
                      </span>
                      <span className="services__metric">
                        <div className="services__metric-icon">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                          </svg>
                        </div>
                        {therapyServices[activeService].coverage}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="services__card-description">
                  {therapyServices[activeService].description}
                </p>

                {/* Enhanced Key Points Grid */}
                <div className="services__points-grid">
                  {therapyServices[activeService].keyPoints.map((point, index) => (
                    <div key={index} className="services__point-item">
                      <div className="services__point-icon">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                        <div className="services__point-glow" />
                      </div>
                      <span className="services__point-text">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Specialties Section */}
                <div className="services__specialties-section">
                  <h5 className="services__specialties-title">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="services__specialties-icon">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    Key Specialties
                  </h5>
                  <div className="services__specialties-tags">
                    {therapyServices[activeService].specialties.map((specialty, index) => (
                      <span key={index} className="services__specialty-tag">
                        <div className="services__specialty-shimmer" />
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enhanced Coverage Areas */}
                <div className="services__coverage-section">
                  <h5 className="services__coverage-title">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="services__coverage-icon">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                    </svg>
                    Primary Coverage Areas
                  </h5>
                  <div className="services__coverage-tags">
                    {therapyServices[activeService].coverageHighlights.map((area, index) => (
                      <span key={index} className="services__coverage-tag">
                        <div className="services__tag-shimmer" />
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Integration Section - Fixed */}
        <div className={`services__technology ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="services__technology-header">
            <div className="services__technology-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3 className="services__technology-title">Technology Ready Professionals</h3>
            <p className="services__technology-subtitle">
              Our therapists are trained and ready to work with modern healthcare technology platforms
            </p>
          </div>
          
          <div className="services__technology-grid">
            {technologyFeatures.map((feature, index) => (
              <div key={index} className="services__technology-card">
                <div className="services__technology-card-icon">
                  {feature.icon}
                </div>
                <div className="services__technology-card-content">
                  <h4 className="services__technology-card-title">{feature.title}</h4>
                  <p className="services__technology-card-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Service Differentiators */}
        <div className={`services__differentiators ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="services__differentiators-header">
            <div className="services__differentiators-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="services__differentiators-title">Why us?</h3>
            <p className="services__differentiators-subtitle">
              At Motive Home Care, we pride ourselves on connecting you with the most dedicated and experienced physical, occupational and speech therapists in the Southern California region. 
              
              Our commitment to reliability and timely service ensures that you or your loved ones receive the highest quality care when it matters most. 
              
              We also offer Medicare Part B services for patients, providing comprehensive support tailored to your needs. 
              
              
              Choose us for our unwavering dedication to your well-being and our proven track record of excellence in home health care.


            </p>
          </div>
          
          <div className="services__differentiators-grid">
            {serviceDifferentiators.map((item, index) => (
              <div key={index} className="services__differentiator-card">
                <div className="services__differentiator-glass" />
                <div className="services__differentiator-icon">
                  {item.icon}
                  <div className="services__differentiator-icon-glow" />
                </div>
                <div className="services__differentiator-content">
                  <div className="services__differentiator-header">
                    <h4 className="services__differentiator-title">{item.title}</h4>
                    <span className="services__differentiator-highlight">
                      <div className="services__highlight-shimmer" />
                      {item.highlight}
                    </span>
                  </div>
                  <p className="services__differentiator-description">
                    {item.description}
                  </p>
                  {/* Enhanced Features List */}
                  <div className="services__differentiator-features">
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="services__feature-item">
                        <div className="services__feature-dot" />
                        <span className="services__feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Call-to-Action with Premium Design */}
        <div className={`services__cta ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="services__cta-background">
            <div className="services__cta-gradient" />
            <div className="services__cta-pattern" />
            <div className="services__cta-glow" />
          </div>
          
          <div className="services__cta-content">
            <div className="services__cta-text">
              <div className="services__cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="services__cta-title">
                Ready to Experience the Difference?
              </h3>
              <p className="services__cta-subtitle">
                Join hundreds of home health agencies who trust us for their therapy staffing needs. 
                Quality care, transparent process, accessible to all - that's our promise since 2023.
              </p>
            </div>
            
            <div className="services__cta-actions">
              <button className="services__cta-primary" onClick={() => window.location.href = '#contact'}>
                <div className="services__cta-primary-shimmer" />
                <span>Connect with Professionals</span>
                <div className="services__cta-arrow">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                </div>
              </button>
              
              <a href="tel:+12134950092" className="services__cta-secondary">
                <div className="services__cta-phone-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div className="services__cta-phone-content">
                  <span className="services__cta-phone-label">Call Us Now</span>
                  <span className="services__cta-phone-number">(213) 495-0092</span>
                </div>
              </a>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="services__trust-bar">
              <div className="services__trust-item">
                <div className="services__trust-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                </div>
                <span className="services__trust-text">Licensed & Insured</span>
              </div>
              <div className="services__trust-item">
                <div className="services__trust-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                </div>
                <span className="services__trust-text">Background Checked</span>
              </div>
              <div className="services__trust-item">
                <div className="services__trust-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 8.707 7.621a1 1 0 00-1.414 1.414l2.586 2.586a1 1 0 001.414 0l3.586-3.586a1 1 0 000-1.414z"/>
                  </svg>
                </div>
                <span className="services__trust-text">Same Day Response</span>
              </div>
              <div className="services__trust-item">
                <div className="services__trust-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  </svg>
                </div>
                <span className="services__trust-text">Transparent Process</span>
              </div>
              <div className="services__trust-item">
                <div className="services__trust-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                  </svg>
                </div>
                <span className="services__trust-text">Technology Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Promise Section */}
        <div className={`services__partnership ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="services__partnership-background">
            <div className="services__partnership-gradient" />
            <div className="services__partnership-pattern" />
          </div>
          
          <div className="services__partnership-content">
            <div className="services__partnership-header">
              <div className="services__partnership-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <path d="M20 8v6M23 11h-6"/>
                </svg>
              </div>
              <h3 className="services__partnership-title">Our Partnership Promise</h3>
              <p className="services__partnership-subtitle">
                Every home health agency deserves reliable, quality staffing solutions
              </p>
            </div>

            <div className="services__partnership-grid">
              <div className="services__partnership-card">
                <div className="services__partnership-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                </div>
                <div className="services__partnership-card-content">
                  <h4 className="services__partnership-card-title">Guaranteed Continuity</h4>
                  <p className="services__partnership-card-description">
                    Your patients will always have consistent care with our commitment to ongoing therapy relationships.
                  </p>
                </div>
              </div>

              <div className="services__partnership-card">
                <div className="services__partnership-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="services__partnership-card-content">
                  <h4 className="services__partnership-card-title">Quality Assurance</h4>
                  <p className="services__partnership-card-description">
                    Every therapist is thoroughly vetted, licensed, and committed to excellence in patient care.
                  </p>
                </div>
              </div>

              <div className="services__partnership-card">
                <div className="services__partnership-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <path d="M20 8v6M23 11h-6"/>
                  </svg>
                </div>
                <div className="services__partnership-card-content">
                  <h4 className="services__partnership-card-title">Accessible Partnership</h4>
                  <p className="services__partnership-card-description">
                    Open to all home health agencies - quality staffing shouldn't be limited by agency size.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;