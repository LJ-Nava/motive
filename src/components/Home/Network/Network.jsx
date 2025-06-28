import React, { useState, useEffect } from 'react';
import '../../styles/home/Network.scss';

const Network = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Trusted Partner Agencies - Real agencies that trust Motive Home Care
  const trustedAgencies = [
    { 
      name: 'Caring Like Family',
      logo: 'https://static.wixstatic.com/media/7438d9_91426f0fdd6945f7b74208a602d45cc2~mv2.png/v1/crop/x_0,y_1077,w_3125,h_971/fill/w_267,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Unison%20Logo%20deliver-01.png', // Using Unison's logo as placeholder since CLF logo not found
      established: '2024',
      color: '#2563EB'
    },
    { 
      name: 'Intracare Home Health Providers',
      logo: 'https://intracareinc.com/images/ICHHPInc.-Logo1248.png',
      established: '2024',
      color: '#3B82F6'
    },
    { 
      name: 'Unison Health Services',
      logo: 'https://static.wixstatic.com/media/7438d9_91426f0fdd6945f7b74208a602d45cc2~mv2.png/v1/crop/x_0,y_1077,w_3125,h_971/fill/w_267,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Unison%20Logo%20deliver-01.png',
      established: '2024',
      color: '#1D4ED8'
    },
    { 
      name: 'Supportive Health Group',
      logo: 'https://supportivehealthgroup.com/wp-content/uploads/2023/04/qt_q_55-removebg-preview.png',
      established: '2023',
      color: '#1E40AF'
    },
    { 
      name: 'Vast Home Health',
      logo: 'https://vasthh.com/wp-content/uploads/2022/10/logo.png',
      established: '2024',
      color: '#1E3A8A'
    },
    { 
      name: 'Continuity Providers Healthcare',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMzEyRTgxIi8+Cjx0ZXh0IHg9IjYwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNQSDwvdGV4dD4KPHRleHQgeD0iNjAiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5IZWFsdGhjYXJlPC90ZXh0Pgo8L3N2Zz4K', // SVG placeholder
      established: '2024',
      color: '#312E81'
    },
    { 
      name: 'Hand in Heart Home Health',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMzczMEEzIi8+Cjx0ZXh0IHg9IjYwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfpJ08L3RleHQ+Cjx0ZXh0IHg9IjYwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SGFuZCBpbiBIZWFydDwvdGV4dD4KPC9zdmc+Cg==', // SVG with heart emoji
      established: '2023',
      color: '#3730A3'
    },
    { 
      name: 'Equanimity Healthcare',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNDMzOENBIi8+Cjx0ZXh0IHg9IjYwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVIQzwvdGV4dD4KPHR0ZXh0IHg9IjYwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RXF1YW5pbWl0eTwvdGV4dD4KPC9zdmc+Cg==', // SVG placeholder
      established: '2023',
      color: '#4338CA'
    },
    { 
      name: 'H&R Home Health',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNUIyMUI2Ii8+Cjx0ZXh0IHg9IjYwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkgmUjwvdGV4dD4KPHR0ZXh0IHg9IjYwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SG9tZSBIZWFsdGg8L3RleHQ+Cjwvc3ZnPgo=', // SVG placeholder
      established: '2023',
      color: '#5B21B6'
    },
    { 
      name: 'Ivory Home Health',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjN0MzQUVEIi8+Cjx0ZXh0IHg9IjYwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPklISDwvdGV4dD4KPHR0ZXh0IHg9IjYwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SXZvcnkgSGVhbHRoPC90ZXh0Pgo8L3N2Zz4K', // SVG placeholder
      established: '2023',
      color: '#7C3AED'
    }
  ];

  // Auto-rotate through cards
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % trustedAgencies.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, trustedAgencies.length]);

  return (
    <div className="network-section">
      <div className="network-container">
        {/* Header */}
        <div className="network-header">
          <div className="trust-badge">
            <span className="badge-icon">🤝</span>
            <span>Trusted Partners</span>
          </div>
          <h2 className="network-title">
            Healthcare Agencies
            <span className="title-highlight"> Who Trust Us</span>
          </h2>
        </div>

        {/* Agency Showcase */}
        <div 
          className="agency-showcase"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Featured Agency */}
          <div className="featured-agency">
            <div className="featured-card">
              <div className="featured-logo">
                <img 
                  src={trustedAgencies[activeCard].logo} 
                  alt={`${trustedAgencies[activeCard].name} logo`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="logo-fallback" style={{ display: 'none' }}>
                  {trustedAgencies[activeCard].name.split(' ').map(word => word[0]).join('')}
                </div>
              </div>
              <div className="featured-info">
                <h3 className="agency-name">{trustedAgencies[activeCard].name}</h3>
                <p className="established">Established {trustedAgencies[activeCard].established}</p>
              </div>
            </div>
          </div>

          {/* Agency Grid */}
          <div className="agency-grid">
            {trustedAgencies.map((agency, index) => (
              <div 
                key={agency.name}
                className={`agency-card ${index === activeCard ? 'active' : ''}`}
                onClick={() => setActiveCard(index)}
                style={{ '--agency-color': agency.color }}
              >
                <div className="card-content">
                  <div className="logo-container">
                    <img 
                      src={agency.logo} 
                      alt={`${agency.name} logo`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="logo-fallback" style={{ display: 'none' }}>
                      {agency.name.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                  <div className="agency-name">{agency.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="progress-indicators">
            {trustedAgencies.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeCard ? 'active' : ''}`}
                onClick={() => setActiveCard(index)}
                aria-label={`View ${trustedAgencies[index].name}`}
              />
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Network;