import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import SpecialOffers from './components/SpecialOffers';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <main>
                  <Hero />
                  <div id="menu-section">
                    <Menu />
                  </div>
                  <SpecialOffers />
                  <Testimonials />
                  <Gallery />
                  <Contact />
                </main>
                <Footer />
              </>
            } />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
