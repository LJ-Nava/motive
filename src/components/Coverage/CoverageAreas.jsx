import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Home/Header/Header.jsx';
import '../styles/coverage/CoverageAreas.scss';
import MapaPT from '../../assets/MapaPT.png';
import MapaST from '../../assets/MapaST.png';

const CoverageAreas = () => {
  const location = useLocation();
  const [activeService, setActiveService] = useState('PT_OT');

  // Obtener el servicio de los parámetros de búsqueda de la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const service = searchParams.get('service');

    // Mapear los IDs de servicio a los códigos esperados
    const serviceMap = {
      'pt': 'PT_OT',
      'ot': 'PT_OT',
      'slp': 'ST',
      'st': 'ST'
    };

    if (service && serviceMap[service.toLowerCase()]) {
      setActiveService(serviceMap[service.toLowerCase()]);
    }
  }, [location]);

  // Coverage data organized by service
  const coverageByService = {
    PT_OT: {
      title: "Physical & Occupational Therapy",
      subtitle: "Licensed PTs/OTs & PTAs/COTAs",
      color: "#3B82F6",
      mapImage: MapaPT
    },
    ST: {
      title: "Speech Therapy",
      subtitle: "Licensed SLPs",
      color: "#10B981",
      mapImage: MapaST
    }
  };

  const serviceOrder = ['PT_OT', 'ST'];
  const currentService = coverageByService[activeService];

  const handleServiceChange = (service) => {
    setActiveService(service);
  };

  return (
    <div className="elegant-coverage-page">
      <Header />
      
      {/* Hero Section */}
      <section className="coverage-hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <div className="badge-icon">🏥</div>
              <span>Serving California with Care</span>
            </div>
            <h1 className="hero-title">
              Where We
              <span className="title-gradient"> Serve</span>
            </h1>
            <p className="hero-description">
              We're here to connect skilled therapists with agencies across Southern California. 
              Every connection we make helps bring quality care directly to patients' homes.
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">300+</div>
              <div className="stat-label">Licensed Therapists</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities We Serve</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Languages Spoken</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Coverage Section */}
      <section className="coverage-section">
        <div className="coverage-container">
          <div className="section-header">
            <h2>Our Coverage Areas</h2>
            <p>Click on any therapy service below to explore where we can help</p>
          </div>

          {/* Service Tabs */}
          <div className="service-tabs">
            {serviceOrder.map((service) => {
              const serviceData = coverageByService[service];
              return (
                <button
                  key={service}
                  className={`service-tab ${activeService === service ? 'active' : ''}`}
                  onClick={() => handleServiceChange(service)}
                  style={{ '--service-color': serviceData.color }}
                >
                  <div className="tab-header">
                    <h3>{serviceData.title}</h3>
                    <p>{serviceData.subtitle}</p>
                  </div>
                  {serviceData.stats && (
                    <div className="tab-stats">
                      <span className="stat">{serviceData.stats.therapists}</span>
                      <span className="stat">{serviceData.stats.counties}</span>
                      <span className="stat">{serviceData.stats.response}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Large Map Display */}
          <div className="map-display">
            <div className="map-container">
              <div className="map-header">
                <div className="map-title">
                  <h3>{currentService.title} Coverage Map</h3>
                  <p>Areas where we have {currentService.subtitle.toLowerCase()} available</p>
                </div>
              </div>
              
              <div className="large-map">
                <img 
                  src={currentService.mapImage} 
                  alt={`${currentService.title} Coverage Areas across Southern California`}
                  className="map-image"
                />
                <div 
                  className="map-overlay"
                  style={{ backgroundColor: `${currentService.color}08` }}
                ></div>
                
                {/* Map Stats Overlay */}
                {currentService.stats && (
                  <div className="map-stats">
                    <div className="stat-pill">
                      <span className="value">{currentService.stats.therapists}</span>
                      <span className="label">Available</span>
                    </div>
                    <div className="stat-pill">
                      <span className="value">{currentService.stats.response}</span>
                      <span className="label">Response</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Languages Section */}
      <section className="languages-section">
        <div className="languages-container">
          <h3>We Speak Your Language</h3>
          <p>Our diverse team helps us connect with patients and families from all backgrounds</p>
          <div className="languages-grid">
            {[
              "English", "Spanish", "Tagalog", "Korean", "Chinese (Cantonese)", 
              "French", "Armenian", "Russian", "Vietnamese", "Japanese", 
              "Arabic", "Farsi", "Hindi", "Punjabi", "Bengali"
            ].map((language, index) => (
              <div key={index} className="language-tag">
                {language}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-content">
            <div className="contact-text">
              <h2>Don't See Your Area?</h2>
              <p>
                We're always growing and would love to help. If you need coverage in your area 
                or have questions about our services, just give us a call. We believe every 
                patient deserves quality care, and we'll work with you to find a solution.
              </p>
              
              <div className="contact-features">
                <div className="feature">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div className="feature-content">
                    <h4>Quick Response</h4>
                    <p>Our staffing team will have a response within minutes</p>
                  </div>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                      <path d="M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                  </div>
                  <div className="feature-content">
                    <h4>Personal Touch</h4>
                    <p>You'll speak with real people who care about your needs</p>
                  </div>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <div className="feature-content">
                    <h4>Reliable Service</h4>
                    <p>We help home health agencies stay compliant, avoid missed visits and accept more referrals</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="card-header">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <h4>Let's Talk</h4>
              </div>
              
              <p>Call us and we'll help you find the right therapy coverage for your area</p>
              
              <a href="tel:+12134950092" className="phone-button">
                (213) 495-0092
              </a>
              
              <div className="availability">
                <div className="availability-dot"></div>
                <div className="availability-times">
                  <span>Available Monday-Friday, 9AM-5:30PM PST</span>
                  <span>Saturday, 9AM-12nn PST</span>
                </div>
              </div>
              
              <div className="alternative-contact">
                <span>Prefer email?</span>
                <a href="mailto:hr@motivehomecare.com" className="email-link">
                  hr@motivehomecare.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CoverageAreas;