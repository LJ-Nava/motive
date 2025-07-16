import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../styles/home/Header.scss';
import LogoMini from '../../../assets/motive_logo_black_text_transparent.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const navigationItems = [
    {
      label: 'Our Services',
      type: 'page',
      link: '/',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z'
    },
    {
      label: 'Agencies',
      type: 'page',
      link: '/agencies/join',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    },
    {
      label: 'Therapists',
      type: 'page', 
      link: '/therapists/apply',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
    {
      label: 'Coverage Areas',
      type: 'page',
      link: '/coverage-areas',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      label: 'About Us',
      type: 'page',
      link: '/about',
      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  const servicesData = {
    pt: {
      name: 'Physical Therapy',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      professionals: '150+',
      response: '<2hrs',
      specialties: [
        'Post-surgical rehabilitation',
        'Neurological recovery', 
        'Home safety assessments',
        'Equipment training',
        'Patient education',
        'Consistent care continuity'
      ]
    },
    ot: {
      name: 'Occupational Therapy',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      professionals: '75+',
      response: '<2hrs',
      specialties: [
        'Daily living skills training',
        'Cognitive rehabilitation',
        'Home modification assessments',
        'Adaptive equipment training',
        'Work conditioning programs',
        'Fall prevention strategies'
      ]
    },
    slp: {
      name: 'Speech Therapy',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      professionals: '50+',
      response: '<2hrs',
      specialties: [
        'Swallowing disorders treatment',
        'Speech articulation therapy',
        'Language development support',
        'Voice rehabilitation',
        'Cognitive communication therapy',
        'AAC device training'
      ]
    }
  };

  const handleServiceClick = (serviceKey) => {
    if (selectedService === serviceKey) {
      setSelectedService(null);
    } else {
      setSelectedService(serviceKey);
    }
  };

  const handleBackToServices = () => {
    setSelectedService(null);
  };

  const handleNavClick = (item, event) => {
    event.preventDefault();
    navigate(item.link);
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  const handleCTAClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'header',
        event_label: 'get_started_main'
      });
    }
    navigate('/');
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  const handleLoginClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'login_click', {
        event_category: 'header',
        event_label: 'therapysync_portal'
      });
    }
    window.open('https://mhc-therapysync.com/', '_blank', 'noopener,noreferrer');
  };

  const handleMobileNavClick = (item) => {
    setIsMobileMenuOpen(false);
    navigate(item.link);
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  const handleLogoClick = () => {
    navigate('/');
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`} ref={headerRef}>
        
        <div className="header__main">
          <div className="header__container">
            
            <button 
              onClick={handleLogoClick}
              className="header__logo"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <img 
                src={LogoMini} 
                alt="Motive Home Care - Professional Healthcare Staffing" 
                className="header__logo-image"
                loading="eager"
              />
              <div className="header__brand">
                <span className="header__brand-tagline">Connecting Care. Building Trust.</span>
              </div>
            </button>

            <nav className="header__navigation">
              <ul className="header__nav-list">
                {navigationItems.map((item, index) => (
                  <li key={index} className="header__nav-item">
                    <button 
                      onClick={(e) => handleNavClick(item, e)}
                      className="header__nav-link"
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        color: 'inherit',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--header-space-2)',
                        padding: 'var(--header-space-3) var(--header-space-4)',
                        borderRadius: 'var(--header-radius-md)',
                        transition: 'all var(--header-transition-base)',
                        fontSize: '0.95rem',
                        fontWeight: '600'
                      }}
                      aria-label={`Navigate to ${item.label}`}
                    >
                      <div className="header__nav-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d={item.icon} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header__actions">
              <button 
                className="header__login"
                onClick={handleLoginClick}
                aria-label="Access TherapySync Portal"
              >
                <div className="header__login-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10,17 15,12 10,7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                </div>
                <span>Login</span>
              </button>
            </div>

            <button 
              className={`header__mobile-toggle ${isMobileMenuOpen ? 'header__mobile-toggle--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <div className={`header__mobile ${isMobileMenuOpen ? 'header__mobile--open' : ''}`}>
          <div className="header__mobile-content">
            
            <div className="header__mobile-header">
              <div className="header__mobile-logo-container">
                <img src={LogoMini} alt="Motive Home Care" className="header__mobile-logo" />
                <div className="header__mobile-brand">
                  <span className="header__mobile-brand-tag">Connecting Care</span>
                </div>
              </div>
              <button 
                className="header__mobile-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <nav className="header__mobile-nav">
              {navigationItems.map((item, index) => (
                <div key={index} className="header__mobile-group">
                  <button 
                    className="header__mobile-link"
                    onClick={() => handleMobileNavClick(item)}
                    style={{
                      background: 'none',
                      border: 'none',
                      width: '100%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--header-space-4)',
                      color: 'var(--header-gray-900)',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '1.125rem',
                      padding: 'var(--header-space-5) var(--header-space-6)',
                      transition: 'all var(--header-transition-base)',
                      position: 'relative',
                      textAlign: 'left'
                    }}
                  >
                    <div className="header__mobile-link-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d={item.icon} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>{item.label}</span>
                  </button>
                </div>
              ))}
            </nav>

            {/* SECCIÓN DE SERVICIOS OPTIMIZADA */}
            <div className="header__mobile-services">
              <div className="header__mobile-services-header">
                <h3>Our Specialties</h3>
                <p>Expert professionals ready to help - click to learn more</p>
              </div>

              <div className="header__mobile-services-container">
                {/* Servicios visibles */}
                <div className="header__mobile-services-grid">
                  {Object.entries(servicesData).map(([key, service]) => (
                    <button
                      key={key}
                      className={`header__mobile-service-card ${
                        selectedService && selectedService !== key ? 'header__mobile-service-card--hidden' : ''
                      } ${
                        selectedService === key ? 'header__mobile-service-card--selected' : ''
                      }`}
                      onClick={() => handleServiceClick(key)}
                    >
                      <div className="header__mobile-service-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d={service.icon} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="header__mobile-service-content">
                        <h4>{service.name}</h4>
                        <div className="header__mobile-service-stats">
                          <span>{service.professionals} Professionals</span>
                          <span>{service.response} Response</span>
                        </div>
                      </div>
                      <div className="header__mobile-service-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Especialidades - aparecen en el espacio de las tarjetas ocultas */}
                {selectedService && (
                  <div className="header__mobile-specialties">
                    <button 
                      className="header__mobile-back-button"
                      onClick={handleBackToServices}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                      <span>Back to Services</span>
                    </button>

                    <h5>{servicesData[selectedService].name} Key Specialties</h5>
                    <ul className="header__mobile-specialties-list">
                      {servicesData[selectedService].specialties.map((specialty, index) => (
                        <li key={index} className="header__mobile-specialty-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 13l4 4L19 7"/>
                          </svg>
                          <span>{specialty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="header__mobile-actions">
              <button 
                className="header__mobile-login"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLoginClick();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                <span>Access Portal</span>
              </button>
              
              <button 
                className="header__mobile-cta"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleCTAClick();
                }}
              >
                <span>Start Today</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              
              <div className="header__mobile-contact">
                <a href="tel:+12134950092" className="header__mobile-phone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>(213) 495-0092</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div 
            className="header__overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

      </header>
      
      <div className="header__spacer" />
    </>
  );
};

export default Header;