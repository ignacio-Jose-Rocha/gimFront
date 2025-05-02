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
    <header className=" text-warning p-3">
<div className="container">
  <nav className="navbar custom-navbar navbar-dark fixed-top bg-dark">


    {/* Logo */}
    <div className="d-flex align-items-center mb-3 mb-md-0 w-auto ms-0">
     <img src={logo1} alt="Logo 1" className="logo me-2 logo-icono" />
<img src={logo2} alt="Logo 2" className="logo logo-texto" />

    </div>


          <button
            className="navbar-toggler ms-auto"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-center gap-2">
 <li className="nav-item"><Link to="/" className="nav-link nav-link-glow">INICIO</Link></li>
<li className="nav-item"><a href="/#galeria" className="nav-link nav-link-glow">GALERIA</a></li>
<li className="nav-item"><a href="/#calendario" className="nav-link nav-link-glow">CALENDARIO</a></li>
<li className="nav-item"><a href="/#nosotros" className="nav-link nav-link-glow">NOSOTROS</a></li>
<li className="nav-item"><a href="/#profesores" className="nav-link nav-link-glow">PROFESORES</a></li>
<li className="nav-item"><a href="/#contacto" className="nav-link nav-link-glow">CONTACTO</a></li>
</ul>

          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
