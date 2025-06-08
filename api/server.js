require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase } = require('../backend/database-supabase');

// Importar rutas
const authRoutes = require('../backend/routes/auth');
const activitiesRoutes = require('../backend/routes/activities');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.VERCEL ? true : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar base de datos
let dbInitialized = false;
const initDB = async () => {
  if (!dbInitialized) {
    try {
      console.log('Inicializando base de datos...');
      await initDatabase();
      console.log('Base de datos inicializada correctamente');
      dbInitialized = true;
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      throw error;
    }
  }
};

// Middleware para inicializar DB en cada request
app.use(async (req, res, next) => {
  try {
    await initDB();
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Error de base de datos',
      message: error.message
    });
  }
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/activities', activitiesRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend del gimnasio funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL ? 'Vercel' : 'Local',
    supabase_configured: !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY)
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Export para Vercel
module.exports = app;
