const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://jhntnrplogyjdjtlqfba.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const addCalendarActivities = async () => {
  console.log('🔍 Agregando actividades al calendario en Supabase...\n');

  // Obtener fechas para esta semana
  const today = new Date();
  const getDateString = (daysOffset) => {
    const date = new Date(today);
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString().split('T')[0];
  };

  const activities = [
    {
      date: getDateString(0),
      title: 'Yoga',
      time: '07:00 - 08:00',
      description: 'Clase de yoga para principiantes'
    },
    {
      date: getDateString(0),
      title: 'Spinning',
      time: '19:00 - 20:00',
      description: 'Clase de spinning de alta intensidad'
    },
    {
      date: getDateString(1),
      title: 'Funcional',
      time: '09:00 - 10:00',
      description: 'Entrenamiento funcional'
    },
    {
      date: getDateString(1),
      title: 'Boxeo',
      time: '20:00 - 21:00',
      description: 'Clase de boxeo para todos los niveles'
    },
    {
      date: getDateString(2),
      title: 'Jiu Jitsu',
      time: '18:00 - 19:30',
      description: 'Arte marcial brasileño'
    },
    {
      date: getDateString(3),
      title: 'Karate',
      time: '17:00 - 18:30',
      description: 'Karate tradicional japonés'
    },
    {
      date: getDateString(4),
      title: 'Sala de Musculación',
      time: '06:00 - 22:00',
      description: 'Acceso libre a la sala de musculación'
    },
    {
      date: getDateString(-1),
      title: 'Yoga',
      time: '18:00 - 19:00',
      description: 'Clase de yoga vespertina'
    },
    {
      date: getDateString(-2),
      title: 'Spinning',
      time: '08:00 - 09:00',
      description: 'Clase de spinning matutina'
    }
  ];

  try {
    const { data, error } = await supabase
      .from('calendar_activities')
      .insert(activities)
      .select();

    if (error) {
      console.error('❌ Error:', error);
      console.error('Detalles:', {
        message: error.message,
        details: error.details,
        hint: error.hint
      });
    } else {
      console.log('✅ Actividades agregadas exitosamente:');
      data.forEach((activity, index) => {
        console.log(`  ${index + 1}. ${activity.title} - ${activity.date} (${activity.time})`);
      });
      console.log(`\n📊 Total: ${data.length} actividades agregadas`);
    }
  } catch (err) {
    console.error('💥 Error general:', err);
  }
};

addCalendarActivities();
