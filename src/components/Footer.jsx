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
        <h3 className="footer-title">Redes Sociales</h3>
        <ul className="footer-list">
          <li>
            <a
              href="https://www.instagram.com/centerfit_sm/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <span>Instagram</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Solo mostrar esta columna si NO está logueado */}
      {!isLoggedIn && (
        <div className="footer-column">
          <h3 className="footer-title">Acceso</h3>
          <button className="footer-button" onClick={redirectToLogin}>
            Área Administrativa
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
