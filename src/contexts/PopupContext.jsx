import React, { createContext, useContext, useState, useEffect } from 'react';

const PopupContext = createContext();

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

export const PopupProvider = ({ children }) => {
  const [popupsEnabled, setPopupsEnabled] = useState(true);

  // Cargar configuración desde localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('popupConfig');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setPopupsEnabled(config.enabled);
    }
  }, []);

  // Guardar configuración en localStorage
  const updatePopupConfig = (enabled) => {
    setPopupsEnabled(enabled);
    localStorage.setItem('popupConfig', JSON.stringify({ enabled }));
  };

  const value = {
    popupsEnabled,
    setPopupsEnabled: updatePopupConfig,
  };

  return (
    <PopupContext.Provider value={value}>
      {children}
    </PopupContext.Provider>
  );
};
