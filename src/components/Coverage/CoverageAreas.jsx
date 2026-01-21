import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Home/Header/Header.jsx';
import '../styles/coverage/CoverageAreas.scss';
import MapaPT from '../../assets/MapaPT.png';
import MapaST from '../../assets/MapaST.png';

// ZIP code ranges by county for coverage lookup
// These are specific areas where we have active coverage
const ZIP_COVERAGE = {
  PT_OT: {
    counties: ['Los Angeles', 'Orange', 'Riverside', 'San Bernardino', 'Ventura', 'San Diego'],
    // ZIP code ranges for PT/OT coverage - broader coverage
    zipRanges: [
      // Los Angeles County - Central, South, East, West
      { start: 90001, end: 90089 }, // Downtown, South LA
      { start: 90201, end: 90280 }, // Southeast LA (Bell, Huntington Park, etc.)
      { start: 90301, end: 90312 }, // Inglewood area
      { start: 90401, end: 90411 }, // Santa Monica
      { start: 90501, end: 90510 }, // Torrance
      { start: 90601, end: 90670 }, // Whittier, La Mirada area
      { start: 90701, end: 90749 }, // Long Beach area
      { start: 91001, end: 91108 }, // Pasadena area
      { start: 91201, end: 91226 }, // Glendale
      { start: 91301, end: 91399 }, // West San Fernando Valley
      { start: 91401, end: 91499 }, // Central San Fernando Valley
      { start: 91501, end: 91526 }, // Burbank
      { start: 91601, end: 91618 }, // North Hollywood
      { start: 91701, end: 91799 }, // Rancho Cucamonga, Upland (SB County edge)
      // Orange County
      { start: 92602, end: 92626 }, // Irvine
      { start: 92647, end: 92649 }, // Huntington Beach
      { start: 92701, end: 92708 }, // Santa Ana
      { start: 92801, end: 92808 }, // Anaheim
      // Riverside County
      { start: 92501, end: 92509 }, // Riverside city
      { start: 92553, end: 92557 }, // Moreno Valley
      // San Bernardino County
      { start: 92335, end: 92339 }, // Fontana
      { start: 92401, end: 92415 }, // San Bernardino city
      // Ventura County
      { start: 93001, end: 93012 }, // Ventura city
      { start: 93021, end: 93023 }, // Moorpark
      // San Diego County (north portion only)
      { start: 92024, end: 92029 }, // Encinitas, Escondido
    ]
  },
  ST: {
    counties: ['Los Angeles'],
    // ZIP code ranges for ST coverage - West/South LA beach cities area
    zipRanges: [
      // Beverly Hills
      { start: 90210, end: 90213 },
      // Santa Monica
      { start: 90401, end: 90411 },
      // Inglewood
      { start: 90301, end: 90312 },
      // Hawthorne
      { start: 90250, end: 90251 },
      // Torrance
      { start: 90501, end: 90510 },
      // Long Beach (north and central)
      { start: 90802, end: 90815 },
      { start: 90840, end: 90840 },
      // Redondo Beach
      { start: 90277, end: 90278 },
      // Hermosa Beach
      { start: 90254, end: 90254 },
      // Manhattan Beach
      { start: 90266, end: 90266 },
      // Lawndale
      { start: 90260, end: 90261 },
      // Westchester
      { start: 90045, end: 90045 },
      // El Segundo
      { start: 90245, end: 90245 },
    ]
  }
};

const checkZipCoverage = (zip, service) => {
  const zipNum = parseInt(zip, 10);
  if (isNaN(zipNum) || zip.length !== 5) return null;

  const serviceData = ZIP_COVERAGE[service];
  const isCovered = serviceData.zipRanges.some(
    range => zipNum >= range.start && zipNum <= range.end
  );
  return isCovered;
};

const CoverageAreas = () => {
  const location = useLocation();
  const [activeService, setActiveService] = useState('PT_OT');
  const [zipCode, setZipCode] = useState('');
  const [zipResult, setZipResult] = useState(null); // null, true, or false

  // Handle ZIP code search
  const handleZipSearch = () => {
    if (zipCode.length === 5) {
      const result = checkZipCoverage(zipCode, activeService);
      setZipResult(result);
    }
  };

  // Reset ZIP result when service changes
  useEffect(() => {
    setZipResult(null);
  }, [activeService]);

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
              <span>Home Health Therapy Coverage</span>
            </div>
            <h1 className="hero-title">
              Where We
              <span className="title-gradient"> Serve</span>
            </h1>
            <p className="hero-description">
              Discover where our licensed therapists provide in-home care across Southern California.
              Whether you're a patient, caregiver, or agency — we're here to help.
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

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>View Coverage Maps</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </section>

      {/* Main Coverage Section */}
      <section className="coverage-section">
        <div className="coverage-container">
          <div className="section-header">
            <h2>Explore Our Home Health Therapy Coverage Areas</h2>
            <p>Select a service below to view coverage maps or contact us for assistance.</p>
            <button
              className="help-link"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Not sure? Talk to our team
            </button>
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

              {/* ZIP Code Lookup */}
              <div className="zip-lookup">
                <label htmlFor="zip-input">Enter your ZIP code to check coverage</label>
                <div className="zip-input-group">
                  <input
                    id="zip-input"
                    type="text"
                    placeholder="e.g. 90210"
                    value={zipCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                      setZipCode(value);
                      setZipResult(null);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleZipSearch()}
                    maxLength={5}
                  />
                  <button onClick={handleZipSearch} disabled={zipCode.length !== 5}>
                    Check
                  </button>
                </div>
                {zipResult !== null && (
                  <div className={`zip-result ${zipResult ? 'covered' : 'not-covered'}`}>
                    {zipResult ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <span>Great news! We provide {currentService.title.toLowerCase()} services in your area.</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="15" y1="9" x2="9" y2="15"/>
                          <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        <span>We don't currently cover this ZIP code for {currentService.title.toLowerCase()}, but <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="contact-link">contact us</button> — we may still be able to help!</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="large-map">
                <img
                  src={currentService.mapImage}
                  alt={`Coverage map showing licensed ${activeService === 'PT_OT' ? 'PT/OT' : 'Speech Therapy'} service areas across Southern California`}
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

              {/* Counties Served */}
              <div className="counties-served">
                <span className="counties-label">Counties served:</span>
                <div className="counties-list">
                  {ZIP_COVERAGE[activeService].counties.map((county, index) => (
                    <span key={county} className="county-tag">
                      {county} County{index < ZIP_COVERAGE[activeService].counties.length - 1 ? '' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Languages Section */}
      <section className="languages-section">
        <div className="languages-container">
          <h3>We Speak Your Language</h3>
          <p>Our team serves families in all these languages.</p>

          <div className="languages-grouped">
            <div className="language-group">
              <span className="group-label">Common</span>
              <div className="languages-grid">
                {["English", "Spanish"].map((language, index) => (
                  <div key={index} className="language-tag">{language}</div>
                ))}
              </div>
            </div>

            <div className="language-group">
              <span className="group-label">Asian Languages</span>
              <div className="languages-grid">
                {["Tagalog", "Korean", "Chinese (Cantonese)", "Vietnamese", "Japanese", "Hindi", "Punjabi", "Bengali"].map((language, index) => (
                  <div key={index} className="language-tag">{language}</div>
                ))}
              </div>
            </div>

            <div className="language-group">
              <span className="group-label">Middle Eastern</span>
              <div className="languages-grid">
                {["Arabic", "Farsi", "Armenian"].map((language, index) => (
                  <div key={index} className="language-tag">{language}</div>
                ))}
              </div>
            </div>

            <div className="language-group">
              <span className="group-label">European</span>
              <div className="languages-grid">
                {["French", "Russian"].map((language, index) => (
                  <div key={index} className="language-tag">{language}</div>
                ))}
              </div>
            </div>
          </div>

          <button
            className="interpreter-cta"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Need an interpreter? Contact us
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="contact-section">
        <div className="contact-container">
          <div className="contact-content">
            <div className="contact-text">
              <h2>Don't See Your Area?</h2>
              <p className="subheadline">We're expanding and want to help.</p>
              <p>
                If you need coverage in your area or have questions about our services,
                just give us a call. We believe every patient deserves quality care,
                and we'll work with you to find a solution.
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
                <span>Mon–Fri 9 AM–5:30 PM, Sat 9 AM–12 PM PT</span>
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