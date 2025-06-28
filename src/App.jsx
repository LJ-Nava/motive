import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Home/Header/Header.jsx';
import Hero from './components/Home/Hero/Hero.jsx';
import Services from './components/Home/Services/Services.jsx';
import Network from './components/Home/Network/Network.jsx';
import Testimonials from './components/Home/Testimonials/Testimonials.jsx';
import Footer from './components/Home/Footer/Footer.jsx';
import CoverageAreas from './components/Coverage/CoverageAreas.jsx';
import AgenciesJoin from './components/Form/AgenciesJoin.jsx';
import TherapistApplicationForm from './components/Form/TherapistApplicationForm.jsx';
import AboutUs from './components/AboutUs/AboutUs.jsx';
import './components/styles/globals.scss';

// Home Page Component
const HomePage = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Services />
        <Network />
        <Testimonials />
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
  // 🎯 Detecta automáticamente si está en desarrollo o producción
  // En desarrollo: PUBLIC_URL=/ (desde .env.development)
  // En producción: PUBLIC_URL=/motive (desde homepage en package.json)
  const basename = process.env.PUBLIC_URL || '';
  
  return (
    <Router basename={basename}>
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
          
          {/* Future Routes - Ready for expansion */}
          {/* <Route path="/contact" element={
            <PageLayout>
              <Contact />
            </PageLayout>
          } /> */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;