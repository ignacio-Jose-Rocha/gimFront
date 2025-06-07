// Configuración de API para diferentes entornos
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// URLs del backend según el entorno
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001/api'  // Desarrollo local
  : '/api';                      // Producción (Vercel)

// Configuración de axios por defecto
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// URLs específicas de la API
export const API_ENDPOINTS = {
  // Autenticación
  LOGIN: '/auth/login',
  VERIFY: '/auth/verify',
  
  // Actividades
  ACTIVITIES: '/activities',
  ACTIVITIES_BY_DATE: (date) => `/activities/date/${date}`,
  ACTIVITY_BY_ID: (id) => `/activities/${id}`,
};

// Función helper para obtener headers con token
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

console.log('🔧 Configuración API:', {
  environment: isDevelopment ? 'development' : 'production',
  baseURL: API_BASE_URL,
  isDevelopment,
  isProduction
});
