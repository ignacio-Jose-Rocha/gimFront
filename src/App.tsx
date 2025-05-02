import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Galeria from './components/carouselComponent';
import Nosotros from './components/Nosotros';
import Profesores from './components/Profesores';
import Contacto from './components/Contacto';
import Calendario from './components/Calendario';
import Footer from './components/Footer';
import Login from './components/login';
import Actividades from './components/actividades';

function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/login'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
  <>
    <Galeria />

    <div style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap', // por si en pantallas chicas necesita romper línea
  gap: '20px',
  padding: '20px'
}}>
  <div style={{ flex: '1 1 50%', minWidth: '300px' }}>
    <Calendario />
  </div>
  <div style={{ flex: '1 1 50%', minWidth: '300px' }}>
    <Actividades />
  </div>
</div>

    <Nosotros />
    <Profesores />

    <h2 style={{ textAlign: 'center' }}>Actividades</h2>
    <br />
    <Contacto />
  </>
} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
