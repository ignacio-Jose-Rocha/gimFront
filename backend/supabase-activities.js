const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://jhntnrplogyjdjtlqfba.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w';

const supabase = createClient(supabaseUrl, supabaseKey);

const initActivitiesTable = async () => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .limit(1);

    if (error && error.code === 'PGRST116') {
      console.log('Tabla activities no existe, creando...');
      return false;
    }

    console.log('Tabla activities ya existe');
    return true;
  } catch (error) {
    console.error('Error verificando tabla:', error);
    return false;
  }
};

const createActivity = async (activityData) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .insert([{
        activity_name: activityData.activity_name,
        day: activityData.day,
        start_time: activityData.start_time,
        end_time: activityData.end_time,
        duration_hours: activityData.duration_hours,
        instructor: activityData.instructor,
        description: activityData.description || '',
        capacity: activityData.capacity || null,
        level: activityData.level || 'Todos',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creando actividad:', error);
      throw error;
    }

    console.log('Actividad creada exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error en createActivity:', error);
    throw error;
  }
};

const getActivitiesByDay = async (day) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('day', day)
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error obteniendo actividades:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error en getActivitiesByDay:', error);
    throw error;
  }
};

const getActivitiesByInstructor = async (instructor) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('instructor', instructor)
      .order('day', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error obteniendo actividades:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error en getActivitiesByInstructor:', error);
    throw error;
  }
};

const getAllActivities = async () => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('day', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error obteniendo actividades:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error en getAllActivities:', error);
    throw error;
  }
};

const getActivityById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error obteniendo actividad:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error en getActivityById:', error);
    throw error;
  }
};

const updateActivity = async (id, activityData) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .update({
        activity_name: activityData.activity_name,
        day: activityData.day,
        start_time: activityData.start_time,
        end_time: activityData.end_time,
        duration_hours: activityData.duration_hours,
        instructor: activityData.instructor,
        description: activityData.description || '',
        capacity: activityData.capacity || null,
        level: activityData.level || 'Todos',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error actualizando actividad:', error);
      throw error;
    }

    console.log('Actividad actualizada exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error en updateActivity:', error);
    throw error;
  }
};

const deleteActivity = async (id) => {
  try {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error eliminando actividad:', error);
      throw error;
    }

    console.log('Actividad eliminada exitosamente');
    return { success: true };
  } catch (error) {
    console.error('Error en deleteActivity:', error);
    throw error;
  }
};

const getActivitiesByActivityName = async (activityName) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('activity_name', activityName)
      .order('day', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error obteniendo actividades:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error en getActivitiesByActivityName:', error);
    throw error;
  }
};

const getScheduleByDay = async (day) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('day', day)
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error obteniendo horario:', error);
      throw error;
    }

    const schedule = {};
    data.forEach(activity => {
      if (!schedule[activity.start_time]) {
        schedule[activity.start_time] = [];
      }
      schedule[activity.start_time].push(activity);
    });

    return schedule;
  } catch (error) {
    console.error('Error en getScheduleByDay:', error);
    throw error;
  }
};

const getWeeklySchedule = async () => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('day', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error obteniendo horario semanal:', error);
      throw error;
    }

    const weeklySchedule = {};
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    days.forEach(day => {
      weeklySchedule[day] = [];
    });

    data.forEach(activity => {
      if (weeklySchedule[activity.day]) {
        weeklySchedule[activity.day].push(activity);
      }
    });

    return weeklySchedule;
  } catch (error) {
    console.error('Error en getWeeklySchedule:', error);
    throw error;
  }
};

module.exports = {
  supabase,
  initActivitiesTable,
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
};
