import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { projectInfo } from './data/tourData';

import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import PriceBar from './components/layout/PriceBar';
import BackToTopButton from './components/common/BackToTopButton';

import ImageCarousel from './components/sections/ImageCarousel';
import AboutSection from './components/sections/AboutSection';
import OverviewSection from './components/sections/OverviewSection';
import ItinerarySection from './components/sections/ItinerarySection';
import NotesSection from './components/sections/NotesSection';
import ReviewsSection from './components/sections/ReviewsSection';

import BookingModal from './components/modals/BookingModal';
import ContactModal from './components/modals/ContactModal';
import SuccessModal from './components/modals/SuccessModal';
import Lightbox from './components/modals/Lightbox';

const ProjectInfo = () => (
  <div className="card" style={{ width: '25rem', border: 'white', display: 'inline-block' }}>
    <div className="card-body">
      <h5 className="card-title" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: 'rgb(25, 95, 185)' }}>
        {projectInfo.title}
      </h5>
      <hr style={{ borderColor: 'rgb(25, 95, 185)' }} />
      <h6 className="card-subtitle" style={{ color: 'rgb(25, 95, 185)' }}>{projectInfo.instructor}</h6>
    </div>
  </div>
);

const HomePage = ({ 
    bookingCode, setBookingCode, lightboxData, setLightboxData,
    progressWidth, isScrolled, showBackToTop, handleOpenLightbox, handleCloseLightbox, handleBookingSuccess
}) => {
    return (
        <>
            <div id="readingProgress" style={{ width: progressWidth }} aria-hidden="true"></div>
            <Header />
            <ImageCarousel onImageClick={handleOpenLightbox} />
            <Navigation isScrolled={isScrolled} />

            <main>
              <AboutSection />
              <OverviewSection />
              <ItinerarySection />
              <NotesSection />
              <ReviewsSection />
            </main>

            <Footer />
            <PriceBar />
            <BackToTopButton isVisible={showBackToTop} />

            <BookingModal onBookingSuccess={handleBookingSuccess} />
            <ContactModal />
            <SuccessModal bookingCode={bookingCode} />
            <Lightbox 
                src={lightboxData.src} 
                caption={lightboxData.caption} 
                onClose={handleCloseLightbox} 
            />
        </>
    );
};

function App() {
  const [bookingCode, setBookingCode] = useState('');
  const [lightboxData, setLightboxData] = useState({ src: '', caption: '' });

  const [progressWidth, setProgressWidth] = useState('0%');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercent = height > 0 ? (winScroll / height) * 100 : 0;
    setProgressWidth(scrolledPercent + '%');

    setIsScrolled(winScroll > 50);
    setShowBackToTop(winScroll > 300);
  };

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
    });
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenLightbox = (src, caption) => {
    setLightboxData({ src, caption });
  };

  const handleCloseLightbox = () => {
    setLightboxData({ src: '', caption: '' });
  };

  const handleBookingSuccess = (code) => {
    setBookingCode(code);
  };
  
  const homeProps = { 
    bookingCode, setBookingCode, lightboxData, setLightboxData,
    progressWidth, isScrolled, showBackToTop, handleOpenLightbox, handleCloseLightbox, handleBookingSuccess
  };

  return (
    <>
      <ProjectInfo />
      <HomePage {...homeProps} />
    </>
  );
}

export default App;