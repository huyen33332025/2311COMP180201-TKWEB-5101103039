import React from 'react';
import { carouselImages } from '../../data/tourData';

function ImageCarousel({ onImageClick }) {
  return (
    <div className="container-inner" data-aos="zoom-in">
      <div id="tourCarousel" className="carousel slide carousel-fade shadow-sm" data-bs-ride="carousel" data-bs-touch="true" aria-label="Ảnh tour">
        
        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#tourCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-label={`Ảnh ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {carouselImages.map((img, index) => (
            <div key={index} className={`carousel-item ${img.active ? 'active' : ''}`} data-bs-interval="5000">
              <img 
                src={img.src} 
                className="d-block w-100 lb-img" 
                alt={img.alt} 
                data-caption={img.caption}
                onClick={() => onImageClick(img.src, img.caption)}
                style={{ cursor: 'pointer' }}
              />
              <div className="carousel-caption"><h5>{img.caption}</h5></div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#tourCarousel" data-bs-slide="prev" aria-label="Trước">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#tourCarousel" data-bs-slide="next" aria-label="Tiếp">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
}

export default ImageCarousel;