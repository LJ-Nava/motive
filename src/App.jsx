import React from 'react';
// ✅ CAMBIO PRINCIPAL: HashRouter en lugar de BrowserRouter
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Home/Header/Header';
import Hero from './components/Home/Hero/Hero';
import CoverageSection from './components/Home/CoverageSection/CoverageSection';
import AgenciesSlideshow from './components/Home/AgenciesSlideshow/AgenciesSlideshow';
import Services from './components/Home/Services/Services';
import Footer from './components/Home/Footer/Footer';
import CoverageAreas from './components/Coverage/CoverageAreas';
import AgenciesJoin from './components/Form/AgenciesJoin';
import TherapistApplicationForm from './components/Form/TherapistApplicationForm';
import AboutUs from './components/AboutUs/AboutUs';
import ReferralForm from './components/Referrals/ReferralForm';
import './components/styles/globals.scss';

// Home Page Component
const HomePage = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <CoverageSection />
        <AgenciesSlideshow />
        <Services />
      </main>
      <Footer />
    </div>
  );
};

// Layout Component for pages with header and footer
const PageLayout = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  // ✅ HashRouter no necesita basename, maneja las rutas automáticamente
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Route - Carga Hero directamente */}
          <Route path="/" element={<HomePage />} />

          {/* Coverage Areas Route */}
          <Route
            path="/coverage-areas"
            element={
              <PageLayout>
                <CoverageAreas />
              </PageLayout>
            }
          />

          {/* Agencies Join Route */}
          <Route
            path="/agencies/join"
            element={
              <PageLayout>
                <AgenciesJoin />
              </PageLayout>
            }
          />

          {/* Premium Therapist Application Route */}
          <Route
            path="/therapists/apply"
            element={
              <PageLayout>
                <TherapistApplicationForm />
              </PageLayout>
            }
          />

          {/* About Us Route */}
          <Route
            path="/about"
            element={
              <PageLayout>
                <AboutUs />
              </PageLayout>
            }
          />

          {/* Referrals Route */}
          <Route
            path="/referrals"
            element={
              <PageLayout>
                <ReferralForm />
              </PageLayout>
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;