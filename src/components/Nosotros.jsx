import React from 'react';
import './Nosotros.css';

const Nosotros = () => {
  return (
    <div id="nosotros" className="container nosotros-section py-5">
      <div className="row side-by-side align-items-center"> {/* Clase 'side-by-side' para nuestro diseño forzado */}
        <div className="col-md-6 text-col"> {/* Columna para el texto */}
          <h2>¿Quiénes somos?</h2>
          <p>
            En nuestro gimnasio, nos dedicamos a ofrecer un espacio único para todos los amantes del deporte. Contamos con equipos de alta calidad, entrenadores capacitados y un ambiente amigable que te motivará a alcanzar tus objetivos. Ya seas principiante o un experto, tenemos un lugar para ti. ¡Únete a nosotros y transforma tu vida!
          </p>
        </div>
        <div className="col-md-6 map-col"> {/* Columna para el mapa */}
          <h2>Ubicación</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.701754642867!2d-58.7148586!3d-34.5417534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbdce5cd96777%3A0x6b3ba28b67261aa7!2sCenter%20Fit!5e0!3m2!1ses!2sar!4v1681315146556!5m2!1ses!2sar"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;