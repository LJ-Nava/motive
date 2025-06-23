import React from 'react';
import '../../styles/home/Testimonials.scss';

const Testimonials = () => {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <div className="testimonials__badge">
            <span className="testimonials__badge-icon">⭐</span>
            <span className="testimonials__badge-text">Client Stories</span>
          </div>
          <h2 className="testimonials__title">What Our Partners Say</h2>
          <p className="testimonials__subtitle">
            Real feedback from agencies and therapists who trust Motive Home Care
          </p>
        </div>

        <div className="testimonials__content">
          <div className="testimonials__coming-soon">
            <div className="testimonials__icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            
            <h3 className="testimonials__coming-title">
              Testimonials Coming Soon
            </h3>
            
            <p className="testimonials__coming-description">
              We're currently collecting feedback from our valued partners and therapists. 
              Their stories of success and satisfaction will be featured here soon.
            </p>

            <div className="testimonials__features">
              <div className="testimonials__feature">
                <div className="testimonials__feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span>Agency Success Stories</span>
              </div>
              
              <div className="testimonials__feature">
                <div className="testimonials__feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span>Therapist Experiences</span>
              </div>
              
              <div className="testimonials__feature">
                <div className="testimonials__feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span>Partnership Reviews</span>
              </div>
            </div>

            <div className="testimonials__placeholder-cards">
              <div className="testimonials__placeholder-card">
                <div className="testimonials__placeholder-avatar"></div>
                <div className="testimonials__placeholder-content">
                  <div className="testimonials__placeholder-line"></div>
                  <div className="testimonials__placeholder-line"></div>
                  <div className="testimonials__placeholder-line testimonials__placeholder-line--short"></div>
                </div>
              </div>
              
              <div className="testimonials__placeholder-card">
                <div className="testimonials__placeholder-avatar"></div>
                <div className="testimonials__placeholder-content">
                  <div className="testimonials__placeholder-line"></div>
                  <div className="testimonials__placeholder-line"></div>
                  <div className="testimonials__placeholder-line testimonials__placeholder-line--short"></div>
                </div>
              </div>
              
              <div className="testimonials__placeholder-card">
                <div className="testimonials__placeholder-avatar"></div>
                <div className="testimonials__placeholder-content">
                  <div className="testimonials__placeholder-line"></div>
                  <div className="testimonials__placeholder-line"></div>
                  <div className="testimonials__placeholder-line testimonials__placeholder-line--short"></div>
                </div>
              </div>
            </div>

            <div className="testimonials__notify">
              <p className="testimonials__notify-text">
                Want to be notified when testimonials are available?
              </p>
              <button className="btn btn--secondary">
                Stay Updated
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;