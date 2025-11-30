import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import logo1 from '../assets/logo.png';
import logo2 from '../assets/texto.png';
import instagramLogo from '../assets/instagram.png';

const Footer = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <footer className="footer">
      <div className="footer-column">
        <img src={logo1} alt="Logo principal" className="footer-logo" />
        <p className="footer-email">email empresarial </p>
      </div>

      <div className="footer-column">
        <h3 className="footer-title">
          <i className="fas fa-share-alt"></i>
          Redes Sociales
        </h3>
        <ul className="footer-list">
          <li>
            <a
              href="https://www.instagram.com/centerfit_sm/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <i className="fab fa-instagram"></i>
              <span>Instagram</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Mostrar botón de login si NO está logueado */}
      {!isLoggedIn && (
        <div className="footer-column">
          <h3 className="footer-title">
            <i className="fas fa-user-shield"></i>
            Acceso
          </h3>
          <button className="footer-button" onClick={redirectToLogin}>
            <i className="fas fa-key"></i>
            <span>Área Administrativa</span>
          </button>
        </div>
      )}

      {/* Mostrar botón de cerrar sesión si está logueado */}
      {isLoggedIn && (
        <div className="footer-column">
          <h3 className="footer-title">
            <i className="fas fa-user-check"></i>
            Sesión Activa
          </h3>
          <button
            className="footer-button logout-button"
            onClick={() => {
              localStorage.removeItem('token');
              setIsLoggedIn(false);
              window.location.reload();
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
