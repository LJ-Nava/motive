import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/home/Services.scss';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const servicesRef = useRef(null);
  const navigate = useNavigate();

  // Testimonials más diversos y humildes
  const testimonials = [
    {
      name: "Maria Gonzalez",
      role: "Physical Therapist",
      company: "Community Health Center",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "Motive helped me find meaningful work where I can truly make a difference in people's lives. The team treats everyone with respect and genuine care.",
      location: "Los Angeles, CA"
    },
    {
      name: "David Kim",
      role: "Occupational Therapist", 
      company: "Senior Care Facility",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "What I appreciate most is how Motive listens to what matters to me as a therapist. They understand that we're all in this together.",
      location: "San Diego, CA"
    },
    {
      name: "Jennifer Torres",
      role: "Speech Language Pathologist",
      company: "Pediatric Therapy Center",
      image: "https://images.unsplash.com/photo-1594824804732-ca8d76052d6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "Working with Motive feels like being part of a supportive community. They've helped me grow professionally while staying true to my values.",
      location: "Orange County, CA"
    },
    {
      name: "Michael Johnson",
      role: "Physical Therapist Assistant",
      company: "Rehabilitation Hospital",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "Motive connected me with opportunities I never knew existed. They see potential in everyone and help you reach it.",
      location: "Riverside, CA"
    },
    {
      name: "Sarah Chen",
      role: "Occupational Therapist",
      company: "Home Health Agency",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "The personal touch at Motive is incredible. They remember your name, your goals, and actually care about your success.",
      location: "Bakersfield, CA"
    }
  ];

  // Beneficios con enfoque más humilde y auténtico
  const benefits = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      title: "Personal Connection",
      subtitle: "We treat everyone like family",
      description: "Every conversation matters to us. We take time to understand your unique situation, goals, and what truly matters to you in your career journey.",
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      accent: "#3b82f6"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: "Quality Care Matching",
      subtitle: "The right fit for everyone",
      description: "We believe in careful, thoughtful matches. Our team works hard to connect therapists with opportunities where they can thrive and make a real difference.",
      image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      accent: "#8b5cf6"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: "Ongoing Support",
      subtitle: "We're here when you need us",
      description: "From your first conversation to ongoing career growth, our team is committed to being a resource you can count on. Your success is our success.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      accent: "#06b6d4"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
      title: "Professional Growth",
      subtitle: "Growing together as a community",
      description: "We believe everyone deserves opportunities to learn and advance. We're committed to helping you build the career you envision for yourself.",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      accent: "#f59e0b"
    }
  ];

  // Partículas más sutiles y elegantes
  const ElegantParticles = () => {
    return (
      <div className="elegant-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className={`particle particle-${i + 1}`}
            style={{
              '--delay': `${i * 0.5}s`,
              '--duration': `${15 + Math.random() * 10}s`,
              '--size': `${3 + Math.random() * 5}px`,
              '--opacity': Math.random() * 0.3 + 0.1
            }}
          />
        ))}
      </div>
    );
  };

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

  // Auto-cycle testimonials cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleAgencyClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'agency_button_click', {
        event_category: 'services',
        event_label: 'partner_with_us'
      });
    }
    
    // Navigate to agencies page
    navigate('/agencies/join');
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleTherapistClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'therapist_button_click', {
        event_category: 'services',
        event_label: 'join_our_community'
      });
    }
    
    // Navigate to therapists page
    navigate('/therapists/apply');
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <section className="humble-services" id="services" ref={servicesRef}>
      <ElegantParticles />
      
      <div className="humble-services__container">
        
        {/* Why Choose Section */}
        <div className={`humble-services__benefits ${isVisible ? 'fade-in' : ''}`}>
          <div className="humble-services__benefits-header">
            <div className="humble-services__badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span>Built on Care & Respect</span>
            </div>
            <h2 className="humble-services__benefits-title">
              Why Healthcare <span className="humble-services__title-highlight">Professionals</span> Choose Motive
            </h2>
            <p className="humble-services__benefits-subtitle">
              We believe in treating everyone with dignity and respect. Our approach is simple: we listen, we care, and we work together to create opportunities that make a real difference in people's lives.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="humble-services__benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="humble-services__benefit-card">
                <div className="humble-services__benefit-visual">
                  <div className="humble-services__benefit-image">
                    <img src={benefit.image} alt={benefit.title} />
                    <div 
                      className="humble-services__benefit-overlay" 
                      style={{ backgroundColor: benefit.accent, opacity: 0.1 }}
                    />
                  </div>
                </div>
                
                <div className="humble-services__benefit-content">
                  <div 
                    className="humble-services__benefit-icon"
                    style={{ borderColor: benefit.accent }}
                  >
                    {benefit.icon}
                  </div>
                  <h3 className="humble-services__benefit-title">{benefit.title}</h3>
                  <p className="humble-services__benefit-subtitle" style={{ color: benefit.accent }}>
                    {benefit.subtitle}
                  </p>
                  <p className="humble-services__benefit-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Section */}
          <div className="humble-services__testimonials">
            <div className="humble-services__testimonials-header">
              <h3 className="humble-services__testimonials-title">
                Stories from Our Community
              </h3>
              <p className="humble-services__testimonials-subtitle">
                Real experiences from real people who are part of the Motive family
              </p>
            </div>
            
            <div className="humble-services__testimonial-carousel">
              <div className="humble-services__testimonial-card">
                <div className="humble-services__testimonial-content">
                  <div className="humble-services__testimonial-quote">
                    <svg className="humble-services__quote-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                    <p>"{testimonials[activeTestimonial].quote}"</p>
                  </div>
                  
                  <div className="humble-services__testimonial-author">
                    <div className="humble-services__author-image">
                      <img src={testimonials[activeTestimonial].image} alt={testimonials[activeTestimonial].name} />
                    </div>
                    <div className="humble-services__author-info">
                      <h4 className="humble-services__author-name">{testimonials[activeTestimonial].name}</h4>
                      <p className="humble-services__author-role">{testimonials[activeTestimonial].role}</p>
                      <p className="humble-services__author-company">{testimonials[activeTestimonial].company}</p>
                      <p className="humble-services__author-location">{testimonials[activeTestimonial].location}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="humble-services__testimonial-indicators">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`humble-services__indicator ${index === activeTestimonial ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className={`humble-services__cta ${isVisible ? 'fade-in' : ''}`}>
          <div className="humble-services__cta-background">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Healthcare professionals collaborating in modern facility" 
              className="humble-services__cta-hero-image"
            />
            <div className="humble-services__cta-overlay" />
          </div>
          
          <div className="humble-services__cta-content">
            <div className="humble-services__cta-header">
              <div className="humble-services__cta-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span id='formlol'>Join Our Community</span>
              </div>
              <h2 className="humble-services__cta-title">
                Ready to Experience the 
                <span className="humble-services__title-highlight"> Motive Difference</span>?
              </h2>
              <p className="humble-services__cta-subtitle">
                Whether you're a healthcare facility looking for dedicated professionals or a therapist seeking meaningful opportunities, we're here to help you succeed. Let's build something great together.
              </p>
            </div>
            
            <div className="humble-services__cta-options">
              <div className="humble-services__cta-option">
                <div className="humble-services__option-header">
                  <div className="humble-services__option-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div className="humble-services__option-badge">For Healthcare Agencies</div>
                </div>
                
                <h3 className="humble-services__option-title">Partner With Us</h3>
                <p className="humble-services__option-description">
                  Connect with compassionate, skilled therapy professionals who share your commitment to excellent patient care.
                </p>
                
                <div className="humble-services__option-features">
                  <div className="humble-services__feature">✓ Carefully screened professionals</div>
                  <div className="humble-services__feature">✓ Responsive, personal service</div>
                  <div className="humble-services__feature">✓ Ongoing partnership support</div>
                  <div className="humble-services__feature">✓ Transparent communication</div>
                </div>
                
                <button 
                  onClick={handleAgencyClick}
                  className="humble-services__option-button primary"
                >
                  Start Partnership
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                </button>
              </div>

              <div className="humble-services__cta-option">
                <div className="humble-services__option-header">
                  <div className="humble-services__option-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div className="humble-services__option-badge">For Therapy Professionals</div>
                </div>
                
                <h3 className="humble-services__option-title">Join Our Team</h3>
                <p className="humble-services__option-description">
                  Discover opportunities where your skills and compassion can make a real difference in people's lives.
                </p>
                
                <div className="humble-services__option-features">
                  <div className="humble-services__feature">✓ Meaningful work opportunities</div>
                  <div className="humble-services__feature">✓ Fair compensation packages</div>
                  <div className="humble-services__feature">✓ Professional development support</div>
                  <div className="humble-services__feature">✓ Flexible scheduling options</div>
                </div>
                
                <button 
                  onClick={handleTherapistClick}
                  className="humble-services__option-button secondary"
                >
                  Explore Opportunities
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Contact Section */}
            <div className="humble-services__cta-contact">
              <div className="humble-services__contact-info">
                <p className="humble-services__contact-text">
                  Have questions? We'd love to hear from you.
                </p>
                <a href="tel:+12134950092" className="humble-services__contact-phone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>(213) 495-0092</span>
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