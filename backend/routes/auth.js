const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../database');

const router = express.Router();



// JWT Secret desde variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'gym_secret_key_2024_fallback';

// Middleware para verificar token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Ruta de login con validación segura
router.post('/login', async (req, res) => {
  try {
    const { nombre, contrasenia } = req.body;

    if (!nombre || !contrasenia) {
      return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
    }

    // Validación adicional de seguridad
    if (typeof nombre !== 'string' || typeof contrasenia !== 'string') {
      return res.status(400).json({ error: 'Formato de datos inválido' });
    }

    if (nombre.length > 50 || contrasenia.length > 100) {
      return res.status(400).json({ error: 'Datos demasiado largos' });
    }

    // Buscar usuario en la base de datos
    const user = await getUserByUsername(nombre);

    if (!user) {
      // Delay para prevenir ataques de timing
      await new Promise(resolve => setTimeout(resolve, 1000));
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar contraseña
    const isValidPassword = bcrypt.compareSync(contrasenia, user.password);

    if (!isValidPassword) {
      // Delay para prevenir ataques de timing
      await new Promise(resolve => setTimeout(resolve, 1000));
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar token JWT con información mínima
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        iat: Math.floor(Date.now() / 1000)
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Log de acceso (sin credenciales)
    console.log(`Login exitoso para usuario: ${user.username} - ${new Date().toISOString()}`);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



// Ruta para verificar token
router.get('/verify', verifyToken, (req, res) => {
  res.json({ 
    valid: true, 
    user: req.user 
  });
});

module.exports = router;
