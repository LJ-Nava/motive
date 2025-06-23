import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from '../Home/Header/Header.jsx';
import Footer from '../Home/Footer/Footer.jsx';
import '../styles/coverage/CoverageAreas.scss';
import CaliforniaMapImage from '../../assets/CAMap.png';

const CoverageAreas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Real coverage data organized by discipline - UPDATED WITH REAL DATA
  const coverageData = {
    // Physical Therapy Areas (PT + PTA combined)
    PT: [
      {
        id: 'inglewood-pt',
        name: 'Inglewood Area',
        strength: 'premium',
        professionalCount: 22,
        responseTime: '<2hrs',
        cities: ['Inglewood', 'Culver City', 'Westchester', 'Playa del Rey', 'El Segundo', 'Marina del Rey', 'Playa Vista'],
        languages: ['English', 'Spanish', 'Tagalog', 'Korean', 'Chinese (Cantonese)', 'French'],
        coordinates: { x: 160, y: 280 },
        latLng: { lat: 33.9616, lng: -118.3531 }
      },
      {
        id: 'glendale-pt',
        name: 'Glendale Area',
        strength: 'premium',
        professionalCount: 20,
        responseTime: '<2hrs',
        cities: ['Glendale', 'Burbank', 'North Hollywood', 'Eagle Rock', 'La Crescenta', 'Tujunga', 'Sunland'],
        languages: ['English', 'Spanish', 'Armenian', 'Korean', 'Russian', 'Tagalog'],
        coordinates: { x: 140, y: 140 },
        latLng: { lat: 34.1425, lng: -118.2551 }
      },
      {
        id: 'burbank-pt',
        name: 'Burbank Area',
        strength: 'premium',
        professionalCount: 18,
        responseTime: '<2hrs',
        cities: ['Burbank', 'North Hollywood', 'Studio City', 'Valley Village', 'Toluca Lake'],
        languages: ['English', 'Spanish', 'Armenian', 'Korean', 'Tagalog'],
        coordinates: { x: 130, y: 120 },
        latLng: { lat: 34.1808, lng: -118.3090 }
      },
      {
        id: 'long-beach-pt',
        name: 'Long Beach Area',
        strength: 'premium',
        professionalCount: 18,
        responseTime: '<2hrs',
        cities: ['Long Beach', 'Carson', 'Compton', 'Lakewood', 'Bellflower', 'Cerritos', 'Signal Hill'],
        languages: ['English', 'Spanish', 'Tagalog', 'Vietnamese', 'Chinese (Cantonese)'],
        coordinates: { x: 200, y: 340 },
        latLng: { lat: 33.7701, lng: -118.1937 }
      },
      {
        id: 'pasadena-pt',
        name: 'Pasadena Area',
        strength: 'premium',
        professionalCount: 17,
        responseTime: '<2hrs',
        cities: ['Pasadena', 'Alhambra', 'San Marino', 'Arcadia', 'Monrovia', 'Temple City', 'South Pasadena'],
        languages: ['English', 'Spanish', 'Japanese', 'Russian', 'Armenian', 'Tagalog'],
        coordinates: { x: 160, y: 120 },
        latLng: { lat: 34.1478, lng: -118.1445 }
      },
      {
        id: 'west-hollywood-pt',
        name: 'West Hollywood Area',
        strength: 'strong',
        professionalCount: 16,
        responseTime: '<2hrs',
        cities: ['West Hollywood', 'Hollywood', 'Beverly Hills', 'Mid-City', 'Fairfax', 'Melrose'],
        languages: ['English', 'Spanish', 'Korean', 'Russian', 'Farsi', 'Punjabi', 'Hindi'],
        coordinates: { x: 140, y: 200 },
        latLng: { lat: 34.0900, lng: -118.3617 }
      },
      {
        id: 'north-hollywood-pt',
        name: 'North Hollywood Area',
        strength: 'strong',
        professionalCount: 15,
        responseTime: '<3hrs',
        cities: ['North Hollywood', 'Van Nuys', 'Sherman Oaks', 'Studio City', 'Valley Glen'],
        languages: ['English', 'Spanish', 'Armenian', 'Tagalog', 'Russian'],
        coordinates: { x: 120, y: 140 },
        latLng: { lat: 34.1869, lng: -118.3798 }
      },
      {
        id: 'torrance-pt',
        name: 'Torrance Area',
        strength: 'strong',
        professionalCount: 15,
        responseTime: '<3hrs',
        cities: ['Torrance', 'Redondo Beach', 'Manhattan Beach', 'Hermosa Beach', 'Gardena', 'Hawthorne'],
        languages: ['English', 'Spanish', 'Tagalog', 'Japanese'],
        coordinates: { x: 160, y: 320 },
        latLng: { lat: 33.8358, lng: -118.3406 }
      },
      {
        id: 'orange-county-pt',
        name: 'Orange County',
        strength: 'strong',
        professionalCount: 13,
        responseTime: '<3hrs',
        cities: ['Anaheim', 'Orange', 'Fullerton', 'Santa Ana', 'Irvine', 'Huntington Beach', 'Buena Park', 'Garden Grove', 'Tustin'],
        languages: ['English', 'Spanish', 'Tagalog', 'Vietnamese', 'Cambodian', 'Japanese'],
        coordinates: { x: 240, y: 280 },
        latLng: { lat: 33.7175, lng: -117.8311 }
      },
      {
        id: 'inland-empire-pt',
        name: 'Inland Empire',
        strength: 'standard',
        professionalCount: 9,
        responseTime: '<4hrs',
        cities: ['Riverside', 'Corona', 'Rancho Cucamonga', 'Ontario', 'San Bernardino', 'Fontana', 'Loma Linda', 'Menifee'],
        languages: ['English', 'Spanish', 'Tagalog', 'Arabic', 'Bengali'],
        coordinates: { x: 300, y: 200 },
        latLng: { lat: 33.9533, lng: -117.3962 }
      }
    ],

    // Occupational Therapy Areas (OT + COTA combined)
    OT: [
      {
        id: 'glendale-ot',
        name: 'Glendale Area',
        strength: 'premium',
        professionalCount: 9,
        responseTime: '<2hrs',
        cities: ['Glendale', 'Burbank', 'Pasadena', 'Eagle Rock', 'Silverlake'],
        languages: ['English', 'Spanish', 'Armenian', 'Korean', 'Russian'],
        coordinates: { x: 140, y: 140 },
        latLng: { lat: 34.1425, lng: -118.2551 }
      },
      {
        id: 'long-beach-ot',
        name: 'Long Beach Area',
        strength: 'premium',
        professionalCount: 8,
        responseTime: '<2hrs',
        cities: ['Long Beach', 'Carson', 'Torrance', 'Compton', 'Bellflower', 'Cerritos'],
        languages: ['English', 'Spanish', 'Tagalog', 'Vietnamese'],
        coordinates: { x: 200, y: 340 },
        latLng: { lat: 33.7701, lng: -118.1937 }
      },
      {
        id: 'burbank-ot',
        name: 'Burbank Area',
        strength: 'strong',
        professionalCount: 8,
        responseTime: '<3hrs',
        cities: ['Burbank', 'North Hollywood', 'Studio City', 'Glendale'],
        languages: ['English', 'Spanish', 'Armenian', 'Korean'],
        coordinates: { x: 130, y: 120 },
        latLng: { lat: 34.1808, lng: -118.3090 }
      },
      {
        id: 'pasadena-ot',
        name: 'Pasadena Area',
        strength: 'strong',
        professionalCount: 6,
        responseTime: '<3hrs',
        cities: ['Pasadena', 'Alhambra', 'Arcadia', 'Monrovia'],
        languages: ['English', 'Spanish', 'Japanese', 'Armenian'],
        coordinates: { x: 160, y: 120 },
        latLng: { lat: 34.1478, lng: -118.1445 }
      },
      {
        id: 'orange-county-ot',
        name: 'Orange County',
        strength: 'standard',
        professionalCount: 5,
        responseTime: '<4hrs',
        cities: ['Anaheim', 'Orange', 'Santa Ana', 'Irvine', 'Fullerton'],
        languages: ['English', 'Spanish', 'Vietnamese', 'Cambodian'],
        coordinates: { x: 240, y: 280 },
        latLng: { lat: 33.7175, lng: -117.8311 }
      },
      {
        id: 'west-hollywood-ot',
        name: 'West Hollywood Area',
        strength: 'standard',
        professionalCount: 4,
        responseTime: '<4hrs',
        cities: ['West Hollywood', 'Beverly Hills', 'Santa Monica', 'Culver City'],
        languages: ['English', 'Spanish', 'Russian'],
        coordinates: { x: 140, y: 200 },
        latLng: { lat: 34.0900, lng: -118.3617 }
      }
    ],

    // Speech Therapy Areas (ST only - very limited coverage)
    ST: [
      {
        id: 'west-la-st',
        name: 'West Los Angeles',
        strength: 'standard',
        professionalCount: 1,
        responseTime: '<4hrs',
        cities: ['Brentwood', 'Bel Air', 'Beverly Hills', 'Westwood', 'Pico-Robertson'],
        languages: ['English'],
        coordinates: { x: 120, y: 200 },
        latLng: { lat: 34.0522, lng: -118.4437 }
      },
      {
        id: 'south-bay-st',
        name: 'South Bay',
        strength: 'standard',
        professionalCount: 1,
        responseTime: '<4hrs',
        cities: ['Torrance', 'Redondo Beach', 'Manhattan Beach', 'Hermosa Beach', 'El Segundo', 'Lomita'],
        languages: ['English', 'Spanish'],
        coordinates: { x: 160, y: 320 },
        latLng: { lat: 33.8317, lng: -118.2943 }
      }
    ],

    // Combined areas (when "all" is selected)
    combined: [
      {
        id: 'inglewood-combined',
        name: 'Inglewood Area',
        strength: 'premium',
        professionalCount: 22,
        responseTime: '<2hrs',
        services: ['PT', 'PTA', 'OT', 'COTA'],
        description: 'Strongest coverage area with excellent PT/PTA network and good OT support.',
        cities: ['Inglewood', 'Culver City', 'Westchester', 'Playa del Rey', 'El Segundo', 'Marina del Rey', 'Playa Vista'],
        languages: ['English', 'Spanish', 'Tagalog', 'Korean', 'Chinese (Cantonese)', 'French'],
        coordinates: { x: 160, y: 280 },
        latLng: { lat: 33.9616, lng: -118.3531 }
      },
      {
        id: 'glendale-combined',
        name: 'Glendale Area',
        strength: 'premium',
        professionalCount: 20,
        responseTime: '<2hrs',
        services: ['PT', 'PTA', 'OT', 'COTA'],
        description: 'Comprehensive coverage with strong multilingual capabilities.',
        cities: ['Glendale', 'Burbank', 'North Hollywood', 'Eagle Rock', 'La Crescenta', 'Tujunga', 'Sunland'],
        languages: ['English', 'Spanish', 'Armenian', 'Korean', 'Russian', 'Tagalog'],
        coordinates: { x: 140, y: 140 },
        latLng: { lat: 34.1425, lng: -118.2551 }
      },
      {
        id: 'burbank-combined',
        name: 'Burbank Area',
        strength: 'premium',
        professionalCount: 18,
        responseTime: '<2hrs',
        services: ['PT', 'PTA', 'OT', 'COTA'],
        description: 'Excellent valley coverage with balanced therapy disciplines.',
        cities: ['Burbank', 'North Hollywood', 'Studio City', 'Valley Village', 'Toluca Lake'],
        languages: ['English', 'Spanish', 'Armenian', 'Korean', 'Tagalog'],
        coordinates: { x: 130, y: 120 },
        latLng: { lat: 34.1808, lng: -118.3090 }
      },
      {
        id: 'long-beach-combined',
        name: 'Long Beach Area',
        strength: 'premium',
        professionalCount: 18,
        responseTime: '<2hrs',
        services: ['PT', 'PTA', 'OT', 'COTA'],
        description: 'Strong coastal coverage with diverse language support.',
        cities: ['Long Beach', 'Carson', 'Compton', 'Lakewood', 'Bellflower', 'Cerritos', 'Signal Hill'],
        languages: ['English', 'Spanish', 'Tagalog', 'Vietnamese', 'Chinese (Cantonese)'],
        coordinates: { x: 200, y: 340 },
        latLng: { lat: 33.7701, lng: -118.1937 }
      },
      {
        id: 'pasadena-combined',
        name: 'Pasadena Area',
        strength: 'premium',
        professionalCount: 17,
        responseTime: '<2hrs',
        services: ['PT', 'PTA', 'OT', 'COTA'],
        description: 'Solid east LA coverage with Japanese language capabilities.',
        cities: ['Pasadena', 'Alhambra', 'San Marino', 'Arcadia', 'Monrovia', 'Temple City', 'South Pasadena'],
        languages: ['English', 'Spanish', 'Japanese', 'Russian', 'Armenian', 'Tagalog'],
        coordinates: { x: 160, y: 120 },
        latLng: { lat: 34.1478, lng: -118.1445 }
      },
      {
        id: 'west-hollywood-combined',
        name: 'West Hollywood Area',
        strength: 'strong',
        professionalCount: 16,
        responseTime: '<2hrs',
        services: ['PT', 'PTA', 'OT'],
        description: 'Premium central LA coverage with diverse languages including Farsi and Hindi.',
        cities: ['West Hollywood', 'Hollywood', 'Beverly Hills', 'Mid-City', 'Fairfax', 'Melrose'],
        languages: ['English', 'Spanish', 'Korean', 'Russian', 'Farsi', 'Punjabi', 'Hindi'],
        coordinates: { x: 140, y: 200 },
        latLng: { lat: 34.0900, lng: -118.3617 }
      },
      {
        id: 'torrance-combined',
        name: 'Torrance Area',
        strength: 'strong',
        professionalCount: 15,
        responseTime: '<3hrs',
        services: ['PT', 'PTA', 'OT', 'COTA', 'ST'],
        description: 'Only area with Speech Therapy coverage plus strong PT/OT services.',
        cities: ['Torrance', 'Redondo Beach', 'Manhattan Beach', 'Hermosa Beach', 'Gardena', 'Hawthorne'],
        languages: ['English', 'Spanish', 'Tagalog', 'Japanese'],
        coordinates: { x: 160, y: 320 },
        latLng: { lat: 33.8358, lng: -118.3406 }
      }
    ]
  };

  // Search location using Nominatim API (OpenStreetMap - Gratis, sin API key)
  const searchLocationHandler = async () => {
    if (!searchLocation.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchLocation)}&limit=5&addressdetails=1&countrycodes=us`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        setSearchResults(data);
        // Auto-select first result
        const firstResult = data[0];
        setSelectedLocation({
          name: firstResult.display_name,
          lat: parseFloat(firstResult.lat),
          lng: parseFloat(firstResult.lon)
        });
      } else {
        setSearchResults([]);
        setSelectedLocation(null);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
      setSelectedLocation(null);
    } finally {
      setIsSearching(false);
    }
  };

  // Initialize map display when location is selected
  useEffect(() => {
    if (selectedLocation) {
      // Create a simple map display using OpenStreetMap tiles
      const mapContainer = document.getElementById('openstreet-map');
      if (mapContainer) {
        // Clear previous content
        mapContainer.innerHTML = '';
        
        // Create iframe with OpenStreetMap
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${selectedLocation.lng-0.01},${selectedLocation.lat-0.01},${selectedLocation.lng+0.01},${selectedLocation.lat+0.01}&layer=mapnik&marker=${selectedLocation.lat},${selectedLocation.lng}`;
        iframe.style.width = '100%';
        iframe.style.height = '250px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '12px';
        
        mapContainer.appendChild(iframe);
      }
    }
  }, [selectedLocation]);

  // Get current regions based on selected service
  const getCurrentRegions = () => {
    if (selectedService === 'all') {
      return coverageData.combined;
    }
    return coverageData[selectedService] || [];
  };

  const filteredRegions = useMemo(() => {
    const currentRegions = getCurrentRegions();
    return currentRegions.filter(region => {
      const matchesSearch = !searchTerm || 
        region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        region.cities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        region.languages.some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesSearch;
    });
  }, [searchTerm, selectedService]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const getStrengthColor = (strength) => {
    switch(strength) {
      case 'premium': return '#10B981';
      case 'strong': return '#3B82F6';
      case 'standard': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getServiceStats = () => {
    const allRegions = getCurrentRegions();
    const totalProfessionals = allRegions.reduce((sum, region) => sum + region.professionalCount, 0);
    const totalCities = [...new Set(allRegions.flatMap(region => region.cities))].length;
    const totalLanguages = [...new Set(allRegions.flatMap(region => region.languages))].length;
    
    return {
      professionals: totalProfessionals,
      cities: totalCities,
      languages: totalLanguages,
      regions: allRegions.length
    };
  };

  const stats = getServiceStats();

  return (
    <div className="coverage-areas-redesign">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🌟 Serving Southern California with Excellence</span>
            </div>
            <h1 className="hero-title">Where We Serve</h1>
            <p className="hero-subtitle">
              Professional therapy staffing across Southern California. We connect skilled therapists with home health agencies to provide quality care in your community.
            </p>
            
            <div className="search-container">
              <div className="search-box">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search by city or language..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="search-clear"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">150+</span>
                <span className="stat-label">Certified Therapists</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">60+</span>
                <span className="stat-label">Cities Covered</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">15+</span>
                <span className="stat-label">Languages</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">&lt;3hrs</span>
                <span className="stat-label">Avg Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* California Coverage Map Section - Solo imagen */}
      <section className="map-section">
        <div className="map-container">
          <h2 className="map-title">California Coverage Map</h2>
          <p className="map-subtitle">Our therapy network across Southern California</p>
          
          <div className="map-wrapper">
            <div className="california-map-image">
              <img 
                src={CaliforniaMapImage} 
                alt="California Coverage Areas Map"
                className="coverage-map-img"
              />
              <div className="map-overlay">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Filter & Coverage Cards */}
      <section className="coverage-section">
        <div className="coverage-container">
          <div className="section-header">
            <h2>Our Coverage Areas</h2>
            <div className="filter-controls">
              <div className="service-selector">
                <label htmlFor="service-filter">Select Therapy Type:</label>
                <select 
                  id="service-filter"
                  value={selectedService} 
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="service-filter"
                >
                  <option value="all">All Services (Combined Coverage)</option>
                  <option value="PT">Physical Therapy (PT/PTA)</option>
                  <option value="OT">Occupational Therapy (OT/COTA)</option>
                  <option value="ST">Speech Therapy (SLP)</option>
                </select>
              </div>
            </div>
          </div>

          {selectedService === 'all' && (
            <div className="service-note">
              <p>
                <strong>Combined Coverage:</strong> Showing areas where we have multiple therapy disciplines available. 
                Select a specific therapy type above to see detailed coverage for that discipline.
              </p>
            </div>
          )}

          <div className="coverage-grid">
            {filteredRegions.map((region) => (
              <div key={region.id} className={`coverage-card ${region.strength}`}>
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="card-title-group">
                    <h3 className="card-title">{region.name}</h3>
                    <div className="coverage-level">
                      <span 
                        className="level-indicator"
                        style={{ backgroundColor: getStrengthColor(region.strength) }}
                      ></span>
                      <span>{region.strength.charAt(0).toUpperCase() + region.strength.slice(1)} Coverage</span>
                    </div>
                  </div>
                </div>

                {region.description && (
                  <p className="card-description">{region.description}</p>
                )}

                <div className="card-stats">
                  <div className="stat">
                    <span className="stat-value">{region.professionalCount}+</span>
                    <span className="stat-label">Therapists</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{region.responseTime}</span>
                    <span className="stat-label">Response</span>
                  </div>
                </div>

                {region.services && (
                  <div className="card-services">
                    <span className="services-label">Services Available:</span>
                    <div className="services-badges">
                      {region.services.map((service) => (
                        <span key={service} className="service-badge">{service}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="card-languages">
                  <span className="languages-label">Languages:</span>
                  <div className="languages-list">
                    {region.languages.map((language, index) => (
                      <span key={language} className="language-tag">
                        {language}{index < region.languages.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card-cities">
                  <details className="cities-details">
                    <summary>Cities Served ({region.cities.length})</summary>
                    <div className="cities-grid">
                      {region.cities.map((city) => (
                        <span key={city} className="city-item">{city}</span>
                      ))}
                    </div>
                  </details>
                </div>

                <button className="card-cta">
                  <span>Request Coverage</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {filteredRegions.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <h3>No coverage areas found</h3>
              <p>We don't currently have {selectedService === 'all' ? 'combined' : selectedService} coverage in that area, but we're always expanding!</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedService('all');
                }}
                className="reset-button"
              >
                View All Coverage
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Expansion CTA - Con OpenStreetMap (SIN API KEY) */}
      <section className="expansion-section">
        <div className="expansion-container">
          <div className="expansion-content">
            <h2>Don't See Your Area?</h2>
            <p>
              We're actively expanding our network throughout Southern California. Use the map below to search for your specific location or contact us to discuss bringing our therapy services to your community.
            </p>
            <div className="expansion-actions">
              <button className="primary-button">
                <span>Request New Coverage</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className="secondary-button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>Call (213) 495-0092</span>
              </button>
            </div>
            </div>
          
          <div className="expansion-visual">
            <div className="expansion-map-container">
              <h3>Search Your Location</h3>
              <div className="location-search">
                <input 
                  type="text" 
                  placeholder="Enter your city or zip code..."
                  className="location-input"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchLocationHandler()}
                />
                <button 
                  className="search-location-btn"
                  onClick={searchLocationHandler}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <div className="loading-spinner-small"></div>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Resultados de búsqueda */}
              {searchResults.length > 0 && (
                <div className="search-results">
                  <h4>Search Results:</h4>
                  <div className="results-list">
                    {searchResults.slice(0, 3).map((result, index) => (
                      <button
                        key={index}
                        className={`result-item ${selectedLocation && selectedLocation.name === result.display_name ? 'selected' : ''}`}
                        onClick={() => setSelectedLocation({
                          name: result.display_name,
                          lat: parseFloat(result.lat),
                          lng: parseFloat(result.lon)
                        })}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>{result.display_name.split(',').slice(0, 2).join(', ')}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mapa OpenStreetMap con atribución correcta */}
              <div className="mini-map-container">
                {selectedLocation ? (
                  <div>
                    <div className="selected-location">
                      <h4>📍 {selectedLocation.name.split(',').slice(0, 2).join(', ')}</h4>
                    </div>
                    <div className="map-wrapper-osm">
                      <div 
                        id="openstreet-map" 
                        className="mini-map"
                        style={{ height: '250px', borderRadius: '12px', marginTop: '1rem' }}
                      ></div>
                      {/* Atribución requerida por OpenStreetMap */}
                      <div className="osm-attribution">
                        <span>© </span>
                        <a 
                          href="https://www.openstreetmap.org/copyright" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="osm-link"
                        >
                          OpenStreetMap
                        </a>
                        <span> contributors</span>
                      </div>
                    </div>
                    <div className="location-actions">
                      <button className="request-coverage-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        <span>Request Coverage Here</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="map-placeholder">
                    <div className="placeholder-content">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <h4>Search for your location</h4>
                      <p>Enter a city, zip code, or address above to see it on the map</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Nota adicional con atribución a Nominatim */}
              <p className="map-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>We're expanding monthly - your area might be next!</span>
              </p>
              
              <div className="service-attribution">
                <p>
                  <span>Search powered by </span>
                  <a 
                    href="https://nominatim.openstreetmap.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="service-link"
                  >
                    Nominatim
                  </a>
                  <span> • Maps by </span>
                  <a 
                    href="https://www.openstreetmap.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="service-link"
                  >
                    OpenStreetMap
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services Info */}
      <section className="services-info-section">
        <div className="services-info-container">
          <h2>Therapy Services We Staff</h2>
          <div className="services-grid">
            <div className="service-info-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3>Physical Therapy</h3>
              <p>Licensed Physical Therapists (PT) and Physical Therapist Assistants (PTA) specializing in home health rehabilitation.</p>
              <div className="service-stats">
                <span className="service-count">120+ Professionals</span>
                <span className="service-areas">10 Coverage Areas</span>
              </div>
            </div>

            <div className="service-info-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3>Occupational Therapy</h3>
              <p>Licensed Occupational Therapists (OT) and Certified Occupational Therapy Assistants (COTA) focused on daily living skills.</p>
              <div className="service-stats">
                <span className="service-count">40+ Professionals</span>
                <span className="service-areas">6 Coverage Areas</span>
              </div>
            </div>

            <div className="service-info-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 011 1v1a1 1 0 01-1 1v9a2 2 0 01-2 2H6a2 2 0 01-2-2V7a1 1 0 01-1-1V5a1 1 0 011-1h3z"/>
                </svg>
              </div>
              <h3>Speech Therapy</h3>
              <p>Licensed Speech-Language Pathologists (SLP) providing communication and swallowing disorder treatment in home settings.</p>
              <div className="service-stats">
                <span className="service-count">2+ Professionals</span>
                <span className="service-areas">2 Coverage Areas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta-section">
        <div className="footer-cta-container">
          <div className="footer-cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Connect with our team to discuss your therapy staffing needs. We're here to help you provide excellent care to your patients.</p>
            <div className="footer-cta-buttons">
              <button className="cta-primary">
                <span>Get Started Today</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className="cta-secondary">
                <span>Learn More About Our Services</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CoverageAreas;