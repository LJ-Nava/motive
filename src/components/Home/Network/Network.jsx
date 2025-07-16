import React, { useState, useEffect, useRef } from 'react';
import '../../styles/home/Network.scss';

const Network = () => {
  const [activeAgency, setActiveAgency] = useState(0); // Empezar con Supportive (índice 0) en el centro
  const [isVisible, setIsVisible] = useState(false);
  const networkRef = useRef(null);

  // Lista de agencias
  const trustedAgencies = [
    { 
      name: 'Supportive Home Health',
      logo: 'https://supportivehealthgroup.com/wp-content/uploads/2023/04/qt_q_55-removebg-preview.png',
      patients: '1500+',
      locations: 12,
      specialty: 'Comprehensive Care'
    },
    { 
      name: 'Unison Health Services',
      logo: 'https://static.wixstatic.com/media/7438d9_91426f0fdd6945f7b74208a602d45cc2~mv2.png/v1/crop/x_0,y_1077,w_3125,h_971/fill/w_267,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Unison%20Logo%20deliver-01.png',
      patients: '800+',
      locations: 8,
      specialty: 'Integrated Solutions'
    },
    { 
      name: 'Intracare Home Health Providers Inc.',
      logo: 'https://intracareinc.com/images/ICHHPInc.-Logo1248.png',
      patients: '400+',
      locations: 15,
      specialty: 'Home Health Excellence'
    },
    { 
      name: 'Vast Home Health Agency',
      logo: 'https://vasthh.com/wp-content/uploads/2022/10/logo.png',
      patients: '100+',
      locations: 11,
      specialty: 'Community Focus'
    },
    { 
      name: 'Continuity Providers Healthcare',
      logo: 'https://continuityproviders.com/wp-content/themes/continuityph/images/main_logo.png',
      patients: '100+',
      locations: 9,
      specialty: 'Continuous Care'
    },
    { 
      name: 'Hand in Heart Home Health Services',
      logo: 'https://www.handinhearthomehealth.com/wp-content/themes/handinheart/images/main_logo.png',
      patients: '100+',
      locations: 7,
      specialty: 'Compassionate Care'
    },
    { 
      name: 'Equanimity Healthcare Solutions',
      logo: null,
      patients: '100+',
      locations: 5,
      specialty: 'Balanced Healthcare'
    },
    { 
      name: 'H&R Home Health Agency',
      logo: 'https://static.wixstatic.com/media/8c35f5_872e74e902a3400d9f7c721265ba94c4~mv2.png/v1/fill/w_743,h_753,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/8c35f5_872e74e902a3400d9f7c721265ba94c4~mv2.png',
      patients: '100+',
      locations: 8,
      specialty: 'Quality Care'
    },
    { 
      name: 'Ivory Home Health Services Inc.',
      logo: 'https://img1.wsimg.com/isteam/ip/1018b022-77e5-4a0f-9b88-caf951010613/Logo%20of%20IHHSI.PNG/:/rs=h:196/ll',
      patients: '100+',
      locations: 4,
      specialty: 'Personalized Care'
    }
  ];

  // Función para obtener iniciales
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('');
  };

  // Intersection Observer para animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (networkRef.current) {
      observer.observe(networkRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Función auxiliar para obtener agencias (ya no se usa pero la mantengo por compatibilidad)
  const getAgenciesWithPositions = () => {
    return trustedAgencies.map((agency, index) => ({
      ...agency,
      originalIndex: index,
      position: index
    }));
  };

  // Auto-navegación del carrusel con bucle infinito y timing suave
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgency((prev) => (prev + 1) % trustedAgencies.length);
    }, 4000); // Aumentado a 4 segundos para permitir transiciones completas
    
    return () => clearInterval(interval);
  }, [trustedAgencies.length]);

  // Función para navegar al hacer click
  const handleCardClick = (targetIndex) => {
    setActiveAgency(targetIndex);
  };

  return (
    <section className="network-section" ref={networkRef}>
      <div className="network-container">
        
        {/* Header Section */}
        <div className={`network-header ${isVisible ? 'animate-in' : ''}`}>
          
          <h2 className="network-title">
            Home Health Agencies
            <span className="title-accent"> Who Trust Motive</span>
          </h2>
          
        </div>

        {/* Carousel Section */}
        <div className={`network-carousel ${isVisible ? 'animate-in' : ''}`}>
          <div className="carousel-track">
            <div className="carousel-wrapper">
              {/* Solo 3 tarjetas: izquierda, centro, derecha con deslizamiento */}
              {[
                trustedAgencies[(activeAgency - 1 + trustedAgencies.length) % trustedAgencies.length], // Izquierda
                trustedAgencies[activeAgency], // Centro (destacado por opacidad)
                trustedAgencies[(activeAgency + 1) % trustedAgencies.length] // Derecha
              ].map((agency, position) => {
                const isCenter = position === 1;
                const scale = 1; // Todas las tarjetas del mismo tamaño
                const opacity = isCenter ? 1 : 0.7;
                const zIndex = isCenter ? 10 : 5;
                
                return (
                  <div 
                    key={`${agency.name}-${activeAgency}-${position}`}
                    className={`agency-card ${isCenter ? 'featured' : 'side'}`}
                    onClick={() => {
                      if (position === 0) {
                        // Click izquierda - ir a anterior
                        setActiveAgency((prev) => (prev - 1 + trustedAgencies.length) % trustedAgencies.length);
                      } else if (position === 2) {
                        // Click derecha - ir a siguiente
                        setActiveAgency((prev) => (prev + 1) % trustedAgencies.length);
                      }
                    }}
                    style={{
                      transform: `scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                      transition: 'all 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    }}
                  >
                {/* Card Background */}
                <div className="card-background"></div>
                
                {/* Card Content */}
                <div className="card-content">
                  
                  {/* Logo Section */}
                  <div className="logo-container">
                    {agency.logo ? (
                      <img 
                        src={agency.logo} 
                        alt={`${agency.name} logo`}
                        className="agency-logo"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : (
                      <div className="logo-placeholder">
                        {getInitials(agency.name)}
                      </div>
                    )}
                    <div 
                      className="logo-fallback"
                      style={{ display: agency.logo ? 'none' : 'flex' }}
                    >
                      {getInitials(agency.name)}
                    </div>
                  </div>

                  {/* Agency Info */}
                  <div className="agency-info">
                    <h3 className="agency-name">{agency.name}</h3>
                    <p className="agency-specialty">{agency.specialty}</p>
                  </div>

                  {/* Stats */}
                  <div className="agency-stats">
                    <div className="stat-item">
                      <div className="stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                          <circle cx="8.5" cy="7" r="4"/>
                          <path d="M20 8v6M23 11h-6"/>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <span className="stat-value">{agency.patients}</span>
                        <span className="stat-label">Patients</span>
                      </div>
                    </div>
                    
                    <div className="stat-item">
                      <div className="stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <span className="stat-value">{agency.locations}</span>
                        <span className="stat-label">Locations</span>
                      </div>
                    </div>
                  </div>
                  
                </div>

                {/* Hover Effect */}
                <div className="card-hover-effect"></div>
              </div>
                );
              })}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Network;