import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Galeria from './components/carouselComponent';
import Nosotros from './components/Nosotros';
import Profesores from './components/Profesores';
import Contacto from './components/Contacto';
import CalendarioActividades from './components/CalendarioActividades';
import Footer from './components/Footer';
import Login from './components/login';
import Actividades from './components/actividades';
import KeepAlive from './components/KeepAlive';
import PromotionPopup from './components/promotions/PromotionPopup';
import { PopupProvider } from './contexts/PopupContext';
import { getCurrentPromotion } from './config/promotions';

function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/keep-alive'];
  const hideHeaderRoutes = ['/keep-alive'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  // Obtener la promoción actual
  const currentPromotion = getCurrentPromotion();

  return (
    <PopupProvider>
      {shouldShowHeader && <Header />}
      <PromotionPopup promotion={currentPromotion} />
      <Routes>
        <Route path="/" element={
  <>
    <Galeria />
    <Actividades />
    <CalendarioActividades />
    <Nosotros />
    <Profesores />
    <Contacto />
  </>
} />
        <Route path="/login" element={<Login />} />
        <Route path="/keep-alive" element={<KeepAlive />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </PopupProvider>
  );
}

export default App;
