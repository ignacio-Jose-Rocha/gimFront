import React, { useState, useEffect } from 'react';
import { usePopup } from '../../contexts/PopupContext';
import './PromotionPopup.css';

const PromotionPopup = ({ promotion }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { popupsEnabled } = usePopup();

  useEffect(() => {
    if (!popupsEnabled || !promotion) return;

    // Mostrar el popup después de un pequeño delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [popupsEnabled, promotion]);

  const closePopup = () => {
    setIsVisible(false);
  };

  // Manejar el cierre con la tecla X
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'x' || event.key === 'X') {
        closePopup();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isVisible]);

  const handleCTAClick = () => {
    if (promotion.whatsappNumber) {
      const message = encodeURIComponent(promotion.whatsappMessage || `¡Hola! Me interesa la promoción de ${promotion.title}`);
      const whatsappUrl = `https://wa.me/${promotion.whatsappNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
    closePopup();
  };

  if (!isVisible || !popupsEnabled || !promotion) return null;

  return (
    <div className={`promotion-popup-overlay ${promotion.theme}`}>
      <div
        className="promotion-popup-container"
        style={{
          backgroundImage: promotion.backgroundImage ? `url(${promotion.backgroundImage})` : 'none'
        }}
      >
        {/* Overlay de color transparente */}
        <div className="promotion-popup-background-overlay"></div>

        <button className="promotion-popup-close" onClick={closePopup}>
          ×
        </button>
        
        <div className="promotion-popup-content">
          {/* Header */}
          <div className="promotion-popup-header">
            <h1 className="promotion-popup-title">
              {promotion.icon} {promotion.title} {promotion.icon}
            </h1>
            <div className="promotion-popup-subtitle">
              {promotion.subtitle}
            </div>
          </div>

          <div className="promotion-popup-body">
            <div className="promotion-popup-offer">
              <div className="promotion-popup-discount">
                <span className="discount-percentage">{promotion.discount}</span>
                <span className="discount-text">DESCUENTO</span>
              </div>
              
              <div className="promotion-popup-details">
                <h3>{promotion.offerTitle}</h3>
                <ul>
                  {promotion.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
                
                <div className="promotion-popup-validity">
                  <strong>{promotion.validity}</strong>
                </div>
              </div>
            </div>

            <div className="promotion-popup-cta">
              <button 
                className="promotion-popup-btn-primary"
                onClick={handleCTAClick}
              >
                {promotion.ctaText}
              </button>
            </div>
          </div>
        </div>

        {/* Efectos temáticos */}
        {promotion.effects && (
          <div className="promotion-effects">
            {promotion.effects.map((effect, index) => (
              <div key={index} className={`effect effect-${index + 1}`}>
                {effect}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionPopup;
