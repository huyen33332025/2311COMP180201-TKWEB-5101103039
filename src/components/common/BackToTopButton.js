import React from 'react';

function BackToTopButton({ isVisible }) {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      id="backToTop" 
      aria-label="Lên đầu trang"
      onClick={scrollToTop}
      style={{ display: isVisible ? 'flex' : 'none' }} 
    >
      <i className="bi bi-arrow-up" style={{ fontSize: '1.12rem' }}></i>
    </button>
  );
}

export default BackToTopButton;