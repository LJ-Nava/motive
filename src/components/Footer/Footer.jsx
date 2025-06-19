import React from 'react';
import '../styles/Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Our Services', href: '#services' },
    { label: 'For Agencies', href: '#agencies' },
    { label: 'For Therapists', href: '#therapists' },
    { label: 'About Us', href: '#about' }
  ];

  const services = [
    { label: 'Physical Therapy', href: '#pt' },
    { label: 'Occupational Therapy', href: '#ot' },
    { label: 'Speech Therapy', href: '#st' }
  ];

  return (
    <footer className="footer" id="contact">
      {/* Main Footer Content */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Company Info */}
            <div className="footer__section footer__section--company">
              <div className="footer__logo">
                <img src="/logo.svg" alt="Motive Home Care" className="footer__logo-img" />
                <div className="footer__logo-text">
                  <span className="footer__logo-main">Motive</span>
                  <span className="footer__logo-sub">Home Care</span>
                </div>
              </div>
              <p className="footer__description">
                We strive to connect dedicated clinicians with home health agencies throughout the Los Angeles region.
              </p>
              <div className="footer__social">
                <a 
                  href="https://linkedin.com/company/motivehomecare" 
                  className="footer__social-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__section">
              <h3 className="footer__section-title">Quick Links</h3>
              <ul className="footer__links">
                {quickLinks.map((link, index) => (
                  <li key={index} className="footer__link-item">
                    <a 
                      href={link.href} 
                      className="footer__link"
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({
                            behavior: 'smooth'
                          });
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer__section">
              <h3 className="footer__section-title">Services</h3>
              <ul className="footer__links">
                {services.map((service, index) => (
                  <li key={index} className="footer__link-item">
                    <a href={service.href} className="footer__link">
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer__section">
              <h3 className="footer__section-title">Get In Touch</h3>
              <div className="footer__contact">
                <div className="footer__contact-grid">
                  <div className="footer__contact-item">
                    <div className="footer__contact-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div className="footer__contact-info">
                      <a href="tel:+12134950092" className="footer__contact-value">
                        (213) 495-0092
                      </a>
                      <span className="footer__contact-label">Phone</span>
                    </div>
                  </div>

                  <div className="footer__contact-item">
                    <div className="footer__contact-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.98L12 10.56l9.382-6.74h.982c.904 0 1.636.732 1.636 1.636z"/>
                      </svg>
                    </div>
                    <div className="footer__contact-info">
                      <a href="mailto:info@motivehomecare.com" className="footer__contact-value">
                        info@motivehomecare.com
                      </a>
                      <span className="footer__contact-label">Email</span>
                    </div>
                  </div>

                  <div className="footer__contact-item">
                    <div className="footer__contact-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div className="footer__contact-info">
                      <span className="footer__contact-value">Los Angeles, CA</span>
                      <span className="footer__contact-label">Location</span>
                    </div>
                  </div>

                  <div className="footer__contact-item">
                    <div className="footer__contact-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                    </div>
                    <div className="footer__contact-info">
                      <span className="footer__contact-value">Mon - Fri, 9AM - 6PM</span>
                      <span className="footer__contact-label">Business Hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <div className="footer__bottom-left">
              <p className="footer__copyright">
                © {currentYear} Motive Home Care. All rights reserved.
              </p>
              <div className="footer__legal">
                <a href="#privacy" className="footer__legal-link">Privacy Policy</a>
                <a href="#terms" className="footer__legal-link">Terms of Service</a>
              </div>
            </div>
            <div className="footer__bottom-right">
              <p className="footer__tagline">
                Connecting Care. Building Trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;