// components/About/AboutUs.jsx
import React, { useEffect, useRef } from 'react';
import '../styles/about/AboutUs.scss';

const AboutUs = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const storyRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const sections = [heroRef.current, statsRef.current, storyRef.current];
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleCallNow = () => {
    // Direct call functionality
    window.location.href = 'tel:+12134950092';
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'call_initiated', {
        event_category: 'contact',
        event_label: 'about_us_cta'
      });
    }
  };

  const handleCTAClick = (action) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'about_us',
        event_label: action
      });
    }
  };

  return (
    <div className="about-us">
      {/* Hero Section */}
      <section ref={heroRef} className="about-us__hero">
        <div className="about-us__container">
          <div className="about-us__hero-content">
            <div className="about-us__hero-text">
              <div className="about-us__hero-badge">
                <span>PREMIUM HEALTHCARE STAFFING</span>
              </div>
              <h1 className="about-us__hero-title">
                About <span className="about-us__hero-title--accent">Motive Home Care</span>
              </h1>
              <h2 className="about-us__hero-subtitle">
                Professional Healthcare Staffing Excellence for California Agencies
              </h2>
              <p className="about-us__hero-description">
                Founded by a Physical Therapist who understood that patients deserved better. 
                Today, we connect healthcare agencies with California's most dedicated therapy professionals. 
                Exceptional response times, quality outcomes, and genuine partnership—accessible to every agency.
              </p>
              <div className="about-us__hero-actions">
                <button 
                  className="about-us__cta about-us__cta--primary"
                  onClick={handleCallNow}
                >
                  <span>Get Started Today</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
                  </svg>
                </button>
                <button 
                  className="about-us__cta about-us__cta--secondary"
                  onClick={() => handleCTAClick('learn_more')}
                >
                  <span>Learn More</span>
                </button>
              </div>
            </div>
            <div className="about-us__hero-visual">
              <div className="about-us__hero-card">
                <div className="about-us__hero-card-header">
                  <div className="about-us__hero-card-avatar">
                    <span>AM</span>
                  </div>
                  <div className="about-us__hero-card-info">
                    <h3>Alex Martinez, PT</h3>
                    <p>CEO & Founder</p>
                  </div>
                </div>
                <blockquote className="about-us__hero-quote">
                  "At Motive Home Care, we're committed to enhancing the quality of in-home therapy. 
                  We connect you with clinicians who are not only experienced but also deeply passionate about patient care."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Real Numbers, Real Results */}
      <section ref={statsRef} className="about-us__stats">
        <div className="about-us__container">
          <div className="about-us__stats-header">
            <div className="about-us__stats-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2M9 11V9a2 2 0 1 1 4 0v2M9 11h6"/>
              </svg>
              <span>LIVE DATA</span>
            </div>
            <h2>Real Numbers, Real Results</h2>
          </div>
          
          <div className="about-us__stats-grid">
            <div className="about-us__stat">
              <div className="about-us__stat-icon about-us__stat-icon--placements">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-3-3m0 0-3-3m3 3-3 3m3-3h-3"/>
                </svg>
              </div>
              <div className="about-us__stat-content">
                <h3 className="about-us__stat-number">8,000+</h3>
                <p className="about-us__stat-label">Successful Placements</p>
                <span className="about-us__stat-subtitle">Since 2023</span>
              </div>
            </div>

            <div className="about-us__stat">
              <div className="about-us__stat-icon about-us__stat-icon--response">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div className="about-us__stat-content">
                <h3 className="about-us__stat-number">&lt;2hrs</h3>
                <p className="about-us__stat-label">Response Time</p>
                <span className="about-us__stat-subtitle">When You Need Us</span>
              </div>
            </div>

            <div className="about-us__stat">
              <div className="about-us__stat-icon about-us__stat-icon--satisfaction">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              </div>
              <div className="about-us__stat-content">
                <h3 className="about-us__stat-number">98.5%</h3>
                <p className="about-us__stat-label">Client Satisfaction</p>
                <span className="about-us__stat-subtitle">Consistently High</span>
              </div>
            </div>

            <div className="about-us__stat">
              <div className="about-us__stat-icon about-us__stat-icon--professionals">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-3-3"/>
                  <path d="m16 16 3 3"/>
                </svg>
              </div>
              <div className="about-us__stat-content">
                <h3 className="about-us__stat-number">550+</h3>
                <p className="about-us__stat-label">Active Professionals</p>
                <span className="about-us__stat-subtitle">Ready to Help</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="about-us__story">
        <div className="about-us__container">
          <div className="about-us__story-content">
            <div className="about-us__story-header">
              <h2 className="about-us__story-title">Our Story: From Bedside to Excellence</h2>
              <p className="about-us__story-subtitle">
                Born from a Physical Therapist's vision to transform home health staffing
              </p>
            </div>

            <div className="about-us__story-timeline">
              <div className="about-us__timeline-item">
                <div className="about-us__timeline-marker">
                  <span>2023</span>
                </div>
                <div className="about-us__timeline-content">
                  <h3>The Beginning</h3>
                  <p>
                    Alex Martinez, a licensed Physical Therapist, witnessed the struggles 
                    of home health agencies across California. Patients waiting weeks for 
                    therapy, agencies desperate for qualified professionals, and a system 
                    that simply wasn't working efficiently.
                  </p>
                  <blockquote>
                    "I remember working with agencies that would take days just to confirm 
                    a therapist placement. Meanwhile, patients who needed immediate care 
                    were waiting. That's when I knew we could do better."
                  </blockquote>
                </div>
              </div>

              <div className="about-us__timeline-item">
                <div className="about-us__timeline-marker">
                  <span>Today</span>
                </div>
                <div className="about-us__timeline-content">
                  <h3>California's Most Responsive Staffing Solution</h3>
                  <p>
                    What started as one conversation in Los Angeles has grown into 
                    California's most responsive therapy staffing solution. We've revolutionized 
                    how agencies connect with therapists, making quality care accessible when it matters most.
                  </p>
                  <div className="about-us__story-highlights">
                    <div className="about-us__highlight">
                      <span className="about-us__highlight-icon">⚡</span>
                      <span>Sub-2 hour response times</span>
                    </div>
                    <div className="about-us__highlight">
                      <span className="about-us__highlight-icon">🎯</span>
                      <span>TherapySync certified professionals</span>
                    </div>
                    <div className="about-us__highlight">
                      <span className="about-us__highlight-icon">🤝</span>
                      <span>True partnership approach</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Differentiators */}
      <section className="about-us__mission">
        <div className="about-us__container">
          <div className="about-us__mission-grid">
            <div className="about-us__mission-content">
              <h2 className="about-us__mission-title">
                What Makes Us Different
              </h2>
              <p className="about-us__mission-text">
                We're not just another staffing agency. We're a technology-driven solution 
                built by clinicians, for clinicians. Our mission is simple: ensure every 
                patient gets exceptional care, exactly when they need it.
              </p>
              
              <div className="about-us__differentiators">
                <div className="about-us__differentiator">
                  <div className="about-us__differentiator-icon">⚡</div>
                  <h4>Lightning-Fast Response</h4>
                  <p>While others take days, we respond in under 2 hours. Because recovery can't wait.</p>
                </div>
                <div className="about-us__differentiator">
                  <div className="about-us__differentiator-icon">🎯</div>
                  <h4>Quality-First Matching</h4>
                  <p>We don't just fill positions—we match the right therapist to the right patient need.</p>
                </div>
                <div className="about-us__differentiator">
                  <div className="about-us__differentiator-icon">🤝</div>
                  <h4>True Partnership</h4>
                  <p>Your success is our success. We invest in long-term relationships, not quick transactions.</p>
                </div>
                <div className="about-us__differentiator">
                  <div className="about-us__differentiator-icon">💻</div>
                  <h4>Technology Integration</h4>
                  <p>TherapySync compatibility means zero training time and seamless workflow integration.</p>
                </div>
              </div>
            </div>

            <div className="about-us__mission-visual">
              <div className="about-us__competitive-advantage">
                <h3>Competitive Advantage</h3>
                <div className="about-us__advantage-item">
                  <div className="about-us__advantage-metric">
                    <span className="about-us__advantage-number">85%</span>
                    <span className="about-us__advantage-label">Faster than industry average</span>
                  </div>
                </div>
                <div className="about-us__advantage-item">
                  <div className="about-us__advantage-metric">
                    <span className="about-us__advantage-number">Zero</span>
                    <span className="about-us__advantage-label">Training time required</span>
                  </div>
                </div>
                <div className="about-us__advantage-item">
                  <div className="about-us__advantage-metric">
                    <span className="about-us__advantage-number">100%</span>
                    <span className="about-us__advantage-label">TherapySync compatible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="about-us__leadership">
        <div className="about-us__container">
          <div className="about-us__leadership-header">
            <h2>Leadership Built on Clinical Excellence</h2>
            <p>Founded and led by healthcare professionals who understand the industry from the inside</p>
          </div>

          <div className="about-us__leadership-grid">
            <div className="about-us__leader">
              <div className="about-us__leader-card">
                <div className="about-us__leader-avatar">
                  <span>AM</span>
                </div>
                <div className="about-us__leader-info">
                  <h3>Alex Martinez, PT</h3>
                  <p className="about-us__leader-title">CEO & Founder</p>
                  <p className="about-us__leader-subtitle">Licensed Physical Therapist</p>
                  <p className="about-us__leader-description">
                    Combines deep clinical expertise with entrepreneurial vision. 
                    With years of hands-on experience in home health therapy, Alex founded 
                    Motive to solve the industry's most pressing challenges: speed, quality, and reliability.
                    Under his leadership, Motive has built a technology-driven platform with an in-house development team.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-us__team-highlight">
              <h3>Our Operations Excellence</h3>
              <p>Dedicated professionals ensuring every placement exceeds expectations</p>
              <div className="about-us__team-stats">
                <div className="about-us__team-stat">
                  <span className="about-us__team-number">2</span>
                  <span className="about-us__team-label">In-House Developers</span>
                </div>
                <div className="about-us__team-stat">
                  <span className="about-us__team-number">10+</span>
                  <span className="about-us__team-label">Clinical Administrators</span>
                </div>
                <div className="about-us__team-stat">
                  <span className="about-us__team-number">24/7</span>
                  <span className="about-us__team-label">Support Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="about-us__vision">
        <div className="about-us__container">
          <div className="about-us__vision-content">
            <h2 className="about-us__vision-title">Building the Future of Healthcare Staffing</h2>
            <p className="about-us__vision-subtitle">
              Our commitment to innovation and excellence drives everything we do
            </p>

            <div className="about-us__vision-grid">
              <div className="about-us__vision-item">
                <div className="about-us__vision-icon">🏛️</div>
                <h3>Statewide Excellence</h3>
                <p>Expanding our proven model to serve agencies throughout California</p>
              </div>
              <div className="about-us__vision-item">
                <div className="about-us__vision-icon">🚀</div>
                <h3>Technology Leadership</h3>
                <p>Pioneering new solutions that make therapy staffing effortless</p>
              </div>
              <div className="about-us__vision-item">
                <div className="about-us__vision-icon">💼</div>
                <h3>Industry Standards</h3>
                <p>Setting new benchmarks for response time and service quality</p>
              </div>
              <div className="about-us__vision-item">
                <div className="about-us__vision-icon">🎓</div>
                <h3>Professional Development</h3>
                <p>Supporting continuous education and career advancement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-us__cta-section">
        <div className="about-us__container">
          <div className="about-us__cta-content">
            <h2>Ready to Experience the Motive Difference?</h2>
            <p>
              Join hundreds of agencies who've discovered what makes us different. 
              We're not the biggest, but we're the most dedicated to getting it right.
            </p>
            <div className="about-us__cta-actions">
              <button 
                className="about-us__cta about-us__cta--primary"
                onClick={handleCallNow}
              >
                <span>Get Started Today</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
                </svg>
              </button>
              <button 
                className="about-us__cta about-us__cta--secondary"
                onClick={() => handleCTAClick('contact_us')}
              >
                <span>Contact Us</span>
              </button>
            </div>
            <p className="about-us__cta-subtitle">
              <em>Founded in 2023 • Based in Los Angeles • Serving Healthcare Agencies Statewide</em>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;