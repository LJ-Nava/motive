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
  const [showResult, setShowResult] = useState(false);

  // Handle ZIP code search
  const handleZipSearch = () => {
    if (zipCode.length === 5) {
      const result = checkZipCoverage(zipCode, activeService);
      setZipResult(result);
      setShowResult(true);

      // Auto-hide after 3 seconds if covered
      if (result) {
        setTimeout(() => {
          setShowResult(false);
        }, 3000);
      }
    }
  };

  // Reset ZIP result when service changes
  useEffect(() => {
    setZipResult(null);
    setShowResult(false);
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
        <div className="hero-background-pattern"></div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="badge-icon-svg">
                <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4zM8 14v3M12 14v3M16 14v3"/>
              </svg>
              <span>Home Health Therapy Coverage</span>
            </div>
            <h1 className="hero-title">
              Where We <span className="title-highlight">Serve</span>
            </h1>
            <p className="hero-description">
              Discover where our licensed therapists provide in-home care across Southern California.
              Whether you're a patient, caregiver, or agency — we're here to help.
            </p>

            {/* CTA Button */}
            <button
              className="hero-cta-button"
              onClick={() => document.querySelector('.coverage-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Explore Coverage Areas</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">300<span className="stat-plus">+</span></div>
                <div className="stat-label">Licensed Therapists</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">50<span className="stat-plus">+</span></div>
                <div className="stat-label">Cities We Serve</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="M2 12h20"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">15<span className="stat-plus">+</span></div>
                <div className="stat-label">Languages Spoken</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Coverage Section */}
      <section className="coverage-section">
        <div className="coverage-container">
          <div className="section-header">
            <span className="section-tag">Coverage Areas</span>
            <h2>Explore Our <span className="text-highlight">Service Coverage</span></h2>
            <p>Select a therapy type below to view our coverage map and check availability in your area.</p>
          </div>

          {/* Service Tabs */}
          <div className="service-tabs">
            <button
              className={`service-tab ${activeService === 'PT_OT' ? 'active' : ''}`}
              onClick={() => handleServiceChange('PT_OT')}
            >
              <div className="tab-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                  <path d="M12 11v6"/>
                  <path d="M9 14h6"/>
                </svg>
              </div>
              <div className="tab-content">
                <h3>Physical & Occupational Therapy</h3>
                <p>Licensed PTs/OTs & PTAs/COTAs</p>
              </div>
              <div className="tab-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </button>

            <button
              className={`service-tab ${activeService === 'ST' ? 'active' : ''}`}
              onClick={() => handleServiceChange('ST')}
            >
              <div className="tab-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </div>
              <div className="tab-content">
                <h3>Speech Therapy</h3>
                <p>Licensed SLPs</p>
              </div>
              <div className="tab-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </button>
          </div>

          {/* Help Link */}
          <div className="help-section">
            <p>Not sure which service you need?</p>
            <button
              className="help-link"
              onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Talk to our team
            </button>
          </div>

          {/* Large Map Display */}
          <div className="map-display">
            <div className="map-container">
              {/* Map Header */}
              <div className="map-header">
                <div className="map-header-content">
                  <div className="map-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="map-title">
                    <h3>{currentService.title} Coverage Map</h3>
                    <p>Areas where we have {currentService.subtitle.toLowerCase()} available</p>
                  </div>
                </div>
                <div className="map-header-badge">
                  <span className="badge-dot"></span>
                  <span>Live Coverage</span>
                </div>
              </div>

              {/* ZIP Code Lookup - Premium Design */}
              <div className="zip-lookup">
                <div className="zip-lookup-content">
                  <div className="zip-lookup-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>
                  <div className="zip-lookup-form">
                    <label htmlFor="zip-input">Check if we serve your area</label>
                    <div className="zip-input-group">
                      <input
                        id="zip-input"
                        type="text"
                        placeholder="Enter ZIP code"
                        value={zipCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                          setZipCode(value);
                          setZipResult(null);
                          setShowResult(false);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleZipSearch()}
                        maxLength={5}
                      />
                      <button onClick={handleZipSearch} disabled={zipCode.length !== 5}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        Check Coverage
                      </button>
                    </div>
                  </div>
                </div>
                {showResult && zipResult !== null && (
                  <div className={`zip-result ${zipResult ? 'covered' : 'not-covered'}`}>
                    {zipResult ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <span>We cover <strong>{zipCode}</strong> for {currentService.title.toLowerCase()}!</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="15" y1="9" x2="9" y2="15"/>
                          <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        <span>ZIP {zipCode} not covered — <button onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })} className="contact-link">contact us</button></span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Map Image */}
              <div className="large-map">
                <img
                  src={currentService.mapImage}
                  alt={`Coverage map showing licensed ${activeService === 'PT_OT' ? 'PT/OT' : 'Speech Therapy'} service areas across Southern California`}
                  className="map-image"
                />
              </div>

              {/* Counties Served */}
              <div className="counties-served">
                <div className="counties-header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="counties-label">Counties we serve:</span>
                </div>
                <div className="counties-list">
                  {ZIP_COVERAGE[activeService].counties.map((county) => (
                    <span key={county} className="county-tag">
                      {county}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expansion Notice */}
              <div className="expansion-notice">
                <div className="expansion-content">
                  <div className="expansion-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 6l-9.5 9.5-5-5L1 18"/>
                      <path d="M17 6h6v6"/>
                    </svg>
                  </div>
                  <div className="expansion-text">
                    <p>We're <strong>constantly expanding</strong> our coverage areas across Southern California.</p>
                    <span>Don't see your area? We may still be able to help — our network grows every month.</span>
                  </div>
                </div>
                <button
                  className="expansion-cta"
                  onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Check with us
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Languages Section - WOW Design */}
      <section className="languages-section">
        <div className="languages-container">
          {/* Header */}
          <div className="languages-header">
            <div className="languages-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span>Multilingual Care</span>
            </div>
            <h2>We Speak <span className="highlight">Your Language</span></h2>
            <p>Connecting patients with therapists who understand their culture and communicate in their native language.</p>
          </div>

          {/* Stats */}
          <div className="languages-stats">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Languages</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">300+</span>
              <span className="stat-label">Bilingual Therapists</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Patient-Centered</span>
            </div>
          </div>

          {/* Languages Display */}
          <div className="languages-showcase">
            {/* Primary Languages */}
            <div className="language-category primary">
              <div className="category-label">
                <div className="label-dot"></div>
                <span>Primary Languages</span>
              </div>
              <div className="language-cards">
                <div className="language-card featured">
                  <span className="lang-name">English</span>
                  <span className="lang-flag">🇺🇸</span>
                </div>
                <div className="language-card featured">
                  <span className="lang-name">Spanish</span>
                  <span className="lang-flag">🇲🇽</span>
                </div>
              </div>
            </div>

            {/* Asian Languages */}
            <div className="language-category">
              <div className="category-label">
                <div className="label-dot"></div>
                <span>Asian Languages</span>
              </div>
              <div className="language-cards">
                {[
                  { name: "Tagalog", flag: "🇵🇭" },
                  { name: "Korean", flag: "🇰🇷" },
                  { name: "Chinese", flag: "🇨🇳" },
                  { name: "Vietnamese", flag: "🇻🇳" },
                  { name: "Japanese", flag: "🇯🇵" },
                  { name: "Hindi", flag: "🇮🇳" },
                  { name: "Punjabi", flag: "🇮🇳" },
                  { name: "Bengali", flag: "🇧🇩" }
                ].map((lang, index) => (
                  <div key={index} className="language-card">
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-flag">{lang.flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Eastern Languages */}
            <div className="language-category">
              <div className="category-label">
                <div className="label-dot"></div>
                <span>Middle Eastern</span>
              </div>
              <div className="language-cards">
                {[
                  { name: "Arabic", flag: "🇸🇦" },
                  { name: "Farsi", flag: "🇮🇷" },
                  { name: "Armenian", flag: "🇦🇲" }
                ].map((lang, index) => (
                  <div key={index} className="language-card">
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-flag">{lang.flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* European Languages */}
            <div className="language-category">
              <div className="category-label">
                <div className="label-dot"></div>
                <span>European</span>
              </div>
              <div className="language-cards">
                {[
                  { name: "French", flag: "🇫🇷" },
                  { name: "Russian", flag: "🇷🇺" }
                ].map((lang, index) => (
                  <div key={index} className="language-card">
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-flag">{lang.flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="languages-cta">
            <p>Don't see your language? We have access to professional interpreters.</p>
            <button
              onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Request Language Support
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section - Premium Elegant Design */}
      <section id="contact-section" className="contact-section-premium">
        {/* Decorative Background Elements */}
        <div className="contact-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="contact-premium-container">
          {/* Section Header */}
          <div className="contact-header">
            <div className="header-badge">
              <div className="badge-glow"></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Get In Touch</span>
            </div>
            <h2>
              Don't See <span className="gradient-text">Your Area?</span>
            </h2>
            <p className="header-subtitle">
              We're constantly expanding our coverage. Reach out and let's find a solution together.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="contact-premium-grid">
            {/* Left Side - Features */}
            <div className="features-side">
              <div className="features-intro">
                <h3>Why Connect With Us?</h3>
                <p>We believe every patient deserves quality home health care. Our dedicated team is ready to help you find the right coverage.</p>
              </div>

              <div className="premium-features">
                <div className="premium-feature">
                  <div className="feature-icon-wrapper">
                    <div className="icon-bg"></div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  </div>
                  <div className="feature-info">
                    <h4>Lightning Fast Response</h4>
                    <p>Our staffing team responds within minutes, not hours</p>
                  </div>
                  <div className="feature-indicator">
                    <span>&lt; 5 min</span>
                  </div>
                </div>

                <div className="premium-feature">
                  <div className="feature-icon-wrapper">
                    <div className="icon-bg"></div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                  <div className="feature-info">
                    <h4>Personal Care Approach</h4>
                    <p>Real people who genuinely care about your needs</p>
                  </div>
                  <div className="feature-indicator">
                    <span>100%</span>
                  </div>
                </div>

                <div className="premium-feature">
                  <div className="feature-icon-wrapper">
                    <div className="icon-bg"></div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                  </div>
                  <div className="feature-info">
                    <h4>Trusted & Reliable</h4>
                    <p>Helping agencies stay compliant and accept more referrals</p>
                  </div>
                  <div className="feature-indicator">
                    <span>300+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Card */}
            <div className="contact-card-side">
              <div className="premium-contact-card">
                <div className="card-glow"></div>
                <div className="card-inner">
                  {/* Card Header */}
                  <div className="card-top">
                    <div className="card-icon-ring">
                      <div className="ring-pulse"></div>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div className="card-title">
                      <span className="title-label">Call Us Directly</span>
                      <h4>Let's Talk Coverage</h4>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <a href="tel:+12134950092" className="premium-phone-btn">
                    <span className="phone-number">(213) 495-0092</span>
                    <div className="btn-shine"></div>
                  </a>

                  {/* Status */}
                  <div className="status-row">
                    <div className="hours-info">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      <span>Mon-Fri 9AM-5PM | Sat 9AM-12PM PST</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="card-divider">
                    <span>or reach us via email</span>
                  </div>

                  {/* Email Option */}
                  <a href="mailto:hr@motivehomecare.com" className="email-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span>hr@motivehomecare.com</span>
                  </a>

                  {/* Trust Badge */}
                  <div className="trust-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span>Trusted by 50+ agencies across Southern California</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CoverageAreas;