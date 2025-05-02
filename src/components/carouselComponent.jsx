import React from 'react';
import img1 from '../assets/gimnasio.png';

const Galeria = () => {
  return (
    <div
      id="galeria"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ height: '400px', overflow: 'hidden', position: 'relative' }}
    >
      <div className="carousel-inner h-100">
        <div className="carousel-item active h-100">
          <img
            src={img1}
            className="d-block w-100 h-100"
            alt="Imagen 1"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>


      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#customCarousel"
        data-bs-slide="prev"
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          zIndex: 10,
        }}
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
          style={{
    display: 'inline-block',
    border: 'solid #ffff00',
    borderWidth: '0 8px 8px 0',
    padding: '10px',
    transform: 'rotate(135deg)',
    WebkitTransform: 'rotate(135deg)',
  }}
        ></span>
        <span className="visually-hidden">Anterior</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#customCarousel"
        data-bs-slide="next"
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          zIndex: 10,
        }}
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
           style={{
    display: 'inline-block',
    border: 'solid #ffff00',
    borderWidth: '0 8px 8px 0',
    padding: '10px',
    transform: 'rotate(-45deg)',
    WebkitTransform: 'rotate(-45deg)',
  }}
        ></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Galeria;
