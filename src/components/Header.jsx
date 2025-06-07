import React, { useEffect } from 'react';
import logo1 from '../assets/logo.png';
import logo2 from '../assets/texto.png';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

const Header = () => {
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarNav');

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      });
    });

    const handleOutsideClick = (e) => {
      const toggler = document.querySelector('.navbar-toggler');
      const isClickInside = navbarCollapse.contains(e.target) || toggler.contains(e.target);
      if (!isClickInside && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const toggleMenu = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    const isExpanded = navbarCollapse.classList.contains('show');
    const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });

    if (isExpanded) {
      bsCollapse.hide();
    } else {
      bsCollapse.show();
    }
  };

  return (
    <header className="gym-header">
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          {/* Logo Section */}
          <div className="navbar-brand">
            <img src={logo1} alt="Center Fit Logo" className="logo-icon" />
            <img src={logo2} alt="Center Fit Text" className="logo-text" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Navigation Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  INICIO
                </Link>
              </li>
              <li className="nav-item">
                <a href="/#galeria" className="nav-link">
                  GALERÍA
                </a>
              </li>
              <li className="nav-item">
                <a href="/#calendario" className="nav-link">
                  CALENDARIO
                </a>
              </li>
              <li className="nav-item">
                <a href="/#nosotros" className="nav-link">
                  NOSOTROS
                </a>
              </li>
              <li className="nav-item">
                <a href="/#profesores" className="nav-link">
                  PROFESORES
                </a>
              </li>
              <li className="nav-item">
                <a href="/#contacto" className="nav-link">
                  CONTACTO
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
