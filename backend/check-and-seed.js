const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://jhntnrplogyjdjtlqfba.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w';

const supabase = createClient(supabaseUrl, supabaseKey);

const checkTableAndSeed = async () => {
  try {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║   Verificar y Cargar Actividades      ║');
    console.log('╚════════════════════════════════════════╝\n');

    console.log('🔄 Verificando conexión a Supabase...');
    
    const { data: testData, error: testError } = await supabase
      .from('activities')
      .select('count', { count: 'exact' })
      .limit(1);

    if (testError) {
      if (testError.code === 'PGRST205' || testError.message.includes('does not exist')) {
        console.error('❌ La tabla "activities" no existe en Supabase');
        console.log('\n📋 Por favor, crea la tabla manualmente:');
        console.log('\n1. Ve a: https://app.supabase.com');
        console.log('2. Selecciona tu proyecto: jhntnrplogyjdjtlqfba');
        console.log('3. Ve a SQL Editor');
        console.log('4. Copia el contenido de SUPABASE_SQL.sql');
        console.log('5. Ejecuta el SQL');
        console.log('\nO ejecuta: cat SUPABASE_SQL.sql para ver el código SQL\n');
        process.exit(1);
      } else {
        console.error('❌ Error conectando a Supabase:', testError);
        process.exit(1);
      }
    }

    console.log('✅ Conexión exitosa');
    console.log('✅ Tabla activities existe\n');

    const { data: existingActivities, error: countError } = await supabase
      .from('activities')
      .select('*', { count: 'exact' });

    if (countError) {
      console.error('❌ Error contando actividades:', countError);
      process.exit(1);
    }

    const existingCount = existingActivities?.length || 0;
    console.log(`📊 Actividades existentes: ${existingCount}`);

    if (existingCount > 0) {
      console.log('\n⚠️  Ya hay actividades en la base de datos');
      console.log('¿Deseas continuar? (esto agregará más actividades)\n');
    }

    console.log('🔄 Cargando actividades...\n');

    const activities = [
      {
        activity_name: 'Yoga',
        day: 'Lunes',
        start_time: '07:00',
        end_time: '08:00',
        duration_hours: 1,
        instructor: 'María García',
        description: 'Clase de yoga para principiantes y avanzados',
        capacity: 20,
        level: 'Todos'
      },
      {
        activity_name: 'Yoga',
        day: 'Lunes',
        start_time: '18:00',
        end_time: '19:00',
        duration_hours: 1,
        instructor: 'María García',
        description: 'Clase de yoga vespertina',
        capacity: 20,
        level: 'Todos'
      },
      {
        activity_name: 'Spinning',
        day: 'Martes',
        start_time: '08:00',
        end_time: '09:00',
        duration_hours: 1,
        instructor: 'Carlos López',
        description: 'Clase de spinning de alta intensidad',
        capacity: 15,
        level: 'Intermedio'
      },
      {
        activity_name: 'Spinning',
        day: 'Martes',
        start_time: '19:00',
        end_time: '20:00',
        duration_hours: 1,
        instructor: 'Carlos López',
        description: 'Clase de spinning nocturna',
        capacity: 15,
        level: 'Intermedio'
      },
      {
        activity_name: 'Funcional',
        day: 'Lunes',
        start_time: '09:00',
        end_time: '10:00',
        duration_hours: 1,
        instructor: 'Juan Martínez',
        description: 'Entrenamiento funcional integral',
        capacity: 25,
        level: 'Todos'
      },
      {
        activity_name: 'Funcional',
        day: 'Miércoles',
        start_time: '09:00',
        end_time: '10:00',
        duration_hours: 1,
        instructor: 'Juan Martínez',
        description: 'Entrenamiento funcional integral',
        capacity: 25,
        level: 'Todos'
      },
      {
        activity_name: 'Funcional',
        day: 'Viernes',
        start_time: '09:00',
        end_time: '10:00',
        duration_hours: 1,
        instructor: 'Juan Martínez',
        description: 'Entrenamiento funcional integral',
        capacity: 25,
        level: 'Todos'
      },
      {
        activity_name: 'Funcional',
        day: 'Viernes',
        start_time: '20:00',
        end_time: '21:00',
        duration_hours: 1,
        instructor: 'Juan Martínez',
        description: 'Entrenamiento funcional nocturno',
        capacity: 25,
        level: 'Todos'
      },
      {
        activity_name: 'Boxeo',
        day: 'Martes',
        start_time: '19:00',
        end_time: '20:00',
        duration_hours: 1,
        instructor: 'Facundo Rodríguez',
        description: 'Clase de boxeo para todos los niveles',
        capacity: 18,
        level: 'Todos'
      },
      {
        activity_name: 'Boxeo',
        day: 'Jueves',
        start_time: '19:00',
        end_time: '20:00',
        duration_hours: 1,
        instructor: 'Facundo Rodríguez',
        description: 'Clase de boxeo para todos los niveles',
        capacity: 18,
        level: 'Todos'
      },
      {
        activity_name: 'Boxeo',
        day: 'Sábado',
        start_time: '10:00',
        end_time: '11:00',
        duration_hours: 1,
        instructor: 'Facundo Rodríguez',
        description: 'Clase de boxeo matutina',
        capacity: 18,
        level: 'Todos'
      },
      {
        activity_name: 'Jiu Jitsu',
        day: 'Lunes',
        start_time: '20:00',
        end_time: '21:30',
        duration_hours: 1.5,
        instructor: 'Joaquín Silva',
        description: 'Arte marcial brasileño - Técnica y práctica',
        capacity: 20,
        level: 'Todos'
      },
      {
        activity_name: 'Jiu Jitsu',
        day: 'Miércoles',
        start_time: '20:00',
        end_time: '21:30',
        duration_hours: 1.5,
        instructor: 'Joaquín Silva',
        description: 'Arte marcial brasileño - Técnica y práctica',
        capacity: 20,
        level: 'Todos'
      },
      {
        activity_name: 'Jiu Jitsu',
        day: 'Viernes',
        start_time: '20:00',
        end_time: '21:30',
        duration_hours: 1.5,
        instructor: 'Joaquín Silva',
        description: 'Arte marcial brasileño - Técnica y práctica',
        capacity: 20,
        level: 'Todos'
      },
      {
        activity_name: 'Karate',
        day: 'Martes',
        start_time: '18:00',
        end_time: '19:30',
        duration_hours: 1.5,
        instructor: 'Mauricio Fernández',
        description: 'Karate tradicional japonés',
        capacity: 22,
        level: 'Todos'
      },
      {
        activity_name: 'Karate',
        day: 'Jueves',
        start_time: '18:00',
        end_time: '19:30',
        duration_hours: 1.5,
        instructor: 'Mauricio Fernández',
        description: 'Karate tradicional japonés',
        capacity: 22,
        level: 'Todos'
      },
      {
        activity_name: 'Karate',
        day: 'Sábado',
        start_time: '18:00',
        end_time: '19:30',
        duration_hours: 1.5,
        instructor: 'Mauricio Fernández',
        description: 'Karate tradicional japonés',
        capacity: 22,
        level: 'Todos'
      },
      {
        activity_name: 'Sala de Musculación',
        day: 'Lunes',
        start_time: '06:00',
        end_time: '23:00',
        duration_hours: 17,
        instructor: 'Personal Trainers',
        description: 'Acceso libre a la sala de musculación',
        capacity: 50,
        level: 'Todos'
      },
      {
        activity_name: 'Sala de Musculación',
        day: 'Martes',
        start_time: '06:00',
        end_time: '23:00',
        duration_hours: 17,
        instructor: 'Personal Trainers',
        description: 'Acceso libre a la sala de musculación',
        capacity: 50,
        level: 'Todos'
      },
      {
        activity_name: 'Sala de Musculación',
        day: 'Miércoles',
        start_time: '06:00',
        end_time: '23:00',
        duration_hours: 17,
        instructor: 'Personal Trainers',
        description: 'Acceso libre a la sala de musculación',
        capacity: 50,
        level: 'Todos'
      },
      {
        activity_name: 'Sala de Musculación',
        day: 'Jueves',
        start_time: '06:00',
        end_time: '23:00',
        duration_hours: 17,
        instructor: 'Personal Trainers',
        description: 'Acceso libre a la sala de musculación',
        capacity: 50,
        level: 'Todos'
      },
      {
        activity_name: 'Sala de Musculación',
        day: 'Viernes',
        start_time: '06:00',
        end_time: '23:00',
        duration_hours: 17,
        instructor: 'Personal Trainers',
        description: 'Acceso libre a la sala de musculación',
        capacity: 50,
        level: 'Todos'
      },
      {
        activity_name: 'Sala de Musculación',
        day: 'Sábado',
        start_time: '08:00',
        end_time: '20:00',
        duration_hours: 12,
        instructor: 'Personal Trainers',
        description: 'Acceso libre a la sala de musculación',
        capacity: 50,
        level: 'Todos'
      },
      {
        activity_name: 'Sala de Musculación',
        day: 'Domingo',
        start_time: '08:00',
        end_time: '20:00',
        duration_hours: 12,
        instructor: 'Personal Trainers',
        description: 'Acceso libre a la sala de musculación',
        capacity: 50,
        level: 'Todos'
      }
    ];

    let successCount = 0;
    let errorCount = 0;

    for (const activity of activities) {
      try {
        const { data, error } = await supabase
          .from('activities')
          .insert([activity])
          .select()
          .single();

        if (error) {
          errorCount++;
          console.error(`❌ Error: ${activity.activity_name} - ${error.message}`);
        } else {
          successCount++;
          console.log(`✅ ${successCount}. ${activity.activity_name} - ${activity.day} ${activity.start_time}`);
        }
      } catch (error) {
        errorCount++;
        console.error(`❌ Error: ${activity.activity_name} - ${error.message}`);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`📊 Resumen: ${successCount} actividades creadas, ${errorCount} errores`);
    console.log('='.repeat(50));

    if (successCount > 0) {
      console.log('\n✅ Carga de actividades completada exitosamente');
      console.log('\n📝 Próximos pasos:');
      console.log('1. Inicia el servidor: cd backend && node server.js');
      console.log('2. Inicia el frontend: npm run dev');
      console.log('3. Accede a http://localhost:5173');
    } else {
      console.log('\n❌ No se cargaron actividades');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  checkTableAndSeed().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = checkTableAndSeed;
