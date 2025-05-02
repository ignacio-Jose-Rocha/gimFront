import React, { useState, useEffect } from 'react';
import './actividades.css';

const actividades = () => {
  const actividades = [
    {
      imagen: 'https://images.unsplash.com/photo-1584466977773-8ec0842ecf7c',
      descripcion: 'Clase de Yoga',
    },
    {
      imagen: 'https://images.unsplash.com/photo-1571019613914-85f342c1d4a9',
      descripcion: 'Spinning',
    },
    {
      imagen: 'https://images.unsplash.com/photo-1583454110557-e7e61024227b',
      descripcion: 'Funcional',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? actividades.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === actividades.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container">
      <button className="prev-button" onClick={prevSlide}>
        &lt;
      </button>
      <div className="carousel-slide">
        <img
          src={actividades[currentIndex].imagen}
          alt={actividades[currentIndex].descripcion}
          className="actividad-imagen"
        />
        <div className="actividad-descripcion">
          <p>{actividades[currentIndex].descripcion}</p>
        </div>
      </div>
      <button className="next-button" onClick={nextSlide}>
        &gt;
      </button>
      <div className="carousel-dots">
        {actividades.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default actividades;
