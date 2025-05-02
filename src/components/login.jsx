import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [nombre, setNombre] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://gimback-production.up.railway.app/api/auth/login', {
        nombre,
        contrasenia
      });

      console.log('Respuesta del backend:', response);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        setError('Credenciales incorrectas');
      }

    } catch (error) {
      console.error('Error en el login:', error);
      setError('Credenciales incorrectas');
    }
  };

  return (
  <div className="login-container">
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasenia}
        onChange={(e) => setContrasenia(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  </div>
);

};

export default Login;
