import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Calendario.css';

const Calendario = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

  const fetchUltimaImagen = async () => {
    try {
      const response = await axios.get('https://gimback-production.up.railway.app/api/auth/ultima-imagen');
      setImage(response.data.imageUrl);
    } catch (err) {
      console.error('Error al obtener la última imagen:', err);
      // Si falla, podés dejar la imagen por defecto
      setImage('https://res.cloudinary.com/dwpl6pan2/image/upload/v1745544062/imagenes/dzyj6xbaqjwdticknb9l.jpg');
    }
  };

  fetchUltimaImagen();
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    window.location.reload();
  };

  const handleImageUpload = async (e) => {
  const formData = new FormData();
  const file = e.target.files[0];

 
  if (!file) {
    console.error("No se seleccionó ningún archivo.");
    setError("Por favor, selecciona un archivo.");
    return;
  }

  formData.append('imagen', file);

  try {
    const response = await axios.post('https://gimback-production.up.railway.app/api/auth/subir-imagen', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response.data);


   setImage(response.data.imageUrl);



    setError(null);  
  } catch (err) {
    console.error("Error al subir la imagen:", err);
    setError('Hubo un error al subir la imagen.');
  }
};





  return (
    <div className="calendario-container" id="calendario">
      <h2>Calendario de Actividades</h2>

      <div className="image-container" >
        <img
          src={image || 'https://res.cloudinary.com/dwpl6pan2/image/upload/v1745544062/imagenes/dzyj6xbaqjwdticknb9l.jpg'}
          alt="Calendario de Actividades"
          className="calendario-image"
        />
      </div>

      {isLoggedIn && (
        <div className="upload-container">
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Calendario;
