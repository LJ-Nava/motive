import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/home/CoverageSection.scss';
import MapaBack from '../../../assets/MapaBack.png';

const CoverageSection = () => {
  const navigate = useNavigate();

  const handleFindCoverage = () => {
    navigate('/coverage-areas');
  };

  const handleSpecialtyClick = (specialtyId) => {
    // Navegar a coverage-areas con el servicio específico
    navigate(`/coverage-areas?service=${specialtyId}`);
  };

  const metrics = [
    {
      value: "3,000+",
      label: "Visits Completed Monthly",
      subtext: "Consistent referral flow for clinicians",
      iconType: "visits"
    },
    {
      value: "<5min",
      label: "Response Time",
      iconType: "response"
    },
    {
      value: "300+",
      label: "Licensed Clinicians",
      iconType: "clinicians"
    }
  ];

  // Especialidades según el diseño del PDF
  const specialties = [
    {
      id: 'pt',
      name: 'Physical Therapy',
      differentiator: 'OASIS-experienced clinicians'
    },
    {
      id: 'ot',
      name: 'Occupational Therapy',
      differentiator: 'ADL & safety-focused care'
    },
    {
      id: 'slp',
      name: 'Speech Therapy',
      differentiator: 'Cognition, swallowing & communication'
    }
  ];

  return (
    <section className="coverage-section">
      <div className="coverage-section__wrapper">
        
        {/* Título principal */}
        <div className="coverage-section__header">
          <h2 className="coverage-section__title">
            Connect with California's <span className="coverage-section__highlight">Top Therapy Professionals</span>
          </h2>
        </div>

        {/* Coverage Area con imagen como fondo */}
        <div 
          className="coverage-section__map-container"
          style={{
            backgroundImage: `url(${MapaBack})`
          }}
        >
          <div className="coverage-section__map-content">
            <span className="coverage-section__map-caption">Local clinicians. Regional reach.</span>
            <h3 className="coverage-section__map-title">COVERAGE AREAS</h3>
            <p className="coverage-section__map-subtitle">Serving 60+ cities across Southern California</p>
            
            <button 
              className="coverage-section__map-btn"
              onClick={handleFindCoverage}
            >
              FIND COVERAGE
              <svg 
                className="coverage-section__map-btn-arrow" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Métricas */}
        <div className="coverage-section__metrics">
          <div className="coverage-section__metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="coverage-section__metric-card">
                <div className="coverage-section__metric-icon">
                  {metric.iconType === "visits" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  )}
                  {metric.iconType === "response" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  )}
                  {metric.iconType === "clinicians" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  )}
                </div>
                <div className="coverage-section__metric-content">
                  <div className="coverage-section__metric-value">{metric.value}</div>
                  <div className="coverage-section__metric-label">{metric.label}</div>
                  {metric.subtext && (
                    <div className="coverage-section__metric-subtext">{metric.subtext}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Specialties - Alineado a la izquierda */}
        <div className="coverage-section__specialties">
          <div className="coverage-section__specialties-header">
            <h3 className="coverage-section__specialties-title">Our Specialties</h3>
            <p className="coverage-section__specialties-tagline">
              Flexible schedules. Fast onboarding. Local referrals.
            </p>
            <p className="coverage-section__specialties-subtitle">
              Expert professionals ready to help
            </p>
          </div>
          
          <div className="coverage-section__specialties-grid">
            {specialties.map((specialty) => (
              <div 
                key={specialty.id} 
                className="coverage-section__specialty-card"
                onClick={() => handleSpecialtyClick(specialty.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Icono circular como en el PDF */}
                <div className="coverage-section__specialty-icon">
                  {specialty.id === 'pt' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m4-2v4m0 0l3-3m-3 3l-3-3"/>
                    </svg>
                  )}
                  {specialty.id === 'ot' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
                    </svg>
                  )}
                  {specialty.id === 'slp' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                    </svg>
                  )}
                </div>

                {/* Contenido principal */}
                <div className="coverage-section__specialty-content">
                  <h4 className="coverage-section__specialty-name">{specialty.name}</h4>

                  {/* Diferenciador específico */}
                  <div className="coverage-section__specialty-stats">
                    <div className="coverage-section__specialty-stat">
                      <span className="coverage-section__specialty-differentiator">{specialty.differentiator}</span>
                    </div>
                  </div>
                </div>

                {/* Flecha como en el PDF */}
                <div className="coverage-section__specialty-arrow">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CoverageSection;