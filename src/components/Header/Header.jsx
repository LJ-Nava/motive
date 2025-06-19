import React, { useState, useEffect, useRef } from 'react';
import '../styles/Header.scss';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownDimensions, setDropdownDimensions] = useState({});
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Cambiar estado cuando se hace scroll más de 50px
      setIsScrolled(scrollPosition > 50);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Premium Navigation Structure with Humble Language
  const navigationItems = [
    {
      label: 'Our Services',
      type: 'mega',
      id: 'services',
      icon: '🏥',
      sections: [
        {
          title: 'Therapy Specialists',
          icon: '👩‍⚕️',
          items: [
            { 
              name: 'Physical Therapy',
              description: 'Experienced PTs ready to help your patients across California',
              link: '/services/physical-therapy',
              highlight: 'Most Requested',
              stats: '300+ Available',
              icon: '🏃‍♂️'
            },
            { 
              name: 'Occupational Therapy',
              description: 'Skilled OTs dedicated to helping patients regain independence',
              link: '/services/occupational-therapy',
              highlight: 'High Demand',
              stats: '150+ Available',
              icon: '🧩'
            },
            { 
              name: 'Speech Therapy',
              description: 'Compassionate SLPs with proven track records in home health',
              link: '/services/speech-therapy',
              highlight: 'Available Now',
              stats: '100+ Available',
              icon: '🗣️'
            },
            { 
              name: 'Specialized Care',
              description: 'Pediatric, geriatric & specialty therapists for unique needs',
              link: '/services/specialized',
              highlight: 'Comprehensive',
              stats: '50+ Specialists',
              icon: '⭐'
            }
          ]
        },
        {
          title: 'What We Offer',
          icon: '💼',
          items: [
            { 
              name: 'Quick Placement',
              description: 'Fast response when you need coverage - we understand urgency',
              link: '/services/urgent',
              highlight: 'Same Day',
              stats: '2hr Response',
              icon: '🚨'
            },
            { 
              name: 'Quality Assurance',
              description: 'Thorough screening & background checks for your peace of mind',
              link: '/services/quality',
              highlight: 'Thorough Process',
              stats: '99.8% Success',
              icon: '🛡️'
            },
            { 
              name: 'Real-Time Updates',
              description: 'Track placements & get updates on your staffing needs',
              link: '/services/tracking',
              highlight: 'Transparent',
              stats: 'Live Dashboard',
              icon: '📊'
            }
          ]
        }
      ]
    },
    {
      label: 'For Agencies',
      type: 'mega',
      id: 'agencies',
      icon: '🏢',
      sections: [
        {
          title: 'Partner With Us',
          icon: '🤝',
          items: [
            { 
              name: 'Join Our Network',
              description: 'Connect with California\'s most dedicated therapy professionals',
              link: '/agencies/partner',
              highlight: 'Simple Process',
              stats: '100+ Partners',
              icon: '🌟'
            },
            { 
              name: 'Partnership Benefits',
              description: 'Priority placement & dedicated support for your success',
              link: '/agencies/benefits',
              highlight: 'Full Support',
              stats: 'Personal Service',
              icon: '👑'
            },
            { 
              name: 'Track Your Success',
              description: 'Clear metrics & insights to help you grow your business',
              link: '/agencies/analytics',
              highlight: 'Transparent',
              stats: 'Real-time Data',
              icon: '📈'
            }
          ]
        },
        {
          title: 'Tools & Support',
          icon: '🛠️',
          items: [
            { 
              name: 'Easy Management',
              description: 'Simple dashboard to manage placements & communicate needs',
              link: '/agencies/portal',
              highlight: 'User-Friendly',
              stats: 'Available 24/7',
              icon: '💻'
            },
            { 
              name: 'Personal Support',
              description: 'Dedicated account management - real people, real help',
              link: '/agencies/support',
              highlight: 'Human Touch',
              stats: 'Quick Response',
              icon: '🎯'
            },
            { 
              name: 'Stay Compliant',
              description: 'We handle licensing & regulatory requirements so you don\'t have to',
              link: '/agencies/compliance',
              highlight: 'Worry-Free',
              stats: '100% Compliant',
              icon: '🎓'
            }
          ]
        }
      ]
    },
    {
      label: 'For Therapists',
      type: 'mega',
      id: 'therapists',
      icon: '👩‍⚕️',
      sections: [
        {
          title: 'Find Great Opportunities',
          icon: '🚀',
          items: [
            { 
              name: 'Browse Opportunities',
              description: '500+ active positions across California - find what fits you',
              link: '/therapists/jobs',
              highlight: 'Always Growing',
              stats: '500+ Active',
              icon: '📍'
            },
            { 
              name: 'Fair Pay Calculator',
              description: 'See real market rates - we believe in transparent compensation',
              link: '/therapists/salary',
              highlight: 'Transparent',
              stats: 'Live Data',
              icon: '💰'
            },
            { 
              name: 'Grow Your Career',
              description: 'Professional development opportunities & continuing education support',
              link: '/therapists/career',
              highlight: 'Growth Path',
              stats: '50+ CEU Credits',
              icon: '📚'
            },
            { 
              name: 'Specialized Roles',
              description: 'Unique opportunities in pediatrics, geriatrics & specialized care',
              link: '/therapists/specialty',
              highlight: 'Specialized Care',
              stats: 'Great Pay',
              icon: '⭐'
            }
          ]
        },
        {
          title: 'Why Choose Us',
          icon: '🎁',
          items: [
            { 
              name: 'Fair Compensation',
              description: 'Market-rate pay with transparent pricing - no surprises',
              link: '/therapists/compensation',
              highlight: 'Fair Pay',
              stats: 'Market Rate+',
              icon: '💎'
            },
            { 
              name: 'Work-Life Balance',
              description: 'Choose your schedule, locations & preferences - you\'re in control',
              link: '/therapists/flexibility',
              highlight: 'Your Choice',
              stats: '100% Flexible',
              icon: '⏰'
            },
            { 
              name: 'Health & Wellness',
              description: 'Comprehensive health support & wellness programs included',
              link: '/therapists/wellness',
              highlight: 'Complete Coverage',
              stats: 'Full Benefits',
              icon: '🏥'
            },
            { 
              name: 'Supportive Community',
              description: 'Connect with peers, get mentorship & career guidance when needed',
              link: '/therapists/support',
              highlight: 'Strong Community',
              stats: 'Always Here',
              icon: '🤝'
            }
          ]
        }
      ]
    },
    {
      label: 'How It Works',
      type: 'simple',
      id: 'platform',
      icon: '🚀',
      items: [
        { 
          name: 'Smart Matching',
          description: 'We use smart algorithms to match the right therapist with the right agency',
          link: '/how-it-works/matching',
          highlight: 'Intelligent',
          icon: '🤖'
        },
        { 
          name: 'Live Updates',
          description: 'Real-time dashboard shows placement progress & success metrics',
          link: '/how-it-works/tracking',
          highlight: 'Real-Time',
          icon: '📊'
        },
        { 
          name: 'Mobile Ready',
          description: 'Complete mobile experience - manage everything from your phone',
          link: '/how-it-works/mobile',
          highlight: 'iOS & Android',
          icon: '📱'
        },
        { 
          name: 'Easy Integration',
          description: 'Connects seamlessly with your existing management systems',
          link: '/how-it-works/integration',
          highlight: 'Simple Setup',
          icon: '🔗'
        }
      ]
    },
    {
      label: 'Pricing',
      type: 'simple',
      id: 'pricing',
      icon: '💰',
      items: [
        { 
          name: 'Clear Pricing',
          description: 'Transparent, competitive rates with no hidden fees or surprises',
          link: '/pricing',
          highlight: 'No Hidden Fees',
          icon: '💎'
        },
        { 
          name: 'Enterprise Options',
          description: 'Custom pricing for large agencies & healthcare systems',
          link: '/pricing/enterprise',
          highlight: 'Volume Rates',
          icon: '🏢'
        },
        { 
          name: 'Cost Calculator',
          description: 'See potential savings & calculate your staffing costs',
          link: '/pricing/calculator',
          highlight: 'Instant Results',
          icon: '📊'
        },
        { 
          name: 'Free Consultation',
          description: 'No-pressure consultation to discuss your specific needs',
          link: '/pricing/consultation',
          highlight: 'No Pressure',
          icon: '🎯'
        }
      ]
    },
    {
      label: 'Coverage Areas',
      type: 'page',
      link: '/coverage-areas',
      icon: '📍'
    },
    {
      label: 'Resources',
      type: 'simple',
      id: 'resources',
      icon: '📚',
      items: [
        { 
          name: 'Industry Insights',
          description: 'Latest trends, salary data & market insights to help you succeed',
          link: '/resources/insights',
          highlight: 'Weekly Updates',
          icon: '📈'
        },
        { 
          name: 'Success Stories',
          description: 'Real experiences from agencies & therapists in our network',
          link: '/resources/stories',
          highlight: 'Inspiring',
          icon: '🌟'
        },
        { 
          name: 'Compliance Help',
          description: 'Regulatory updates & licensing requirements made simple',
          link: '/resources/compliance',
          highlight: 'Always Current',
          icon: '📋'
        },
        { 
          name: 'Learning Center',
          description: 'Webinars, training materials & professional development resources',
          link: '/resources/learning',
          highlight: 'CEU Credits',
          icon: '🎓'
        }
      ]
    },
    {
      label: 'About Us',
      type: 'simple',
      id: 'about',
      icon: '🏛️',
      items: [
        { 
          name: 'Our Story',
          description: 'Learn about our mission to support healthcare staffing in California',
          link: '/about/story',
          highlight: 'Since 2019',
          icon: '📖'
        },
        { 
          name: 'Our Team',
          description: '20+ years combined experience in healthcare & technology',
          link: '/about/team',
          highlight: 'Experienced',
          icon: '👥'
        },
        { 
          name: 'Why Choose Motive',
          description: 'Proven track record & genuine commitment to your success',
          link: '/about/why-choose-us',
          highlight: 'Trusted Partner',
          icon: '🏆'
        },
        { 
          name: 'Our Credentials',
          description: 'Licensed, bonded, insured & certified for your protection',
          link: '/about/certifications',
          highlight: 'Fully Certified',
          icon: '🥇'
        },
        { 
          name: 'In The News',
          description: 'Latest news, press coverage & industry recognition',
          link: '/about/press',
          highlight: 'Growing Recognition',
          icon: '📰'
        },
        { 
          name: 'Join Our Team',
          description: 'Help us shape the future of healthcare staffing in California',
          link: '/about/careers',
          highlight: 'We\'re Growing',
          icon: '💼'
        }
      ]
    }
  ];

  const handleNavClick = (item, index, event) => {
    if (item.type === 'page') return;
    
    event.preventDefault();
    event.stopPropagation();
    
    if (activeDropdown === index) {
      setActiveDropdown(null);
      return;
    }
    
    const target = event.currentTarget.getBoundingClientRect();
    const container = document.querySelector('.header__main').getBoundingClientRect();
    
    let width = 520;
    let height = 440;
    
    if (item.type === 'mega') {
      width = 760;
      height = 520;
    }
    
    const left = Math.max(20, Math.min(
      target.left - container.left + (target.width / 2) - (width / 2),
      window.innerWidth - width - 40
    ));
    
    setDropdownDimensions({ width, height, left });
    setActiveDropdown(index);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`} ref={headerRef}>
        {/* Trust-Building Top Bar */}
        

        {/* Premium Main Navigation */}
        <div className="header__main">
          <div className="header__container">
            {/* Refined Logo */}
            <a href="/" className="header__logo">
              <img 
                src="/logo.png" 
                alt="Motive Home Care" 
                className="header__logo-image"
              />
              <div className="header__brand">
                <span className="header__brand-name">Motive</span>
                <span className="header__brand-tagline">Connecting Care. Building Trust.</span>
              </div>
            </a>

            {/* Elegant Navigation */}
            <nav className="header__navigation">
              <ul className="header__nav-list">
                {navigationItems.map((item, index) => (
                  <li 
                    key={index} 
                    className="header__nav-item"
                  >
                    {item.type === 'page' ? (
                      <a href={item.link} className="header__nav-link">
                        <span className="header__nav-icon">{item.icon}</span>
                        {item.label}
                      </a>
                    ) : (
                      <button 
                        className={`header__nav-link header__nav-link--expandable ${activeDropdown === index ? 'header__nav-link--active' : ''}`}
                        onClick={(e) => handleNavClick(item, index, e)}
                      >
                        <span className="header__nav-icon">{item.icon}</span>
                        {item.label}
                        <svg className={`header__nav-chevron ${activeDropdown === index ? 'header__nav-chevron--open' : ''}`} width="10" height="6" viewBox="0 0 10 6">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Premium Actions */}
            <div className="header__actions">
              <a href="/therapists/portal" className="header__login">
                <svg width="16" height="16" viewBox="0 0 16 16" className="header__login-icon">
                  <path d="M8 8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                </svg>
                Therapist Portal
              </a>
              <a href="/contact" className="header__cta">
                <span>Get Started</span>
                <svg width="14" height="14" viewBox="0 0 14 14" className="header__cta-arrow">
                  <path d="M5 11L9 7L5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Mobile Toggle */}
            <button 
              className={`header__mobile-toggle ${isMobileMenuOpen ? 'header__mobile-toggle--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Enhanced Dropdown System */}
        <div 
          className={`header__dropdown ${activeDropdown !== null ? 'header__dropdown--visible' : ''}`}
          ref={dropdownRef}
        >
          <div 
            className="header__dropdown-background"
            style={{
              width: `${dropdownDimensions.width}px`,
              height: `${dropdownDimensions.height}px`,
              left: `${dropdownDimensions.left}px`
            }}
          >
            <div className="header__dropdown-arrow"></div>
          </div>
          
          <div 
            className="header__dropdown-content"
            style={{
              width: `${dropdownDimensions.width}px`,
              left: `${dropdownDimensions.left}px`
            }}
          >
            {activeDropdown !== null && navigationItems[activeDropdown] && (
              <div className="header__dropdown-inner">
                {navigationItems[activeDropdown].type === 'mega' ? (
                  <div className="header__mega-grid">
                    {navigationItems[activeDropdown].sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="header__mega-section">
                        <div className="header__section-header">
                          <span className="header__section-icon">{section.icon}</span>
                          <h4 className="header__section-title">{section.title}</h4>
                        </div>
                        <ul className="header__section-links">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <a href={item.link} className="header__section-link" onClick={closeDropdown}>
                                <div className="header__link-icon">{item.icon}</div>
                                <div className="header__link-content">
                                  <div className="header__link-header">
                                    <span className="header__link-name">{item.name}</span>
                                    <div className="header__link-meta">
                                      {item.highlight && (
                                        <span className="header__link-badge">{item.highlight}</span>
                                      )}
                                      {item.stats && (
                                        <span className="header__link-stats">{item.stats}</span>
                                      )}
                                    </div>
                                  </div>
                                  <span className="header__link-description">{item.description}</span>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="header__simple-grid">
                    <ul className="header__simple-links">
                      {navigationItems[activeDropdown].items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <a href={item.link} className="header__simple-link" onClick={closeDropdown}>
                            <div className="header__link-icon">{item.icon}</div>
                            <div className="header__link-content">
                              <div className="header__link-header">
                                <span className="header__link-name">{item.name}</span>
                                {item.highlight && (
                                  <span className="header__link-badge">{item.highlight}</span>
                                )}
                              </div>
                              <span className="header__link-description">{item.description}</span>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Premium Mobile Experience */}
        <div className={`header__mobile ${isMobileMenuOpen ? 'header__mobile--open' : ''}`}>
          <div className="header__mobile-content">
            <div className="header__mobile-header">
              <div className="header__mobile-logo-container">
                <img src="/logo.png" alt="Motive Home Care" className="header__mobile-logo" />
                <div className="header__mobile-brand">
                  <span className="header__mobile-brand-name">Motive</span>
                  <span className="header__mobile-brand-tag">Connecting Care</span>
                </div>
              </div>
              <button 
                className="header__mobile-close"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <nav className="header__mobile-nav">
              {navigationItems.map((item, index) => (
                <div key={index} className="header__mobile-group">
                  {item.type === 'page' ? (
                    <a 
                      href={item.link} 
                      className="header__mobile-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="header__mobile-link-icon">{item.icon}</span>
                      {item.label}
                    </a>
                  ) : (
                    <div className="header__mobile-expandable">
                      <button 
                        className="header__mobile-trigger"
                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                      >
                        <div className="header__mobile-trigger-content">
                          <span className="header__mobile-trigger-icon">{item.icon}</span>
                          {item.label}
                        </div>
                        <svg 
                          className={`header__mobile-chevron ${activeDropdown === index ? 'header__mobile-chevron--open' : ''}`}
                          width="10" height="6" viewBox="0 0 10 6"
                        >
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      
                      {activeDropdown === index && (
                        <div className="header__mobile-submenu">
                          {(item.type === 'mega') ? (
                            item.sections.map((section, sectionIndex) => (
                              <div key={sectionIndex} className="header__mobile-section">
                                <div className="header__mobile-section-header">
                                  <span className="header__mobile-section-icon">{section.icon}</span>
                                  <h5 className="header__mobile-section-title">{section.title}</h5>
                                </div>
                                {section.items.map((subItem, subIndex) => (
                                  <a 
                                    key={subIndex}
                                    href={subItem.link} 
                                    className="header__mobile-sublink"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <div className="header__mobile-link-wrapper">
                                      <div className="header__mobile-sublink-icon">{subItem.icon}</div>
                                      <div className="header__mobile-link-content">
                                        <div className="header__mobile-link-header">
                                          <span className="header__mobile-link-name">{subItem.name}</span>
                                          <div className="header__mobile-link-badges">
                                            {subItem.highlight && (
                                              <span className="header__mobile-link-badge">{subItem.highlight}</span>
                                            )}
                                            {subItem.stats && (
                                              <span className="header__mobile-link-stats">{subItem.stats}</span>
                                            )}
                                          </div>
                                        </div>
                                        <span className="header__mobile-link-desc">{subItem.description}</span>
                                      </div>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            ))
                          ) : (
                            <div className="header__mobile-simple-section">
                              {item.items.map((subItem, subIndex) => (
                                <a 
                                  key={subIndex}
                                  href={subItem.link} 
                                  className="header__mobile-sublink"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div className="header__mobile-link-wrapper">
                                    <div className="header__mobile-sublink-icon">{subItem.icon}</div>
                                    <div className="header__mobile-link-content">
                                      <div className="header__mobile-link-header">
                                        <span className="header__mobile-link-name">{subItem.name}</span>
                                        {subItem.highlight && (
                                          <span className="header__mobile-link-badge">{subItem.highlight}</span>
                                        )}
                                      </div>
                                      <span className="header__mobile-link-desc">{subItem.description}</span>
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="header__mobile-actions">
              <div className="header__mobile-emergency">
                <div className="header__mobile-emergency-label">
                  <span className="header__mobile-emergency-icon">🚨</span>
                  Need urgent staffing? We're here 24/7
                </div>
                <a href="tel:+12134950092" className="header__mobile-emergency-number">
                  📞 (213) 495-0092
                </a>
              </div>
              
              <div className="header__mobile-ctas">
                <a href="/therapists/portal" className="header__mobile-login">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="header__mobile-login-icon">
                    <path d="M8 8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                  </svg>
                  Therapist Portal
                </a>
                <a href="/contact" className="header__mobile-cta">
                  <span>Get Started Today</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" className="header__mobile-cta-arrow">
                    <path d="M5 11L9 7L5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              
              <div className="header__mobile-metrics">
                <div className="header__mobile-metrics-title">
                  🏆 Trusted Healthcare Staffing
                </div>
                <div className="header__mobile-metrics-grid">
                  <div className="header__mobile-metric">
                    <span className="header__mobile-metric-value">500+</span>
                    <span className="header__mobile-metric-label">Active Therapists</span>
                  </div>
                  <div className="header__mobile-metric">
                    <span className="header__mobile-metric-value">100+</span>
                    <span className="header__mobile-metric-label">Partner Agencies</span>
                  </div>
                  <div className="header__mobile-metric">
                    <span className="header__mobile-metric-value">99.8%</span>
                    <span className="header__mobile-metric-label">Success Rate</span>
                  </div>
                  <div className="header__mobile-metric">
                    <span className="header__mobile-metric-value">2hrs</span>
                    <span className="header__mobile-metric-label">Avg Response</span>
                  </div>
                </div>
                <div className="header__mobile-trust-message">
                  <p>We believe everyone deserves quality healthcare staffing solutions. That's why we work hard to connect the right people with the right opportunities, without the premium price tag.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="header__overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Premium Scroll Progress Indicator */}
        <div className="header__scroll-progress">
          <div 
            className="header__scroll-progress-bar"
            style={{
              transform: `scaleX(${Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1)})`
            }}
          />
        </div>

        {/* Floating Contact Widget */}
        <div className="header__floating-contact">
          <button className="header__floating-btn" title="Quick Contact">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5C3 3.89543 3.89543 3 5 3H15C16.1046 3 17 3.89543 17 5V12C17 13.1046 16.1046 14 15 14H8L3 17V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 7H13M7 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="header__floating-tooltip">
            <span>Need help? Chat with us!</span>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="header__accessibility" aria-hidden="true">
          <button className="header__accessibility-btn" title="Accessibility Options">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              <circle cx="8" cy="5" r="1" fill="currentColor"/>
              <path d="M8 7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Success Notification */}
        <div className="header__notification">
          <div className="header__notification-content">
            <span className="header__notification-icon">✨</span>
            <span className="header__notification-text">Welcome to Motive - Where great care meets great careers!</span>
          </div>
        </div>
      </header>
      
      {/* Header Spacer - Evita que el contenido se superponga */}
      <div className="header__spacer" />
    </>
  );
};

export default Header;