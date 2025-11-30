const {
  createActivity,
  getAllActivities,
  getWeeklySchedule,
  supabase
} = require('./supabase-activities');

const seedActivities = async () => {
  try {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║   Cargando Actividades en Supabase    ║');
    console.log('╚════════════════════════════════════════╝\n');

    console.log('🔄 Verificando conexión a Supabase...');
    
    const { data: testData, error: testError } = await supabase
      .from('activities')
      .select('count', { count: 'exact' })
      .limit(1);

    if (testError) {
      console.error('❌ Error conectando a Supabase:', testError);
      console.error('Verifica que la tabla "activities" exista en Supabase');
      process.exit(1);
    }

    console.log('✅ Conexión exitosa\n');
    console.log('Iniciando carga de actividades...');

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
        await createActivity(activity);
        successCount++;
        console.log(`✅ ${successCount}. ${activity.activity_name} - ${activity.day} ${activity.start_time}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error creando ${activity.activity_name}:`, error.message);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`📊 Resumen: ${successCount} actividades creadas, ${errorCount} errores`);
    console.log('='.repeat(50));

    if (successCount > 0) {
      console.log('\n📋 Horario semanal completo:');
      const weeklySchedule = await getWeeklySchedule();
      
      Object.entries(weeklySchedule).forEach(([day, dayActivities]) => {
        if (dayActivities.length > 0) {
          console.log(`\n${day}:`);
          dayActivities.forEach(activity => {
            console.log(`  • ${activity.start_time}-${activity.end_time} ${activity.activity_name} (${activity.instructor})`);
          });
        }
      });
    }

    console.log('\n✅ Carga de actividades completada');
  } catch (error) {
    console.error('❌ Error en seedActivities:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedActivities().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = seedActivities;
