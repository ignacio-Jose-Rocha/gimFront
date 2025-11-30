const express = require('express');
const router = express.Router();
const {
  createActivity,
  getActivitiesByDay,
  getActivitiesByInstructor,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  getActivitiesByActivityName,
  getScheduleByDay,
  getWeeklySchedule
} = require('../supabase-activities');

router.post('/create', async (req, res) => {
  try {
    const { activity_name, day, start_time, end_time, duration_hours, instructor, description, capacity, level } = req.body;

    if (!activity_name || !day || !start_time || !end_time || !duration_hours || !instructor) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const activity = await createActivity({
      activity_name,
      day,
      start_time,
      end_time,
      duration_hours,
      instructor,
      description,
      capacity,
      level
    });

    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    console.error('Error en POST /create:', error);
    res.status(500).json({ error: 'Error creando actividad' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const activities = await getAllActivities();
    res.json({ success: true, data: activities });
  } catch (error) {
    console.error('Error en GET /all:', error);
    res.status(500).json({ error: 'Error obteniendo actividades' });
  }
});

router.get('/by-day/:day', async (req, res) => {
  try {
    const { day } = req.params;
    const activities = await getActivitiesByDay(day);
    res.json({ success: true, data: activities });
  } catch (error) {
    console.error('Error en GET /by-day:', error);
    res.status(500).json({ error: 'Error obteniendo actividades' });
  }
});

router.get('/by-instructor/:instructor', async (req, res) => {
  try {
    const { instructor } = req.params;
    const activities = await getActivitiesByInstructor(instructor);
    res.json({ success: true, data: activities });
  } catch (error) {
    console.error('Error en GET /by-instructor:', error);
    res.status(500).json({ error: 'Error obteniendo actividades' });
  }
});

router.get('/by-activity/:activityName', async (req, res) => {
  try {
    const { activityName } = req.params;
    const activities = await getActivitiesByActivityName(activityName);
    res.json({ success: true, data: activities });
  } catch (error) {
    console.error('Error en GET /by-activity:', error);
    res.status(500).json({ error: 'Error obteniendo actividades' });
  }
});

router.get('/schedule/day/:day', async (req, res) => {
  try {
    const { day } = req.params;
    const schedule = await getScheduleByDay(day);
    res.json({ success: true, data: schedule });
  } catch (error) {
    console.error('Error en GET /schedule/day:', error);
    res.status(500).json({ error: 'Error obteniendo horario' });
  }
});

router.get('/schedule/weekly', async (req, res) => {
  try {
    const schedule = await getWeeklySchedule();
    res.json({ success: true, data: schedule });
  } catch (error) {
    console.error('Error en GET /schedule/weekly:', error);
    res.status(500).json({ error: 'Error obteniendo horario semanal' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await getActivityById(id);
    
    if (!activity) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    res.json({ success: true, data: activity });
  } catch (error) {
    console.error('Error en GET /:id:', error);
    res.status(500).json({ error: 'Error obteniendo actividad' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { activity_name, day, start_time, end_time, duration_hours, instructor, description, capacity, level } = req.body;

    if (!activity_name || !day || !start_time || !end_time || !duration_hours || !instructor) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const activity = await updateActivity(id, {
      activity_name,
      day,
      start_time,
      end_time,
      duration_hours,
      instructor,
      description,
      capacity,
      level
    });

    res.json({ success: true, data: activity });
  } catch (error) {
    console.error('Error en PUT /:id:', error);
    res.status(500).json({ error: 'Error actualizando actividad' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteActivity(id);
    res.json({ success: true, message: 'Actividad eliminada' });
  } catch (error) {
    console.error('Error en DELETE /:id:', error);
    res.status(500).json({ error: 'Error eliminando actividad' });
  }
});

module.exports = router;
