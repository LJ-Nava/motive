import React, { useState, useEffect, useRef } from 'react';
import '../../styles/home/Network.scss';

const Network = () => {
  const [activeAgency, setActiveAgency] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const networkRef = useRef(null);

  // Lista de agencias con imágenes temáticas específicas y diferentes para cada una
  const trustedAgencies = [
    { 
      name: 'Supportive Health Group',
      logo: 'https://supportivehealthgroup.com/wp-content/uploads/2023/04/qt_q_55-removebg-preview.png',
      established: '2023',
      specialties: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy'],
      patients: '1500+',
      locations: 12,
      backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Physical therapy session with equipment
      theme: 'physical-therapy'
    },
    { 
      name: 'Unison Health Services',
      logo: 'https://static.wixstatic.com/media/7438d9_91426f0fdd6945f7b74208a602d45cc2~mv2.png/v1/crop/x_0,y_1077,w_3125,h_971/fill/w_267,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Unison%20Logo%20deliver-01.png',
      established: '2024',
      specialties: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy'],
      patients: '800+',
      locations: 8,
      backgroundImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Occupational therapy with elderly patient
      theme: 'occupational-therapy'
    },
    { 
      name: 'Intracare Home Health Providers',
      logo: 'https://intracareinc.com/images/ICHHPInc.-Logo1248.png',
      established: '2024',
      specialties: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy'],
      patients: '400+',
      locations: 15,
      backgroundImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Speech therapy session with child
      theme: 'speech-therapy'
    },
    { 
      name: 'Caring Like Family',
      logo: null,
      established: '2024',
      specialties: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy'],
      patients: '200+',
      locations: 6,
      backgroundImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Home health nurse caring for patient
      theme: 'home-care'
    },
    { 
      name: 'Vast Home Health',
      logo: 'https://vasthh.com/wp-content/uploads/2022/10/logo.png',
      established: '2024',
      specialties: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy'],
      patients: '100+',
      locations: 11,
      backgroundImage: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Physical therapist helping patient walk
      theme: 'rehabilitation'
    },
    { 
      name: 'Continuity Providers Healthcare',
      logo: 'https://continuityproviders.com/wp-content/themes/continuityph/images/main_logo.png',
      established: '2024',
      specialties: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy'],
      patients: '100+',
      locations: 9,
      backgroundImage: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Medical team consultation
      theme: 'healthcare-team'
    },
    { 
      name: 'Hand in Heart Home Health',
      logo: 'https://www.handinhearthomehealth.com/wp-content/themes/handinheart/images/main_logo.png',
      established: '2023',
      specialties: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy'],
      patients: '100+',
      locations: 7,
      backgroundImage: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Caring hands - compassionate care
      theme: 'compassionate-care'
    },
    { 
      name: 'Equanimity Healthcare',
      logo: null,
      established: '2023',
      specialties: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy'],
      patients: '100+',
      locations: 5,
      backgroundImage: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Wellness and meditation therapy
      theme: 'wellness'
    },
    { 
      name: 'H&R Home Health',
      logo: 'https://static.wixstatic.com/media/8c35f5_872e74e902a3400d9f7c721265ba94c4~mv2.png/v1/fill/w_743,h_753,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/8c35f5_872e74e902a3400d9f7c721265ba94c4~mv2.png',
      established: '2023',
      specialties: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy'],
      patients: '100+',
      locations: 8,
      backgroundImage: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Professional healthcare consultation
      theme: 'professional-care'
    },
    { 
      name: 'Ivory Home Health',
      logo: 'https://img1.wsimg.com/isteam/ip/1018b022-77e5-4a0f-9b88-caf951010613/Logo%20of%20IHHSI.PNG/:/rs=h:196/ll',
      established: '2023',
      specialties: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy'],
      patients: '100+',
      locations: 4,
      backgroundImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Gentle elderly care and assistance
      theme: 'elderly-care'
    }
  ];

  // Configuración de grupos
  const AGENCIES_PER_GROUP = 3;
  const totalGroups = Math.ceil(trustedAgencies.length / AGENCIES_PER_GROUP);

  // Obtener agencias del grupo actual
  const getCurrentGroupAgencies = () => {
    const startIndex = currentGroup * AGENCIES_PER_GROUP;
    const endIndex = startIndex + AGENCIES_PER_GROUP;
    return trustedAgencies.slice(startIndex, endIndex);
  };

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

  // Auto-navegación dentro del grupo actual
  useEffect(() => {
    const currentGroupAgencies = getCurrentGroupAgencies();
    const interval = setInterval(() => {
      setActiveAgency((prev) => {
        const nextIndex = (prev + 1) % currentGroupAgencies.length;
        return nextIndex;
      });
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentGroup]);

  // Reset activeAgency cuando cambie el grupo
  useEffect(() => {
    setActiveAgency(0);
  }, [currentGroup]);

  // Navegación entre grupos
  const navigateToGroup = (direction) => {
    if (direction === 'next' && currentGroup < totalGroups - 1) {
      setCurrentGroup(prev => prev + 1);
    } else if (direction === 'prev' && currentGroup > 0) {
      setCurrentGroup(prev => prev - 1);
    }
  };

  // Ir a un grupo específico
  const goToGroup = (groupIndex) => {
    setCurrentGroup(groupIndex);
  };

  const currentGroupAgencies = getCurrentGroupAgencies();
  const currentAgencyData = currentGroupAgencies[activeAgency];

  return (
    <section className="motive-network" ref={networkRef}>
      {/* Partículas globales */}
      <div className="motive-network__particles">
        {[...Array(25)].map((_, i) => (
          <div 
            key={i} 
            className={`global-particle particle-${i + 1}`}
            style={{
              '--delay': `${i * 0.4}s`,
              '--duration': `${12 + Math.random() * 8}s`,
              '--size': `${1 + Math.random() * 3}px`,
              '--opacity': Math.random() * 0.6 + 0.2
            }}
          />
        ))}
        
        {[...Array(8)].map((_, i) => (
          <div 
            key={`line-${i}`} 
            className={`connection-line line-${i + 1}`}
            style={{
              '--delay': `${i * 1.5}s`,
              '--duration': `${20 + Math.random() * 10}s`
            }}
          />
        ))}
        
        {[...Array(6)].map((_, i) => (
          <div 
            key={`ring-${i}`} 
            className={`pulse-ring ring-${i + 1}`}
            style={{
              '--delay': `${i * 3}s`,
              '--duration': `${15 + Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      <div className="motive-network__container">
        
        {/* Header */}
        <div className={`motive-network__header ${isVisible ? 'animate-in' : ''}`}>
          <div className="motive-network__badge">
            <div className="badge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                <path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
            <span>Our Partner Network</span>
          </div>
          
          <h2 className="motive-network__title">
            Healthcare Agencies
            <span className="title-highlight"> Who Trust Motive</span>
          </h2>
          
          <p className="motive-network__description">
            We work with trusted healthcare agencies across California to provide 
            quality therapy services and support healthcare professionals.
          </p>
        </div>

        {/* Showcase principal */}
        <div className={`motive-network__showcase ${isVisible ? 'animate-in' : ''}`}>
          
          {/* Tarjeta principal grande */}
          <div className="motive-network__featured">
            <div className={`featured-card ${currentAgencyData.theme}-active`}>
              {/* Partículas animadas de fondo */}
              <div className="featured-card__particles">
                {[...Array(15)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`particle particle-${i + 1}`}
                    style={{
                      '--delay': `${i * 0.3}s`,
                      '--duration': `${8 + Math.random() * 4}s`,
                      '--size': `${2 + Math.random() * 4}px`
                    }}
                  />
                ))}
              </div>

              {/* Logo de fondo como marca de agua */}
              <div className="featured-card__background-logo">
                {currentAgencyData.logo ? (
                  <img 
                    src={currentAgencyData.logo} 
                    alt=""
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="background-initials"
                  style={{ display: currentAgencyData.logo ? 'none' : 'flex' }}
                >
                  {getInitials(currentAgencyData.name)}
                </div>
              </div>

              {/* Imagen de fondo temática */}
              <div 
                className="featured-card__background-image loaded"
                style={{ backgroundImage: `url(${currentAgencyData.backgroundImage})` }}
              ></div>

              {/* Efectos de gradiente dinámico */}
              <div className={`featured-card__gradient-overlay ${currentAgencyData.theme}`}></div>
              
              {/* Contenido principal */}
              <div className="featured-card__content-wrapper">
                <div className="featured-card__header">
                  <div className="agency-logo-premium">
                    {currentAgencyData.logo ? (
                      <img 
                        src={currentAgencyData.logo} 
                        alt={`${currentAgencyData.name} logo`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="logo-initials-premium"
                      style={{ display: currentAgencyData.logo ? 'none' : 'flex' }}
                    >
                      {getInitials(currentAgencyData.name)}
                    </div>
                  </div>
                  <div className="agency-badge-premium">
                    <div className="badge-shine"></div>
                    <span>Partner Since {currentAgencyData.established}</span>
                  </div>
                </div>

                <div className="featured-card__content">
                  <h3 className="agency-name-premium">{currentAgencyData.name}</h3>
                  
                  <div className="agency-stats-premium">
                    <div className="stat-premium">
                      <div className="stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                          <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                          <path d="M16 3.13a4 4 0 010 7.75"/>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <div className="stat-value-premium">{currentAgencyData.patients}</div>
                        <div className="stat-label-premium">Patients Served</div>
                      </div>
                    </div>
                    <div className="stat-premium">
                      <div className="stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <div className="stat-value-premium">{currentAgencyData.specialties.length}</div>
                        <div className="stat-label-premium">Therapy Services</div>
                      </div>
                    </div>
                    <div className="stat-premium">
                      <div className="stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <div className="stat-value-premium">{currentAgencyData.locations}</div>
                        <div className="stat-label-premium">Locations</div>
                      </div>
                    </div>
                  </div>

                  <div className="excellence-section">
                    <div className="excellence-header">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>Areas of Excellence</span>
                    </div>
                    <div className="agency-services-premium">
                      {currentAgencyData.specialties.map((service, index) => (
                        <div key={index} className="service-tag-premium">
                          <div className="service-shine"></div>
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navegación entre grupos */}
          <div className="motive-network__group-navigation">
            <button 
              className={`nav-button nav-button--prev ${currentGroup === 0 ? 'disabled' : ''}`}
              onClick={() => navigateToGroup('prev')}
              disabled={currentGroup === 0}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              <span>Previous Group</span>
            </button>
            
            <div className="group-info">
              <span className="group-counter">
                Group {currentGroup + 1} of {totalGroups}
              </span>
              <span className="group-agencies">
                {currentGroupAgencies.length} agencies
              </span>
            </div>
            
            <button 
              className={`nav-button nav-button--next ${currentGroup === totalGroups - 1 ? 'disabled' : ''}`}
              onClick={() => navigateToGroup('next')}
              disabled={currentGroup === totalGroups - 1}
            >
              <span>Next Group</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>

          {/* Grid de tarjetas pequeñas - solo el grupo actual */}
          <div className="motive-network__grid">
            {currentGroupAgencies.map((agency, index) => (
              <div 
                key={`${currentGroup}-${index}`}
                className={`agency-card-small ${index === activeAgency ? 'active' : ''}`}
                onClick={() => setActiveAgency(index)}
              >
                <div className="small-card__logo">
                  {agency.logo ? (
                    <img 
                      src={agency.logo} 
                      alt={`${agency.name} logo`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="logo-initials-small"
                    style={{ display: agency.logo ? 'none' : 'flex' }}
                  >
                    {getInitials(agency.name)}
                  </div>
                </div>
                
                <div className="small-card__content">
                  <h4 className="agency-name-small">{agency.name}</h4>
                  <div className="agency-stats-small">
                    <span>{agency.patients} patients</span>
                    <span>{agency.specialties.length} services</span>
                  </div>
                </div>
                
                {index === activeAgency && (
                  <div className="active-indicator">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Indicadores de grupo */}
          <div className="motive-network__group-indicators">
            {[...Array(totalGroups)].map((_, groupIndex) => (
              <button
                key={groupIndex}
                className={`group-indicator ${groupIndex === currentGroup ? 'active' : ''}`}
                onClick={() => goToGroup(groupIndex)}
                aria-label={`Go to group ${groupIndex + 1}`}
              >
                <span className="indicator-number">{groupIndex + 1}</span>
              </button>
            ))}
          </div>

          {/* Indicadores de agencia dentro del grupo actual */}
          <div className="motive-network__indicators">
            {currentGroupAgencies.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeAgency ? 'active' : ''}`}
                onClick={() => setActiveAgency(index)}
                aria-label={`View ${currentGroupAgencies[index].name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Network;