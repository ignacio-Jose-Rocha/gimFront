const express = require('express');
const {
  getAllActivities,
  getActivitiesByDate,
  createActivity,
  updateActivity,
  deleteActivity
} = require('../database');

const router = express.Router();

// Middleware para verificar token
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'gym_secret_key_2024_fallback';

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

// Obtener todas las actividades
router.get('/', async (req, res) => {
  try {
    const activities = await getAllActivities();
    
    // Formatear las actividades para el frontend
    const formattedActivities = {};
    activities.forEach(activity => {
      if (!formattedActivities[activity.date]) {
        formattedActivities[activity.date] = [];
      }
      formattedActivities[activity.date].push(`${activity.title} - ${activity.time}`);
    });

    res.json(formattedActivities);
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).json({ error: 'Error al obtener las actividades' });
  }
});

// Obtener actividades por fecha
router.get('/date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const activities = await getActivitiesByDate(date);
    
    const formattedActivities = activities.map(activity => ({
      id: activity.id,
      title: activity.title,
      time: activity.time,
      description: activity.description,
      display: `${activity.title} - ${activity.time}`
    }));

    res.json(formattedActivities);
  } catch (error) {
    console.error('Error al obtener actividades por fecha:', error);
    res.status(500).json({ error: 'Error al obtener las actividades' });
  }
});

// Crear nueva actividad (solo admin)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { date, title, time, description } = req.body;

    if (!date || !title || !time) {
      return res.status(400).json({ error: 'Fecha, título y hora son requeridos' });
    }

    // Validar formato de fecha (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
    }

    // Validar formato de hora (puede ser HH:MM o HH:MM - HH:MM)
    const timeRegex = /^(\d{2}:\d{2}(\s*-\s*\d{2}:\d{2})?)$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({ error: 'Formato de hora inválido. Use HH:MM o HH:MM - HH:MM' });
    }

    const newActivity = await createActivity(date, title, time, description || '');
    
    res.status(201).json({
      message: 'Actividad creada exitosamente',
      activity: newActivity
    });

  } catch (error) {
    console.error('Error al crear actividad:', error);
    res.status(500).json({ error: 'Error al crear la actividad' });
  }
});

// Actualizar actividad (solo admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { date, title, time, description } = req.body;

    if (!date || !title || !time) {
      return res.status(400).json({ error: 'Fecha, título y hora son requeridos' });
    }

    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
    }

    // Validar formato de hora (puede ser HH:MM o HH:MM - HH:MM)
    const timeRegex = /^(\d{2}:\d{2}(\s*-\s*\d{2}:\d{2})?)$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({ error: 'Formato de hora inválido. Use HH:MM o HH:MM - HH:MM' });
    }

    const updatedActivity = await updateActivity(id, date, title, time, description || '');
    
    res.json({
      message: 'Actividad actualizada exitosamente',
      activity: updatedActivity
    });

  } catch (error) {
    console.error('Error al actualizar actividad:', error);
    res.status(500).json({ error: 'Error al actualizar la actividad' });
  }
});

// Eliminar actividad (solo admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await deleteActivity(id);
    
    if (result.deleted) {
      res.json({ message: 'Actividad eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'Actividad no encontrada' });
    }

  } catch (error) {
    console.error('Error al eliminar actividad:', error);
    res.status(500).json({ error: 'Error al eliminar la actividad' });
  }
});

module.exports = router;
