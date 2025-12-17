import React from 'react';
import '../../styles/home/AgenciesSlideshow.scss';

// Importar logos locales
import unisonLogo from '../../../assets/logos/unison.png';
import intracareLogo from '../../../assets/logos/intracare.png';
import vastLogo from '../../../assets/logos/vast.png';
import dignitonicLogo from '../../../assets/logos/dignitonic.png';
import alaphiaLogo from '../../../assets/logos/alaphia.png';
import allcitizensLogo from '../../../assets/logos/allcitizens.png';
import supportiveLogo from '../../../assets/logos/supportive.png';

const AgenciesSlideshow = () => {
  const agencies = [
    { name: 'Unison Health Services', logo: unisonLogo },
    { name: 'Intracare Home Health', logo: intracareLogo },
    { name: 'Vast Home Health', logo: vastLogo },
    { name: 'DigniTonic Care', logo: dignitonicLogo },
    { name: 'Alaphia Care', logo: alaphiaLogo },
    { name: 'All Citizens Home Health', logo: allcitizensLogo },
    { name: 'Supportive Health Group', logo: supportiveLogo }
  ];

  return (
    <section className="agencies-carousel">
      <h2 className="agencies-carousel__title">
        Home Health Agencies <span>Who Trust Motive</span>
      </h2>

      <div className="agencies-carousel__track-wrapper">
        <div className="agencies-carousel__track">
          {/* Primera copia */}
          {agencies.map((agency, index) => (
            <div key={`a-${index}`} className="agencies-carousel__item">
              <img src={agency.logo} alt={agency.name} />
            </div>
          ))}
          {/* Segunda copia para loop infinito */}
          {agencies.map((agency, index) => (
            <div key={`b-${index}`} className="agencies-carousel__item">
              <img src={agency.logo} alt={agency.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgenciesSlideshow;
