import React, { useState, useEffect, useRef } from 'react';
import '../../styles/home/Services.scss';

// Import choose motive images
import specializedTherapyImg from '../../../assets/ChooseMotive/Specialized-Therapy-Staffing.png';
import rapidResponseImg from '../../../assets/ChooseMotive/Rapid-Response-Staffing.png';
import californiaCoverageImg from '../../../assets/ChooseMotive/California-Coverage.png';
import homeHealthExpertiseImg from '../../../assets/ChooseMotive/Home-Health-Expertise.png';


const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const servicesRef = useRef(null);

  // Testimonials anónimos - solo rol y región
  const testimonials = [
    {
      role: "PTA",
      region: "Southern California",
      quote: "Motive communicates clearly, respects schedules, and pays on time."
    },
    {
      role: "Home Health PT",
      region: "Southern California",
      quote: "Fast responses and realistic expectations compared to other staffing companies."
    },
    {
      role: "Occupational Therapist",
      region: "Los Angeles Area",
      quote: "Consistent referrals and respectful communication. They understand home health."
    },
    {
      role: "Speech Therapist",
      region: "Southern California",
      quote: "Finally a staffing partner that values work-life balance and responds quickly."
    },
    {
      role: "Home Health OT",
      region: "Southern California",
      quote: "Professional team that matches me with the right cases for my expertise."
    }
  ];

  // Beneficios con enfoque más humilde y auténtico
  const benefits = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      title: "Specialized Therapy Staffing",
      subtitle: "Expert PT, OT & ST professionals",
      description: "We specialize exclusively in therapy staffing, connecting home health agencies with licensed Physical, Occupational, and Speech Therapists across California.",
      image: specializedTherapyImg,
      accent: "#3b82f6"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      title: "Rapid Response Staffing",
      subtitle: "Fast Same-Day Staffing Support",
      description: "Our streamlined process ensures your therapy staffing needs are met quickly. We provide qualified PT, OT, and ST professionals when you need them most.",
      image: rapidResponseImg,
      accent: "#10b981"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: "California Coverage",
      subtitle: "Southern California Regional Coverage",
      description: "Comprehensive coverage across Los Angeles, Orange, San Bernardino, Riverside, and Ventura counties with local therapy professionals ready to serve.",
      image: californiaCoverageImg,
      accent: "#06b6d4"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      title: "Home Health Expertise",
      subtitle: "Home Health–Focused Care Teams",
      description: "Our therapists are experienced in home health settings, providing quality PT, OT, and ST services specifically for elderly patients in their homes.",
      image: homeHealthExpertiseImg,
      accent: "#f59e0b"
    }
  ];

  // Partículas premium más sofisticadas
  const PremiumParticles = () => {
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 15,
      duration: 20 + Math.random() * 15,
      size: 2 + Math.random() * 6,
      opacity: 0.1 + Math.random() * 0.3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: Math.random() > 0.7 ? 'premium' : 'basic'
    }));

    return (
      <div className="premium-particles">
        {particles.map((particle) => (
          <div 
            key={particle.id}
            className={`particle ${particle.type}`}
            style={{
              '--delay': `${particle.delay}s`,
              '--duration': `${particle.duration}s`,
              '--size': `${particle.size}px`,
              '--opacity': particle.opacity,
              '--x': `${particle.x}%`,
              '--y': `${particle.y}%`
            }}
          />
        ))}
        
        {/* Partículas de aura */}
        <div className="aura-particles">
          {Array.from({ length: 12 }, (_, i) => (
            <div 
              key={i}
              className="aura-particle"
              style={{
                '--delay': `${i * 2}s`,
                '--x': `${15 + i * 7}%`,
                '--y': `${20 + (i % 3) * 25}%`
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // Efecto de mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-cycle testimonials cada 7 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleAgencyClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'agency_button_click', {
        event_category: 'services',
        event_label: 'partner_with_us'
      });
    }

    // Scroll to top first
    window.scrollTo(0, 0);

    // Navigate to agencies page
    window.location.href = '#/agencies/join';
  };

  const handleTherapistClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'therapist_button_click', {
        event_category: 'services',
        event_label: 'join_our_community'
      });
    }

    // Scroll to top first
    window.scrollTo(0, 0);

    // Navigate to therapists page
    window.location.href = '#/therapists/apply';
  };

  return (
    <section className={`premium-services ${isVisible ? 'visible' : ''}`} id="services" ref={servicesRef}>
      <PremiumParticles />
      
      {/* Cursor premium effect */}
      <div 
        className="premium-cursor"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      />
      
      <div className="premium-services__container">
        
        {/* Benefits Section */}
        <div className="premium-services__benefits">
          <div className="premium-services__benefits-header">
            <div className="premium-services__badge">
              <div className="badge-glow"></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span>YOUR TRUSTED HOME HEALTH PARTNER</span>
              <div className="badge-shimmer"></div>
            </div>
            
            <h2 className="premium-services__benefits-title">
              <span className="title-word">Why</span>{' '}
              <span className="title-word">Home health</span>{' '}
              <span className="title-highlight">Professionals</span>{' '}
              <span className="title-word">Choose</span>{' '}
              <span className="title-word">Motive</span>
            </h2>
            
            <p className="premium-services__benefits-subtitle">
              We believe in treating everyone with dignity and respect. Our approach is simple: we listen, we care, and we work together to create opportunities that make a real difference in people's lives.
            </p>

            <div className="premium-services__values-list">
              <p className="premium-services__values-title">What clinicians actually value:</p>
              <ul className="premium-services__values-items">
                <li>Flexible schedules</li>
                <li>Fast, responsive support</li>
                <li>Consistent local referrals</li>
              </ul>
              <p className="premium-services__values-bridge">
                When clinicians feel supported, agencies receive better outcomes and faster coverage.
              </p>
            </div>
          </div>

          {/* Therapist-facing line */}
          <p className="premium-services__therapist-line">
            Built to support clinicians with flexible schedules, fair pay, and fast communication.
          </p>

          {/* Benefits Grid Premium */}
          <div className="premium-services__benefits-grid">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="premium-services__benefit-card"
                style={{
                  '--delay': `${index * 0.15}s`,
                  '--accent-color': benefit.accent
                }}
              >
                <div className="card-aura"></div>
                <div className="card-border-glow"></div>
                
                <div className="premium-services__benefit-visual">
                  <div className="premium-services__benefit-image">
                    <img src={benefit.image} alt={benefit.title} />
                    <div className="image-overlay"></div>
                    <div className="image-grain"></div>
                  </div>
                  
                </div>
                
                <div className="premium-services__benefit-content">
                  <div className="premium-services__benefit-icon">
                    {benefit.icon}
                  </div>
                  
                  <h3 className="premium-services__benefit-title">{benefit.title}</h3>
                  <p className="premium-services__benefit-subtitle" style={{ color: benefit.accent }}>
                    {benefit.subtitle}
                  </p>
                  <p className="premium-services__benefit-description">{benefit.description}</p>
                  
                  <div className="benefit-shine"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Section Premium */}
          <div className="premium-services__testimonials">
            <div className="premium-services__testimonials-header">
              <h3 className="premium-services__testimonials-title">
                Stories from Our Community
              </h3>
              <p className="premium-services__testimonials-subtitle">
                Real experiences from real people who are part of the Motive family
              </p>
            </div>
            
            <div className="premium-services__testimonial-carousel">
              <div className="testimonial-background-glow"></div>
              
              <div className="premium-services__testimonial-card">
                <div className="premium-services__testimonial-content">
                  <svg className="premium-services__quote-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>

                  <div className="premium-services__testimonial-quote">
                    <p className="quote-text">{testimonials[activeTestimonial].quote}</p>
                  </div>

                  <div className="premium-services__testimonial-attribution">
                    <span className="premium-services__attribution-text">
                      — {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].region}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="premium-services__testimonial-indicators">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`premium-services__indicator ${index === activeTestimonial ? 'active' : ''}`}
                  >
                    <div className="indicator-fill"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section Premium */}
        <div id="motive-difference" className="premium-services__cta">
          <div className="cta-cosmic-bg"></div>
          
          <div className="premium-services__cta-background">
            <img 
              src="https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Home health therapy professionals collaborating in modern American facility" 
              className="premium-services__cta-hero-image"
            />
            <div className="premium-services__cta-overlay" />
            <div className="cta-grid-pattern"></div>
          </div>
          
          <div className="premium-services__cta-content">
            <div className="premium-services__cta-header">
              <div className="premium-services__cta-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span>START YOUR JOURNEY</span>
              </div>
              
              <h2 className="premium-services__cta-title">
                <span className="cta-word">Ready</span>{' '}
                <span className="cta-word">to</span>{' '}
                <span className="cta-word">Experience</span>{' '}
                <span className="cta-word">the</span>{' '}
                <span className="premium-services__title-highlight">Motive Difference</span>
                <span className="cta-word">?</span>
              </h2>
              
              <p className="premium-services__cta-subtitle">
                Whether you're a home health facility looking for dedicated professionals or a therapist seeking meaningful opportunities, we're here to help you succeed. Let's build something great together.
              </p>
            </div>
            
            <div className="premium-services__cta-options">
              <div className="premium-services__cta-option">
                <div className="option-glow agency-glow"></div>
                
                <div className="premium-services__option-header">
                  <div className="premium-services__option-icon">
                    <div className="icon-orbit"></div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    <div className="icon-spark"></div>
                  </div>
                  <div className="premium-services__option-badge">For Home Health Agencies</div>
                </div>
                
                <h3 className="premium-services__option-title">Partner With Us</h3>
                <p className="premium-services__option-description">
                  Connect with compassionate, skilled therapy professionals who share your commitment to excellent patient care.
                </p>
                
                <div className="premium-services__option-features">
                  <div className="premium-services__feature">
                    <span className="feature-check">✓</span>
                    Licensed & background-verified professionals
                  </div>
                  <div className="premium-services__feature">
                    <span className="feature-check">✓</span>
                    Responsive, personal service
                  </div>
                  <div className="premium-services__feature">
                    <span className="feature-check">✓</span>
                    Ongoing partnership support
                  </div>
                  <div className="premium-services__feature">
                    <span className="feature-check">✓</span>
                    Transparent communication
                  </div>
                </div>
                
                <button 
                  onClick={handleAgencyClick}
                  className="premium-services__option-button primary"
                >
                  <div className="button-energy"></div>
                  <span>Start Partnership</span>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                  <div className="button-shine"></div>
                </button>
              </div>

              <div className="premium-services__cta-option">
                <div className="option-glow therapist-glow"></div>
                
                <div className="premium-services__option-header">
                  <div className="premium-services__option-icon">
                    <div className="icon-orbit"></div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <div className="icon-spark"></div>
                  </div>
                  <div className="premium-services__option-badge">For Therapy Professionals</div>
                </div>
                
                <h3 className="premium-services__option-title">Join Our Team</h3>
                <p className="premium-services__option-description">
                  Discover opportunities where your skills and compassion can make a real difference in people's lives.
                </p>
                <p className="premium-services__option-tagline">
                  Local referrals. Predictable scheduling. Responsive support.
                </p>

                <div className="premium-services__option-features">
                  <div className="premium-services__feature">
                    <span className="feature-check">✓</span>
                    Meaningful work opportunities
                  </div>
                  <div className="premium-services__feature">
                    <span className="feature-check">✓</span>
                    Fair compensation packages
                  </div>
                  <div className="premium-services__feature">
                    <span className="feature-check">✓</span>
                    Professional development support
                  </div>
                  <div className="premium-services__feature">
                    <span className="feature-check">✓</span>
                    Flexible scheduling options
                  </div>
                </div>
                
                <button 
                  onClick={handleTherapistClick}
                  className="premium-services__option-button secondary"
                >
                  <div className="button-energy"></div>
                  <span>Explore Opportunities</span>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                  <div className="button-shine"></div>
                </button>
              </div>
            </div>

            {/* Contact Section Premium */}
            <div className="premium-services__cta-contact">
              <div className="contact-aurora"></div>
              <div className="premium-services__contact-info">
                <p className="premium-services__contact-text">
                  Have questions? We'd love to hear from you.
                </p>
                <a href="tel:+12134950092" className="premium-services__contact-phone">
                  <div className="phone-pulse"></div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>(213) 495-0092</span>
                  <div className="phone-glow"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;