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
import AboutUs from './components/AboutUs/AboutUs.jsx'; // Import the new About component
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
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Route */}
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
          
          {/* About Us Route - NEW */}
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
          
          {/* 404 Route */}
          <Route path="*" element={
            <div style={{ 
              minHeight: '100vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
              padding: '2rem'
            }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Page not found</p>
              <a 
                href="/" 
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  borderRadius: '12px', 
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                Return Home
              </a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;