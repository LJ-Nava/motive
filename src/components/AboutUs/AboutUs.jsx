// components/About/AboutUs.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/about/AboutUs.scss';

const AboutUs = () => {
  const navigate = useNavigate();
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

  const handleAgencyApplication = () => {
    navigate('/agencies/join');

    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'agency_application_click', {
        event_category: 'navigation',
        event_label: 'about_us_cta'
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
              <h1 className="about-us__hero-title">
                About <span className="about-us__hero-title--accent">Motive Home Care</span>
              </h1>
              <h2 className="about-us__hero-subtitle">
                Connecting California agencies with exceptional PT, OT & SLP professionals.
              </h2>

              {/* ✅ CONTENIDO MOVIDO DESDE SERVICES */}
              <div className="about-us__hero-description-section">
                <p className="about-us__hero-description">
                  Located in Los Angeles, we specialize in staffing home health agencies
                  with the finest physical, occupational and speech therapists.
                  Our team provides reliable, timely service—connecting you with
                  clinicians who are experienced and passionate about patient care.
                </p>

                <p className="about-us__hero-description">
                  Founded by a Physical Therapist who understood patients deserved better.
                  Today, we deliver exceptional response times, quality outcomes,
                  and genuine partnership to agencies across California.
                </p>
              </div>

              <div className="about-us__hero-actions">
                <div className="about-us__cta-wrapper">
                  <button
                    className="about-us__cta about-us__cta--primary"
                    onClick={handleAgencyApplication}
                  >
                    <span>Start Agency Application</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
                    </svg>
                  </button>
                  <span className="about-us__microcopy">Takes under 3 minutes.</span>
                </div>
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
            <span className="about-us__stats-eyebrow">Live Data Since 2023</span>
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
                <h3 className="about-us__stat-number" data-count="8000">8,000+</h3>
                <p className="about-us__stat-label">Successful Placements</p>
                <span className="about-us__stat-description">
                  Therapists matched with agencies since our launch
                </span>
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
                <p className="about-us__stat-label">Average Response Time</p>
                <span className="about-us__stat-description">
                  From request to confirmed therapist assignment
                </span>
              </div>
            </div>

            <div className="about-us__stat">
              <div className="about-us__stat-icon about-us__stat-icon--satisfaction">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              </div>
              <div className="about-us__stat-content">
                <h3 className="about-us__stat-number" data-count="98.5">98.5%</h3>
                <p className="about-us__stat-label">Client Satisfaction</p>
                <span className="about-us__stat-description">
                  Based on agency feedback and repeat partnerships
                </span>
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
                <h3 className="about-us__stat-number" data-count="550">550+</h3>
                <p className="about-us__stat-label">Active Professionals</p>
                <span className="about-us__stat-description">
                  Vetted PT, OT & SLP clinicians ready for assignments
                </span>
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
                <div className="about-us__timeline-content about-us__timeline-content--with-image">
                  <div className="about-us__timeline-image">
                    {/* Placeholder para foto del CEO */}
                    <div className="about-us__timeline-image-placeholder">
                      <span>AM</span>
                      <p>Alex Martinez, PT</p>
                    </div>
                  </div>
                  <div className="about-us__timeline-text">
                    <h3>The Beginning</h3>
                    <ul className="about-us__timeline-bullets">
                      <li>Founded by Alex Martinez, licensed Physical Therapist</li>
                      <li>Identified critical gaps in California's home health staffing</li>
                      <li>Launched first agency partnership in Los Angeles</li>
                      <li>Built technology-driven matching system from day one</li>
                    </ul>
                    <blockquote>
                      "Patients who needed immediate care were waiting days.
                      That's when I knew we could do better."
                    </blockquote>
                  </div>
                </div>
              </div>

              <div className="about-us__timeline-item">
                <div className="about-us__timeline-marker">
                  <span>Today</span>
                </div>
                <div className="about-us__timeline-content">
                  <h3>California's Most Responsive Staffing Solution</h3>
                  <ul className="about-us__timeline-bullets">
                    <li>550+ active PT, OT & SLP professionals statewide</li>
                    <li>Sub-2 hour average response time</li>
                    <li>8,000+ successful therapist placements</li>
                    <li>Expanded coverage across Southern California</li>
                  </ul>
                  <div className="about-us__story-highlights">
                    <div className="about-us__highlight">
                      <span className="about-us__highlight-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                      </span>
                      <span>Rapid Response</span>
                    </div>
                    <div className="about-us__highlight">
                      <div className="about-us__highlight-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      </div>
                      <span>TherapySync Certified</span>
                    </div>
                    <div className="about-us__highlight">
                      <span className="about-us__highlight-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </span>
                      <span>True Partnership</span>
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
                A technology-driven staffing solution built by clinicians, for clinicians.
                We ensure every patient gets exceptional care, exactly when they need it.
              </p>

              <div className="about-us__differentiators">
                <div className="about-us__differentiator">
                  <div className="about-us__differentiator-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <h4>Rapid Response</h4>
                  <p>Under 2 hours for therapist placement. Patient care can't wait—neither do we.</p>
                </div>
                <div className="about-us__differentiator">
                  <div className="about-us__differentiator-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  </div>
                  <h4>Clinical Excellence</h4>
                  <p>Therapists matched to patient needs. Qualified professionals for optimal care outcomes.</p>
                </div>
                <div className="about-us__differentiator">
                  <div className="about-us__differentiator-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <h4>True Partnership</h4>
                  <p>Long-term relationships with agencies. Your success is our success.</p>
                </div>
                <div className="about-us__differentiator">
                  <div className="about-us__differentiator-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h4>Seamless Integration</h4>
                  <p>TherapySync-compatible from day one. Zero training time, immediate productivity.</p>
                </div>
              </div>
            </div>

            <div className="about-us__mission-visual">
              <div className="about-us__competitive-advantage">
                <h3>Competitive Advantage</h3>
                <div className="about-us__advantage-item">
                  <div className="about-us__advantage-metric">
                    <span className="about-us__advantage-number">85%</span>
                    <span className="about-us__advantage-label">Faster placement than industry average</span>
                  </div>
                </div>
                <div className="about-us__advantage-item">
                  <div className="about-us__advantage-metric">
                    <span className="about-us__advantage-number">Zero</span>
                    <span className="about-us__advantage-label">Onboarding or training time required</span>
                  </div>
                </div>
                <div className="about-us__advantage-item">
                  <div className="about-us__advantage-metric">
                    <span className="about-us__advantage-number">100%</span>
                    <span className="about-us__advantage-label">TherapySync certified professionals</span>
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
            <p>Founded and led by clinicians who understand your needs</p>
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
              <div className="about-us__team-highlight-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <div>
                  <h3>Our Operations Team</h3>
                  <p>Dedicated professionals ensuring every placement exceeds expectations</p>
                </div>
              </div>
              <div className="about-us__team-stats-grid">
                <div className="about-us__team-stat-card">
                  <div className="about-us__team-stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div className="about-us__team-stat-content">
                    <span className="about-us__team-number">10+</span>
                    <span className="about-us__team-label">Clinical Administrators</span>
                    <span className="about-us__team-description">Ensuring quality placements daily</span>
                  </div>
                </div>
                <div className="about-us__team-stat-card">
                  <div className="about-us__team-stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  </div>
                  <div className="about-us__team-stat-content">
                    <span className="about-us__team-number">2</span>
                    <span className="about-us__team-label">In-House Developers</span>
                    <span className="about-us__team-description">Building our technology platform</span>
                  </div>
                </div>
                <div className="about-us__team-stat-card about-us__team-stat-card--full">
                  <div className="about-us__team-stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div className="about-us__team-stat-content">
                    <span className="about-us__team-number">24/7</span>
                    <span className="about-us__team-label">Support Available</span>
                    <span className="about-us__team-description">Always here when you need us</span>
                  </div>
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
            <h2 className="about-us__vision-title">Building the Future of Home Health Staffing</h2>
            <p className="about-us__vision-subtitle">
              Our commitment to innovation and excellence drives everything we do
            </p>

            <div className="about-us__vision-grid">
              <div className="about-us__vision-item">
                <div className="about-us__vision-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3>Statewide Excellence</h3>
                <p>Expanding our proven model across California</p>
              </div>
              <div className="about-us__vision-item">
                <div className="about-us__vision-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M2 12h20"/>
                    <circle cx="12" cy="12" r="4"/>
                  </svg>
                </div>
                <h3>Innovative Solutions</h3>
                <p>Streamlined therapist–agency matching</p>
              </div>
              <div className="about-us__vision-item">
                <div className="about-us__vision-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3>Industry Standards</h3>
                <p>Setting new response & service benchmarks</p>
              </div>
              <div className="about-us__vision-item">
                <div className="about-us__vision-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    <polyline points="17 11 19 13 23 9"/>
                  </svg>
                </div>
                <h3>Professional Development</h3>
                <p>Supporting continuous education & career growth</p>
              </div>
            </div>

            <div className="about-us__vision-cta">
              <button
                className="about-us__vision-btn"
                onClick={handleAgencyApplication}
              >
                Join Our Mission
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-us__cta-section">
        <div className="about-us__container">
          <div className="about-us__cta-content">
            <h2>Ready to Experience the Motive Difference for Your Agency?</h2>
            <p>
              Join hundreds of agencies who've discovered what makes us different.
              We're not the biggest, but we're the most dedicated to getting it right.
            </p>
            <div className="about-us__cta-actions">
              <button
                className="about-us__cta about-us__cta--primary"
                onClick={handleAgencyApplication}
              >
                <span>Get Started Today</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            <button
              className="about-us__therapist-link"
              onClick={() => navigate('/therapists/apply')}
            >
              Are you a therapist? Join our team
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <p className="about-us__cta-subtitle">
              <em>Founded in 2023 • Based in Los Angeles • Serving Home Health Agencies Statewide</em>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
