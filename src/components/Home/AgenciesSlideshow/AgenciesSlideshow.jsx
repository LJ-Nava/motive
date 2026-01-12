import '../../styles/home/AgenciesSlideshow.scss';

/*
// Comentado temporalmente - Confirming approval de las agencias
// Importar logos locales
import unisonLogo from '../../../assets/logos/unison.png';
import intracareLogo from '../../../assets/logos/intracare.png';
import vastLogo from '../../../assets/logos/vast.png';
import dignitonicLogo from '../../../assets/logos/dignitonic.png';
import alaphiaLogo from '../../../assets/logos/alaphia.png';
import allcitizensLogo from '../../../assets/logos/allcitizens.png';
import supportiveLogo from '../../../assets/logos/supportive.png';
*/

const AgenciesSlideshow = () => {
  /*
  // Comentado temporalmente - Confirming approval de las agencias
  const agencies = [
    { name: 'Unison Health Services', logo: unisonLogo },
    { name: 'Intracare Home Health', logo: intracareLogo },
    { name: 'Vast Home Health', logo: vastLogo },
    { name: 'DigniTonic Care', logo: dignitonicLogo },
    { name: 'Alaphia Care', logo: alaphiaLogo },
    { name: 'All Citizens Home Health', logo: allcitizensLogo },
    { name: 'Supportive Health Group', logo: supportiveLogo }
  ];
  */

  // Retornar null temporalmente mientras se confirma aprobación de las agencias
  return null;

  /*
  // Comentado temporalmente - Confirming approval de las agencias
  return (
    <section className="agencies-carousel">
      <h2 className="agencies-carousel__title">
        Home Health Agencies <span>Who Trust Motive</span>
      </h2>

      <div className="agencies-carousel__track-wrapper">
        <div className="agencies-carousel__track">
          {agencies.map((agency, index) => (
            <div key={`a-${index}`} className="agencies-carousel__item">
              <img src={agency.logo} alt={agency.name} />
            </div>
          ))}
          {agencies.map((agency, index) => (
            <div key={`b-${index}`} className="agencies-carousel__item">
              <img src={agency.logo} alt={agency.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  */
};

export default AgenciesSlideshow;
