import { useState, useEffect } from 'react';
import './actividades.css';

const actividades = () => {
  // Función para crear imagen de respaldo
  const getBackupImage = (titulo) => {
    const colors = {
      'Yoga': { bg: 'ff6600', text: 'ffffff' },
      'Spinning': { bg: 'dc2626', text: 'ffffff' },
      'Funcional': { bg: 'fbbf24', text: '000000' },
      'Boxeo': { bg: '1a1a1a', text: 'ff6600' },
      'Jiu Jitsu': { bg: 'ff6600', text: 'ffffff' },
      'Karate': { bg: 'dc2626', text: 'ffffff' },
      'Sala de Musculación': { bg: 'fbbf24', text: '000000' }
    };
    const color = colors[titulo] || { bg: 'ff6600', text: 'ffffff' };
    return `https://dummyimage.com/800x600/${color.bg}/${color.text}&text=${encodeURIComponent(titulo)}`;
  };

  // Función para manejar errores de carga de imágenes
  const handleImageError = (e, titulo) => {
    console.log(`Error cargando imagen para ${titulo}`);
    e.target.src = getBackupImage(titulo);
  };

  const actividades = [
    {
      imagen: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
      titulo: 'Yoga',
      descripcion: 'Encuentra tu equilibrio interior con nuestras clases de yoga. Perfectas para todos los niveles, desde principiantes hasta avanzados.',
      beneficios: ['Flexibilidad', 'Relajación', 'Fuerza mental', 'Equilibrio'],
      horarios: 'Lun, Mié, Vie - 7:00 AM y 6:00 PM'
    },
    {
      imagen: 'https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=800',
      titulo: 'Spinning',
      descripcion: 'Quema calorías y mejora tu resistencia cardiovascular con nuestras intensas clases de spinning llenas de energía y motivación.',
      beneficios: ['Cardio intenso', 'Quema de grasa', 'Resistencia', 'Tonificación'],
      horarios: 'Mar, Jue, Sáb - 8:00 AM y 7:00 PM'
    },
    {
      imagen: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=800',
      titulo: 'Funcional',
      descripcion: 'Entrena tu cuerpo de manera integral con ejercicios funcionales que mejoran tu fuerza, coordinación y movimientos del día a día.',
      beneficios: ['Fuerza integral', 'Coordinación', 'Agilidad', 'Funcionalidad'],
      horarios: 'Lun a Vie - 9:00 AM y 8:00 PM'
    },
    {
      imagen: 'https://media.tycsports.com/files/2021/04/21/261767/leon-gavilan.jpeg',
      titulo: 'Boxeo',
      descripcion: 'Libera tu energía y mejora tu condición física con nuestras clases de boxeo. Aprende técnicas de combate mientras te pones en forma.',
      beneficios: ['Cardio intenso', 'Coordinación', 'Autodefensa', 'Liberación de estrés'],
      horarios: 'Mar, Jue - 7:00 PM y Sáb - 10:00 AM'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=600&fit=crop',
      titulo: 'Jiu Jitsu',
      descripcion: 'Domina el arte marcial brasileño más efectivo. Desarrolla técnica, estrategia y confianza en ti mismo con nuestros instructores expertos.',
      beneficios: ['Técnica marcial', 'Flexibilidad', 'Disciplina mental', 'Autodefensa'],
      horarios: 'Lun, Mié, Vie - 8:00 PM'
    },
    {
      imagen: 'https://karateyalgomas.com/wp-content/uploads/2017/03/kiokushinkai.jpg',
      titulo: 'Karate',
      descripcion: 'Aprende el arte marcial tradicional japonés. Desarrolla disciplina, respeto y técnicas de combate en un ambiente de aprendizaje positivo.',
      beneficios: ['Disciplina', 'Técnica tradicional', 'Respeto', 'Concentración'],
      horarios: 'Mar, Jue, Sáb - 6:00 PM'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
      titulo: 'Sala de Musculación',
      descripcion: 'Desarrolla tu fuerza y masa muscular con nuestro equipamiento de última generación. Contamos con máquinas y pesas libres para todos los niveles.',
      beneficios: ['Fuerza muscular', 'Hipertrofia', 'Resistencia', 'Definición'],
      horarios: 'Lun a Dom - 6:00 AM a 11:00 PM'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Funciones para manejo táctil
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 300);
    }

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="actividades-section">
      <h2 className="actividades-title">Nuestras Actividades</h2>
      <div className="carousel-container">
        <button className="prev-button" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="carousel-inner">
          <div
            className={`carousel-slide ${isTransitioning ? 'transitioning' : ''}`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
          <div className="actividad-card" data-actividad={actividades[currentIndex].titulo}>
            <div className="imagen-container">
              <img
                src={actividades[currentIndex].imagen}
                alt={actividades[currentIndex].titulo}
                className="actividad-imagen"
                onError={(e) => handleImageError(e, actividades[currentIndex].titulo)}
              />
              <div className="imagen-overlay">
                <h3 className="actividad-titulo">{actividades[currentIndex].titulo}</h3>
              </div>
            </div>

            <div className="actividad-content">
              <p className="actividad-descripcion">{actividades[currentIndex].descripcion}</p>

              <div className="beneficios-section">
                <h4>Beneficios:</h4>
                <div className="beneficios-grid">
                  {actividades[currentIndex].beneficios.map((beneficio, index) => (
                    <span key={index} className="beneficio-tag">
                      <i className="fas fa-check"></i> {beneficio}
                    </span>
                  ))}
                </div>
              </div>

              <div className="horarios-section">
                <h4><i className="fas fa-clock"></i> Horarios:</h4>
                <p className="horarios-text">{actividades[currentIndex].horarios}</p>
              </div>
            </div>
          </div>
          </div>
        </div>

        <button className="next-button" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
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
    </div>
  );
};

export default actividades;
