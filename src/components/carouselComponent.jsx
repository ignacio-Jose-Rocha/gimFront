import React, { useState, useEffect } from 'react';
import img1 from '../assets/gimnasio.png';
import './carouselComponent.css';

const Galeria = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="galeria"
      className="hero-carousel"
    >
      <div className="hero-image-container">
        <img
          src={img1}
          className="hero-image"
          alt="Center Fit Gimnasio"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-title-line">TRANSFORMA</span>
            <span className="hero-title-line">TU VIDA</span>
          </h1>
          <p className="hero-subtitle">Entrena con los mejores profesionales</p>
          <div className="hero-features">
            <div className="feature-item">
              <i className="fas fa-dumbbell"></i>
              <span>Equipamiento Premium</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-users"></i>
              <span>Clases Grupales</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-trophy"></i>
              <span>Resultados Reales</span>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Galeria;
