const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'gym.db');
const db = new sqlite3.Database(dbPath);

const addTestActivities = () => {
  console.log('🔍 Agregando actividades de prueba a SQLite...\n');

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

  db.serialize(() => {
    // Limpiar actividades existentes
    db.run('DELETE FROM activities', (err) => {
      if (err) {
        console.error('Error limpiando tabla:', err);
        return;
      }
      console.log('✅ Tabla limpiada\n');
    });

    // Insertar nuevas actividades
    const stmt = db.prepare('INSERT INTO activities (date, title, time, description) VALUES (?, ?, ?, ?)');
    
    let count = 0;
    activities.forEach((activity) => {
      stmt.run([activity.date, activity.title, activity.time, activity.description], (err) => {
        if (err) {
          console.error(`❌ Error agregando ${activity.title}:`, err);
        } else {
          count++;
          console.log(`✅ ${count}. ${activity.title} - ${activity.date} (${activity.time})`);
        }
      });
    });

    stmt.finalize(() => {
      console.log(`\n✅ ${count} actividades agregadas exitosamente`);
      db.close();
    });
  });
};

addTestActivities();
