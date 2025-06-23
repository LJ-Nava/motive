import React, { useState, useEffect, useRef } from 'react';
import '../../styles/home/Network.scss';

const Network = () => {
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const rotationRef = useRef(0);
  const autoRotateRef = useRef(null);

  // Home Health agencies data - REAL AGENCY INFORMATION
  const homeHealthAgencies = [
    { 
      name: 'Caring Like Family',
      shortName: 'CLF',
      patients: '300+',
      since: '2004',
      website: 'caringlikefamily.com',
      phone: '(310) 395-4788',
      address: '4223 Glencoe Ave, Suite B-107, Marina Del Rey, CA 90292',
      color: '#4F46E5',
      gradientFrom: '#4F46E5',
      gradientTo: '#7C3AED',
      logo: 'https://hcai.ca.gov/wp-content/themes/oshpd/assets/images/ca-logo-color.svg'
    },
    { 
      name: 'Intracare Home Health Providers',
      shortName: 'IHHP',
      patients: '250+',
      since: '2002',
      website: 'intracareinc.com',
      phone: '(323) 964-0884',
      address: '4929 Wilshire Blvd #210, Los Angeles, CA 90010',
      color: '#2563EB',
      gradientFrom: '#2563EB',
      gradientTo: '#3B82F6',
      logo: 'https://intracareinc.com/images/ICHHPInc.-Logo1248.png'
    },
    { 
      name: 'Unison Health Services',
      shortName: 'UHS',
      patients: '200+',
      since: '2018',
      website: 'unisonhealthservicesinc.com',
      phone: '(626) 280-5575',
      address: '2200 S Fremont Ave Suite 202, Alhambra, CA 91803',
      color: '#3B82F6',
      gradientFrom: '#3B82F6',
      gradientTo: '#06B6D4',
      logo: 'https://static.wixstatic.com/media/7438d9_91426f0fdd6945f7b74208a602d45cc2~mv2.png/v1/crop/x_0,y_1077,w_3125,h_971/fill/w_267,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Unison%20Logo%20deliver-01.png'
    },
    { 
      name: 'Supportive Health Group',
      shortName: 'SHG',
      patients: '180+',
      since: '2013',
      website: 'supportivehealthgroup.com',
      phone: 'Contact via website',
      address: '2700 N. Main Street, Suite 765, Santa Ana, CA 92705',
      color: '#1D4ED8',
      gradientFrom: '#1D4ED8',
      gradientTo: '#2563EB',
      logo: 'https://supportivehealthgroup.com/wp-content/uploads/2023/04/qt_q_55-removebg-preview.png'
    },
    { 
      name: 'Vast Home Health',
      shortName: 'VHH',
      patients: '150+',
      since: '2019',
      website: 'vasthh.com',
      phone: '(818) 309-4441',
      address: '1821 W. Verdugo Blvd. #101, Burbank, CA 91506',
      color: '#1E40AF',
      gradientFrom: '#1E40AF',
      gradientTo: '#3730A3',
      logo: 'https://vasthh.com/wp-content/uploads/2022/10/logo.png'
    },
    { 
      name: 'Happy Home Health Services',
      shortName: 'HHHS',
      patients: '120+',
      since: '2007',
      website: 'Contact for website',
      phone: '(626) 254-9999',
      address: '650 W Duarte Rd Ste 402, Arcadia, CA 91007',
      color: '#1E3A8A',
      gradientFrom: '#1E3A8A',
      gradientTo: '#1E40AF',
      logo: '/images/agencies/happy-home-health-fallback.png' // Fallback since no website found
    },
    { 
      name: 'Americare Home Health',
      shortName: 'AHH',
      patients: '100+',
      since: '2020',
      website: 'americarehhinc.com',
      phone: 'Contact via website',
      address: 'Van Nuys, California',
      color: '#312E81',
      gradientFrom: '#312E81',
      gradientTo: '#4338CA',
      logo: 'https://www.americarehhinc.com/wp-content/themes/americarehh/images/main-logo.png'
    },
    { 
      name: 'Bright Home Health Care',
      shortName: 'BHHC',
      patients: '80+',
      since: '2020',
      website: 'brighthhc.com',
      phone: '(818) 330-5599',
      address: 'California (Multiple locations)',
      color: '#3730A3',
      gradientFrom: '#3730A3',
      gradientTo: '#5B21B6',
      logo: '/images/agencies/bright-home-health-fallback.png' // Need to get actual logo
    }
  ];

  // Auto rotation
  useEffect(() => {
    if (isAutoRotating) {
      autoRotateRef.current = setInterval(() => {
        rotationRef.current += 0.06;
        setRotation(rotationRef.current);
      }, 50);
    } else {
      clearInterval(autoRotateRef.current);
    }

    return () => clearInterval(autoRotateRef.current);
  }, [isAutoRotating]);

  // Mouse interaction handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - mousePosition.x;
    rotationRef.current += deltaX * 0.12;
    setRotation(rotationRef.current);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  const handleCTAClick = (action) => {
    if (action === 'get_started') {
      // Direct call functionality
      window.location.href = 'tel:+12134950092';
    }
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'network_section',
        event_label: action
      });
    }
  };

  return (
    <div className="network-section">
      {/* Background */}
      <div className="network-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
        <div className="gradient-orb orb-5"></div>
        <div className="network-grid"></div>
        <div className="floating-particles"></div>
        <div className="light-rays"></div>
      </div>

      <div className="network-container">
        {/* Header */}
        <div className="network-header">
          <div className="trust-badge">
            <div className="badge-shimmer"></div>
            <span className="badge-icon">🤝</span>
            <span>Trusted Network</span>
            <div className="badge-glow"></div>
          </div>
          <h2 className="network-title">
            Partnered
            <span className="title-gradient"> home health agencies</span>
          </h2>
          <p className="network-subtitle">
            These home health agencies trusted us to connect their patients with qualified therapists quickly and efficiently. Together, we're making healthcare more accessible.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-container">
              <div className="stat-icon">🏥</div>
              <div className="icon-glow"></div>
            </div>
            <div className="stat-content">
              <div className="stat-number">8+</div>
              <div className="stat-label">Trusted Clients</div>
            </div>
            <div className="card-shimmer"></div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-container">
              <div className="stat-icon">👥</div>
              <div className="icon-glow"></div>
            </div>
            <div className="stat-content">
              <div className="stat-number">1,280+</div>
              <div className="stat-label">Patients Helped</div>
            </div>
            <div className="card-shimmer"></div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-container">
              <div className="stat-icon">💯</div>
              <div className="icon-glow"></div>
            </div>
            <div className="stat-content">
              <div className="stat-number">98.5%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="card-shimmer"></div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-container">
              <div className="stat-icon">⚡</div>
              <div className="icon-glow"></div>
            </div>
            <div className="stat-content">
              <div className="stat-number">&lt;2hrs</div>
              <div className="stat-label">Response Time</div>
            </div>
            <div className="card-shimmer"></div>
          </div>
        </div>

        {/* 3D Carousel */}
        <div className="carousel-container" ref={containerRef}>
          <div 
            className="carousel-stage"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            {/* Agency Cards */}
            {homeHealthAgencies.map((agency, index) => {
              const angle = (360 / homeHealthAgencies.length) * index;
              const currentAngle = angle - rotation;
              const normalizedAngle = ((currentAngle % 360) + 360) % 360;
              
              let distanceFromCenter = Math.abs(normalizedAngle - 180);
              if (distanceFromCenter > 180) distanceFromCenter = 360 - distanceFromCenter;
              
              const maxDistance = 180;
              const distanceRatio = distanceFromCenter / maxDistance;
              const scale = 1.1 - (distanceRatio * 0.6);
              const opacity = 1 - (distanceRatio * 0.3);
              const zDistance = 400 + (distanceRatio * 800);
              const blur = distanceRatio * 1.2;
              
              const maxOffset = 900;
              const xOffset = Math.sin((normalizedAngle * Math.PI) / 180) * maxOffset;
              
              const isFront = distanceFromCenter < 45;
              
              return (
                <div
                  key={agency.name}
                  className={`agency-card ${isFront ? 'front-card' : 'back-card'}`}
                  style={{
                    '--agency-color': agency.color,
                    '--agency-gradient-from': agency.gradientFrom,
                    '--agency-gradient-to': agency.gradientTo,
                    transform: `translate3d(${xOffset}px, 0px, ${zDistance}px) scale(${scale})`,
                    opacity: opacity,
                    filter: `blur(${blur}px)`,
                    zIndex: Math.round((1 - distanceRatio) * 100),
                    pointerEvents: isFront ? 'auto' : 'none'
                  }}
                >
                  <div className="card-container">
                    {/* Card Background */}
                    <div className="card-background">
                      <div className="glass-layer"></div>
                      <div className="gradient-overlay"></div>
                      <div className="holographic-film"></div>
                      <div className="depth-layer-1"></div>
                      <div className="depth-layer-2"></div>
                      <div className="light-refraction"></div>
                      <div className="card-border"></div>
                      <div className="floating-sparkles"></div>
                    </div>
                    
                    {/* Logo Section - Improved */}
                    <div className="logo-section">
                      <div className="logo-container">
                        <div className="logo-3d-wrapper">
                          <div className="logo-shadow"></div>
                          <div className="logo-rings">
                            <div className="logo-ring ring-1"></div>
                            <div className="logo-ring ring-2"></div>
                            <div className="logo-ring ring-3"></div>
                          </div>
                          <div className="logo-content">
                            <div className="logo-glow-bg"></div>
                            {/* Real logo image with fallback to initials */}
                            <div className="logo-image-container">
                              <img 
                                src={agency.logo} 
                                alt={`${agency.name} logo`}
                                className="agency-logo-img"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="logo-initials-fallback" style={{ display: 'none' }}>
                                {agency.shortName}
                              </div>
                            </div>
                            <div className="logo-sparkle"></div>
                          </div>
                          <div className="logo-ambient-light"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Agency Info - Redesigned */}
                    <div className="agency-info">
                      <div className="agency-header">
                        <h3 className="agency-name">{agency.name}</h3>
                      </div>
                      
                      <div className="agency-stats">
                        {/* Patients Served */}
                        <div className="stat-item">
                          <div className="stat-icon">👥</div>
                          <div className="stat-details">
                            <div className="stat-number">{agency.patients}</div>
                            <div className="stat-label">Patients Served</div>
                          </div>
                        </div>
                        
                        {/* Partnership Duration */}
                        <div className="stat-item">
                          <div className="stat-icon">🤝</div>
                          <div className="stat-details">
                            <div className="stat-number">Since {agency.since}</div>
                            <div className="stat-label">Trusted Partner</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Website Link */}
                      <div className="website-section">
                        <a 
                          href={`https://${agency.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="website-link"
                        >
                          <div className="link-icon">🌐</div>
                          <div className="link-text">{agency.website}</div>
                          <div className="link-arrow">→</div>
                        </a>
                      </div>
                    </div>
                    
                    {/* Connection Lines */}
                    <div className="connection-lines">
                      <div className="connection-line line-1">
                        <div className="line-pulse"></div>
                      </div>
                      <div className="connection-line line-2">
                        <div className="line-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-background-effects">
            <div className="cta-gradient-1"></div>
            <div className="cta-gradient-2"></div>
            <div className="cta-particles"></div>
            <div className="cta-waves"></div>
          </div>
          
          <div className="cta-content">
            <h3 className="cta-title">Join Our Growing Network</h3>
            <p className="cta-subtitle">
              Connect with qualified therapists and help your patients get the care they need faster. 
              We're here to support your home health agency's success.
            </p>
            
            <div className="cta-buttons">
              <button 
                className="cta-btn primary"
                onClick={() => handleCTAClick('get_started')}
              >
                <span className="btn-text">Get Started Today</span>
                <div className="btn-effects"></div>
                <div className="btn-ripple"></div>
              </button>
              
              <button 
                className="cta-btn secondary"
                onClick={() => handleCTAClick('learn_more')}
              >
                <span className="btn-text">Learn More</span>
                <div className="btn-effects"></div>
                <div className="btn-ripple"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;