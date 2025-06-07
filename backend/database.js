const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

// Configuración de base de datos según el entorno
const isProduction = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';

let db;

if (isVercel || isProduction) {
  // En Vercel o producción, usar base de datos en memoria
  console.log('🔄 Usando SQLite en memoria para entorno de producción');
  db = new sqlite3.Database(':memory:');
} else {
  // En desarrollo, usar archivo local
  const dbPath = path.join(__dirname, 'gym.db');
  console.log('💾 Usando SQLite local:', dbPath);
  db = new sqlite3.Database(dbPath);
}

// Inicializar la base de datos
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Tabla de usuarios
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Tabla de actividades del calendario
      db.run(`CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        title TEXT NOT NULL,
        time TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);



      // Verificar si existe el usuario admin, si no, crearlo
      db.get("SELECT * FROM users WHERE username = ?", ['admin'], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (!row) {
          // Crear usuario admin con contraseña desde variables de entorno
          const adminUsername = process.env.ADMIN_USERNAME || 'admin';
          const adminPassword = process.env.ADMIN_PASSWORD || 'aguanteAllBoys';
          const hashedPassword = bcrypt.hashSync(adminPassword, 10);
          db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            [adminUsername, hashedPassword, 'admin'], (err) => {
            if (err) {
              reject(err);
            } else {
              console.log('Usuario admin creado exitosamente');

              // Si estamos en producción, agregar datos de ejemplo
              if (isVercel || isProduction) {
                initSampleData().then(() => {
                  console.log('Datos de ejemplo inicializados');
                  resolve();
                }).catch(reject);
              } else {
                resolve();
              }
            }
          });
        } else {
          console.log('Usuario admin ya existe');

          // Si estamos en producción y es la primera vez, agregar datos de ejemplo
          if (isVercel || isProduction) {
            initSampleData().then(() => {
              console.log('Datos de ejemplo verificados');
              resolve();
            }).catch(reject);
          } else {
            resolve();
          }
        }
      });
    });
  });
};

// Función para inicializar datos de ejemplo en producción
const initSampleData = () => {
  return new Promise((resolve) => {
    const sampleActivities = [
      {
        date: '2024-12-15',
        title: 'Yoga',
        time: '07:00 - 08:00',
        description: 'Clase de yoga para principiantes'
      },
      {
        date: '2024-12-15',
        title: 'Spinning',
        time: '19:00 - 20:00',
        description: 'Clase de spinning de alta intensidad'
      },
      {
        date: '2024-12-16',
        title: 'Funcional',
        time: '09:00 - 10:00',
        description: 'Entrenamiento funcional'
      },
      {
        date: '2024-12-16',
        title: 'Boxeo',
        time: '20:00 - 21:00',
        description: 'Clase de boxeo para todos los niveles'
      },
      {
        date: '2024-12-17',
        title: 'Jiu Jitsu',
        time: '18:00 - 19:30',
        description: 'Arte marcial brasileño'
      },
      {
        date: '2024-12-18',
        title: 'Karate',
        time: '17:00 - 18:30',
        description: 'Karate tradicional japonés'
      },
      {
        date: '2024-12-19',
        title: 'Sala de Musculación',
        time: '06:00 - 22:00',
        description: 'Acceso libre a la sala de musculación'
      }
    ];

    let completed = 0;
    const total = sampleActivities.length;

    if (total === 0) {
      resolve();
      return;
    }

    sampleActivities.forEach(activity => {
      db.run("INSERT OR IGNORE INTO activities (date, title, time, description) VALUES (?, ?, ?, ?)",
        [activity.date, activity.title, activity.time, activity.description], (err) => {
        if (err) {
          console.error('Error insertando actividad de ejemplo:', err);
        }
        completed++;
        if (completed === total) {
          resolve();
        }
      });
    });
  });
};

// Funciones para usuarios
const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Funciones para actividades
const getActivitiesByDate = (date) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM activities WHERE date = ? ORDER BY time", [date], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getAllActivities = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM activities ORDER BY date, time", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const createActivity = (date, title, time, description = '') => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO activities (date, title, time, description) VALUES (?, ?, ?, ?)", 
      [date, title, time, description], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, date, title, time, description });
    });
  });
};

const updateActivity = (id, date, title, time, description = '') => {
  return new Promise((resolve, reject) => {
    db.run("UPDATE activities SET date = ?, title = ?, time = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", 
      [date, title, time, description, id], function(err) {
      if (err) reject(err);
      else resolve({ id, date, title, time, description });
    });
  });
};

const deleteActivity = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM activities WHERE id = ?", [id], function(err) {
      if (err) reject(err);
      else resolve({ deleted: this.changes > 0 });
    });
  });
};



module.exports = {
  db,
  initDatabase,
  getUserByUsername,
  getActivitiesByDate,
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity
};
