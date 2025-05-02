import React, { useState } from 'react';
import './Contacto.css';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarWhatsapp = (e) => {
    e.preventDefault();
    const telefono = '5491134402121';
    const texto = `Hola, soy ${nombre}. : ${mensaje}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="contacto-section py-5">
      <div className="container">
        <h2 className="text-center text-dark mb-4">¿Tenés dudas? Escribinos por WhatsApp</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={enviarWhatsapp}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100">
                Enviar por WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
