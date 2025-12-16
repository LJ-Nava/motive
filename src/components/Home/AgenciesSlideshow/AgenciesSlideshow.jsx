import React from 'react';
import '../../styles/home/AgenciesSlideshow.scss';

const AgenciesSlideshow = () => {
  // Solo agencias de home health verificadas
  const agencies = [
    {
      name: 'Supportive Home Health',
      logo: 'https://supportivehealthgroup.com/wp-content/uploads/2023/04/qt_q_55-removebg-preview.png'
    },
    {
      name: 'Unison Health Services',
      logo: 'https://static.wixstatic.com/media/7438d9_91426f0fdd6945f7b74208a602d45cc2~mv2.png/v1/crop/x_0,y_1077,w_3125,h_971/fill/w_267,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Unison%20Logo%20deliver-01.png'
    },
    {
      name: 'Intracare Home Health Providers Inc.',
      logo: 'https://intracareinc.com/images/ICHHPInc.-Logo1248.png'
    },
    {
      name: 'Vast Home Health Agency',
      logo: 'https://vasthh.com/wp-content/uploads/2022/10/logo.png'
    },
    {
      name: 'Hand in Heart Home Health Services',
      logo: 'https://www.handinhearthomehealth.com/wp-content/themes/handinheart/images/main_logo.png'
    },
    {
      name: 'Continuity Providers',
      logo: 'https://continuityproviders.com/wp-content/themes/continuityph/images/main_logo.png'
    },
    {
      name: 'DigniTonic Care',
      logo: 'https://dignitonic.com/wp-content/uploads/2021/03/DigniTonic-Care-e1616483890614.png'
    },
    {
      name: 'Alaphia Care',
      logo: 'https://www.alaphiacare.com/wp-content/themes/alaphiacare/images/main_logo.png'
    },
    {
      name: 'Prime Healthcare Services',
      logo: 'https://www.primehsinc.com/wp-content/themes/primecarebe588/images/main-logo.png'
    },
    {
      name: 'All Citizens Home Health',
      logo: 'https://www.allcitizenshh.com/wp-content/uploads/2024/09/allcitizenslogo.png'
    },
    {
      name: 'Bright Home Healthcare',
      logo: 'https://www.brighthhc.com/wp-content/themes/brighthomean290/images/main-logo.png'
    },
    {
      name: 'Equanimity Health',
      logo: 'https://www.equanhealth.com/wp-content/themes/equanimityan736/images/main-logo.png'
    },
    {
      name: 'GAHHA',
      logo: 'https://images.squarespace-cdn.com/content/v1/64e2e2ac7bfb71781737c2d2/48991c0a-d74b-4aec-be93-014d054472f5/Gahha+logo.png?format=1500w'
    },
    {
      name: 'Home Health Agency',
      logo: 'https://images.squarespace-cdn.com/content/v1/67c3acc1d7b07669d3b919a2/cdaaf1ad-3f6c-46a3-aeec-5cb7031b7656/Website+Header.png?format=1500w'
    },
    {
      name: 'Healthcare Services',
      logo: 'https://s3-media0.fl.yelpcdn.com/bphoto/smdSYtSM3TpXGxurLA0Uhg/348s.jpg'
    },
    {
      name: 'Americare Home Health',
      logo: 'https://www.americarehhinc.com/wp-content/themes/americarehh/images/main-logo.png'
    }
  ];

  // Duplicar para crear el efecto loop infinito
  const duplicatedAgencies = [...agencies, ...agencies];

  return (
    <section className="agencies-slideshow">
      <div className="agencies-slideshow__wrapper">

        {/* Título */}
        <div className="agencies-slideshow__header">
          <h2 className="agencies-slideshow__title">
            Home Health Agencies <span className="agencies-slideshow__highlight">Who Trust Motive</span>
          </h2>
        </div>

        {/* Slideshow Container - Una sola línea */}
        <div className="agencies-slideshow__container">
          <div className="agencies-slideshow__row">
            <div className="agencies-slideshow__track agencies-slideshow__track--single">
              {duplicatedAgencies.map((agency, index) => (
                <div key={`agency-${index}`} className="agencies-slideshow__item">
                  <div className="agencies-slideshow__card">
                    <img
                      src={agency.logo}
                      alt={`${agency.name} logo`}
                      className="agencies-slideshow__logo"
                      onLoad={(e) => {
                        e.target.parentElement.parentElement.style.display = 'block';
                      }}
                      onError={(e) => {
                        e.target.parentElement.parentElement.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AgenciesSlideshow;