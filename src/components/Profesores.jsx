import React, { useState, useEffect } from 'react';
import './Profesores.css';
import joaquinImg from '../assets/joaquin.jpeg';
import facundoImg from '../assets/facundo.jpeg';
import mauricioImg from '../assets/mauricio.jpeg';

const profesoresData = [
  {
    nombre: 'Joaquín Machuca',
    especialidad: 'Entrenador Personal & Funcional',
    descripcion: 'Especialista en entrenamiento funcional y desarrollo de fuerza. Apasionado por ayudar a cada persona a alcanzar su máximo potencial físico.',
    videoUrl: 'https://www.youtube.com/embed/sxelGp7ajNM',
    imagen: joaquinImg,
    horarios: 'Lun-Vie: 6:00-14:00',
    actividades: ['Funcional', 'Musculación', 'Entrenamiento Personal']
  },
  {
    nombre: 'Facundo González',
    especialidad: 'Instructor de Spinning & Cardio',
    descripcion: 'Instructor dinámico especializado en clases de alto impacto. Su energía y motivación contagian a todos los participantes.',
    videoUrl: 'https://www.youtube.com/embed/sxelGp7ajNM',
    imagen: facundoImg,
    horarios: 'Mar-Sáb: 7:00-20:00',
    actividades: ['Spinning', 'HIIT', 'Cardio Dance']
  },
  {
    nombre: 'Mauricio Carrizo',
    especialidad: 'Maestro de Artes Marciales',
    descripcion: 'Maestro en múltiples disciplinas marciales. Combina técnica tradicional con métodos modernos de entrenamiento.',
    videoUrl: 'https://www.youtube.com/embed/sxelGp7ajNM',
    imagen: mauricioImg,
    horarios: 'Lun-Jue: 17:00-21:00',
    actividades: ['Karate', 'Jiu Jitsu', 'Boxeo', 'Defensa Personal']
  },
];

const Profesores = () => {
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);
  const [esMobile, setEsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setEsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate en móvil
  useEffect(() => {
    if (esMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % profesoresData.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [esMobile]);

  return (
    <div id="profesores" className="profesores-section">
      <div className="profesores-container">
        <div className="section-header">
          <h2 className="section-title">
            <i className="fas fa-users"></i>
            Nuestro Equipo de Profesionales
          </h2>
          <p className="section-subtitle">
            Conoce a los expertos que te guiarán hacia tus objetivos
          </p>
        </div>

        {esMobile ? (
          // Vista móvil - Carrusel
          <div className="mobile-carousel">
            <div className="profesor-card-mobile">
              {renderProfesorCard(profesoresData[currentIndex], currentIndex)}
            </div>
            <div className="carousel-indicators">
              {profesoresData.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          // Vista desktop - Grid
          <div className="profesores-grid">
            {profesoresData.map((profesor, index) => (
              <div key={index} className="profesor-card-container">
                {renderProfesorCard(profesor, index)}
              </div>
            ))}
          </div>
        )}

        {/* Modal de detalles */}
        {profesorSeleccionado !== null && (
          <div className="modal-overlay" onClick={() => setProfesorSeleccionado(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setProfesorSeleccionado(null)}
              >
                <i className="fas fa-times"></i>
              </button>
              {renderModalContent(profesoresData[profesorSeleccionado])}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function renderProfesorCard(profesor, index) {
    return (
      <div className="profesor-card">
        <div className="card-header">
          <div className="profesor-image-container">
            <img
              src={profesor.imagen}
              alt={profesor.nombre}
              className="profesor-image"
            />
            <div className="image-overlay">
              <button
                className="view-details-btn"
                onClick={() => setProfesorSeleccionado(index)}
              >
                <i className="fas fa-eye"></i>
                Ver Perfil
              </button>
            </div>
          </div>
        </div>

        <div className="card-body">
          <h3 className="profesor-nombre">{profesor.nombre}</h3>
          <p className="profesor-especialidad">{profesor.especialidad}</p>



          <div className="horarios-preview">
            <i className="fas fa-clock"></i>
            <span>{profesor.horarios}</span>
          </div>
        </div>
      </div>
    );
  }

  function renderModalContent(profesor) {
    return (
      <div className="modal-profesor">
        <div className="modal-header">
          <div className="profesor-info-header">
            <img
              src={profesor.imagen}
              alt={profesor.nombre}
              className="modal-profesor-image"
            />
            <div className="profesor-title-info">
              <h2>{profesor.nombre}</h2>
              <p className="especialidad">{profesor.especialidad}</p>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="descripcion-section">
            <h3><i className="fas fa-user"></i> Sobre {profesor.nombre.split(' ')[0]}</h3>
            <p>{profesor.descripcion}</p>
          </div>

          <div className="horarios-section">
            <h3><i className="fas fa-calendar-alt"></i> Horarios de Atención</h3>
            <div className="horarios-info">
              <i className="fas fa-clock"></i>
              <span>{profesor.horarios}</span>
            </div>
          </div>

          <div className="video-section">
            <h3><i className="fas fa-play"></i> Video Presentación</h3>
            <div className="video-container">
              <iframe
                src={profesor.videoUrl}
                title={`Video de ${profesor.nombre}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profesores;
