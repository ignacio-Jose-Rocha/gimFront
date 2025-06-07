import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import './login.css';

const Login = () => {
  const [nombre, setNombre] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
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
        <div className="login-header">
          <i className="fas fa-user-shield"></i>
          <h2>Administracion</h2>
          <p>Acceso exclusivo para administradores</p>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}

        <div className="input-group">
          <div className="input-wrapper">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-wrapper">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="login-button">
          <i className="fas fa-sign-in-alt"></i>
          <span>Iniciar Sesión</span>
        </button>
      </form>
    </div>
  );

};

export default Login;
