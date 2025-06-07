require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase } = require('./database');

// Importar rutas
const authRoutes = require('./routes/auth');
const activitiesRoutes = require('./routes/activities');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // URL del frontend de Vite
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/activities', activitiesRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend del gimnasio funcionando correctamente',
    timestamp: new Date().toISOString()
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

// Inicializar base de datos y servidor
const startServer = async () => {
  try {
    console.log('Inicializando base de datos...');
    await initDatabase();
    console.log('Base de datos inicializada correctamente');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`📊 Base de datos SQLite: gym.db`);
      console.log(`🔐 Usuario admin: admin`);
      console.log(`🔑 Contraseña: aguanteAllBoys`);
      console.log(`📅 Gestión de actividades del calendario disponible`);
    });
  } catch (error) {
    console.error('Error al inicializar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de cierre graceful
process.on('SIGINT', () => {
  console.log('\n🛑 Cerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Cerrando servidor...');
  process.exit(0);
});

startServer();
