import React from 'react';
import './Nosotros.css';

const Nosotros = () => {
  return (
    <div id="nosotros" className="nosotros-section">
      <div className="nosotros-container">
        <div className="section-header">
          <h2 className="main-title">
            <i className="fas fa-dumbbell"></i>
            ¿Quiénes Somos?
          </h2>
          <div className="title-underline"></div>
        </div>

        <div className="content-grid">
          <div className="text-content">
            <div className="info-card">
              <div className="card-icon">
                <i className="fas fa-fire"></i>
              </div>
              <h3>Nuestra Pasión</h3>
              <p>
                En <strong>Center Fit</strong>, somos más que un gimnasio. Somos una comunidad dedicada a transformar vidas a través del fitness y el bienestar integral.
              </p>
            </div>

            <div className="info-card">
              <div className="card-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Nuestra Misión</h3>
              <p>
                Ofrecemos un espacio único con equipos de última generación, entrenadores certificados y un ambiente motivador que te impulsa a superar tus límites.
              </p>
            </div>

            <div className="info-card">
              <div className="card-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Nuestra Comunidad</h3>
              <p>
                Desde principiantes hasta atletas avanzados, todos tienen su lugar aquí. ¡Únete a nosotros y descubre tu mejor versión!
              </p>
            </div>

            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Miembros Activos</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5</div>
                <div className="stat-label">Años de Experiencia</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Clases Semanales</div>
              </div>
            </div>
          </div>

          <div className="location-content">
            <div className="location-header">
              <h2 className="location-title">
                <i className="fas fa-map-marker-alt"></i>
                Nuestra Ubicación
              </h2>
              <p className="location-subtitle">Visitanos en el corazón de San Miguel</p>
            </div>

            <div className="map-wrapper">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.701754642867!2d-58.7148586!3d-34.5417534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbdce5cd96777%3A0x6b3ba28b67261aa7!2sCenter%20Fit!5e0!3m2!1ses!2sar!4v1681315146556!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="map-overlay">
                <div className="address-info">
                  <h4><i className="fas fa-location-dot"></i> Dirección</h4>
                  <p>San Miguel, Buenos Aires</p>
                  <h4><i className="fas fa-clock"></i> Horarios</h4>
                  <p>Lun - Vie: 6:00 AM - 11:00 PM<br/>Sáb - Dom: 8:00 AM - 8:00 PM</p>
                  <h4><i className="fas fa-phone"></i> Contacto</h4>
                  <p>+54 11 1234-5678</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;