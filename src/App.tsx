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
import KeepAlive from './components/KeepAlive';

function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/keep-alive'];
  const hideHeaderRoutes = ['/keep-alive'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={
  <>
    <Galeria />

    <Actividades />

    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: '40px',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      minHeight: '100vh'
    }}>
      <div style={{ flex: '1 1 100%', minWidth: '300px' }}>
        <Calendario />
      </div>
    </div>

    <Nosotros />
    <Profesores />
    <Contacto />
  </>
} />
        <Route path="/login" element={<Login />} />
        <Route path="/keep-alive" element={<KeepAlive />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
