import React, { useState, useEffect } from 'react';
import './Profesores.css';
import joaquinImg from '../assets/joaquin.jpeg';
import facundoImg from '../assets/facundo.jpeg';
import mauricioImg from '../assets/mauricio.jpeg';

const profesoresData = [
  {
    nombre: 'Joaquín Machuca',
    videoUrl: 'https://www.youtube.com/embed/sxelGp7ajNM',
    imagen: joaquinImg,
  },
  {
    nombre: 'Facundo',
    videoUrl: 'https://www.youtube.com/embed/sxelGp7ajNM',
    imagen: facundoImg,
  },
  {
    nombre: 'Mauricio Carrizo',
    videoUrl: 'https://www.youtube.com/embed/sxelGp7ajNM',
    imagen: mauricioImg,
  },
];

const Profesores = () => {
  const [videoActivo, setVideoActivo] = useState(null);
  const [esMobile, setEsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setEsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div id="profesores" className="container py-5 text-center">
      <h2 className="mb-4 text-orange">Conocé a Nuestros Profesores</h2>
      <div className="row justify-content-center">
        {profesoresData.map((profesor, index) => (
  <div
    className="col-md-4 mb-4"
    key={index}
    onMouseEnter={() => !esMobile && setVideoActivo(index)}
    onMouseLeave={() => !esMobile && setVideoActivo(null)}
  >
    <div
      className="foto-profesor mb-2"
      onClick={() => esMobile && setVideoActivo(videoActivo === index ? null : index)}
    >
      <img
        src={profesor.imagen}
        alt={profesor.nombre}
        className="img-fluid rounded-circle border border-secondary"
      />
    </div>
    <h5>{profesor.nombre}</h5>
    
    {/* POPUP animado */}
    <div className={`video-popup ${videoActivo === index ? 'mostrar' : ''}`}>
      <div className="video-container">
        <iframe
          src={profesor.videoUrl}
          title={`Video de ${profesor.nombre}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default Profesores;
