import React, { useState, useEffect, useRef } from 'react';
import '../styles/Network.scss';

const Network = () => {
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const rotationRef = useRef(0);
  const autoRotateRef = useRef(null);

  // Home Health agencies data - our trusted clients
  const homeHealthAgencies = [
    { 
      name: 'Supportive Care', 
      patients: '1,000+', 
      since: '2023', 
      percentage: '23.5%',
      website: 'supportivecare.com',
      color: '#4F46E5',
      gradientFrom: '#4F46E5',
      gradientTo: '#7C3AED',
      totalPatients: '1,000+ Patients Served',
      satisfaction: '99.2% Satisfaction'
    },
    { 
      name: 'Unison Health', 
      patients: '600+', 
      since: '2022', 
      percentage: '13.9%',
      website: 'unisonhealth.com',
      color: '#2563EB',
      gradientFrom: '#2563EB',
      gradientTo: '#3B82F6',
      totalPatients: '600+ Patients Served',
      satisfaction: '97.8% Satisfaction'
    },
    { 
      name: 'IntraCare Solutions', 
      patients: '350+', 
      since: '2022', 
      percentage: '8.0%',
      website: 'intracarehh.com',
      color: '#3B82F6',
      gradientFrom: '#3B82F6',
      gradientTo: '#06B6D4',
      totalPatients: '350+ Patients Served',
      satisfaction: '98.5% Satisfaction'
    },
    { 
      name: 'Caring Like Family', 
      patients: '240+', 
      since: '2021', 
      percentage: '5.5%',
      website: 'caringlikefamily.com',
      color: '#1D4ED8',
      gradientFrom: '#1D4ED8',
      gradientTo: '#2563EB',
      totalPatients: '240+ Patients Served',
      satisfaction: '96.7% Satisfaction'
    },
    { 
      name: 'Bright Home Health', 
      patients: '210+', 
      since: '2021', 
      percentage: '4.8%',
      website: 'brighthomehealth.com',
      color: '#1E40AF',
      gradientFrom: '#1E40AF',
      gradientTo: '#3730A3',
      totalPatients: '210+ Patients Served',
      satisfaction: '95.9% Satisfaction'
    },
    { 
      name: 'Americare', 
      patients: '190+', 
      since: '2020', 
      percentage: '4.5%',
      website: 'americare.com',
      color: '#1E3A8A',
      gradientFrom: '#1E3A8A',
      gradientTo: '#1E40AF',
      totalPatients: '190+ Patients Served',
      satisfaction: '94.3% Satisfaction'
    },
    { 
      name: 'Happy Home Health', 
      patients: '135+', 
      since: '2021', 
      percentage: '3.1%',
      website: 'happyhh.com',
      color: '#312E81',
      gradientFrom: '#312E81',
      gradientTo: '#4338CA',
      totalPatients: '135+ Patients Served',
      satisfaction: '97.1% Satisfaction'
    },
    { 
      name: 'Vast Home Health', 
      patients: '90+', 
      since: '2022', 
      percentage: '2.0%',
      website: 'vasthh.com',
      color: '#3730A3',
      gradientFrom: '#3730A3',
      gradientTo: '#5B21B6',
      totalPatients: '90+ Patients Served',
      satisfaction: '93.8% Satisfaction'
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

  const getAgencyLogo = (agency) => {
    return agency.name.split(' ').map(word => word[0]).join('');
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
              <div className="stat-number">8,500+</div>
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
              <div className="stat-number">24hrs</div>
              <div className="stat-label">Avg Response Time</div>
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
            {/* Center Hub */}


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
                    
                    {/* Logo */}
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
                          <div className="logo-initials">
                            {getAgencyLogo(agency)}
                          </div>
                          <div className="logo-sparkle"></div>
                        </div>
                        <div className="logo-ambient-light"></div>
                      </div>
                    </div>
                    
                    {/* Agency Info - Simple version */}
                    <div className="agency-info">
                      <div className="agency-header">
                        <h3 className="agency-name">{agency.name}</h3>
                      </div>
                      
                      <div className="agency-content">
                        <div className="main-metric">
                          <div className="metric-icon">👥</div>
                          <div className="metric-text">{agency.totalPatients}</div>
                        </div>
                        <div className="satisfaction-badge">
                          <div className="satisfaction-icon">✨</div>
                          <span>{agency.satisfaction}</span>
                        </div>
                        <div className="partnership-info">
                          <span className="since">Client since {agency.since}</span>
                        </div>
                        <div className="website-link">
                          <a href={`https://${agency.website}`} target="_blank" rel="noopener noreferrer">
                            🌐 {agency.website}
                          </a>
                        </div>
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
              <button className="cta-btn primary">
                <span className="btn-text">Get Started</span>
                <div className="btn-effects"></div>
                <div className="btn-ripple"></div>
              </button>
              
              <button className="cta-btn secondary">
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