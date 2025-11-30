const bcrypt = require('bcryptjs');

// Configuración de base de datos según el entorno
const isProduction = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';

let db;

if (isVercel || isProduction) {
  // En Vercel o producción, usar Supabase
  const { createClient } = require('@supabase/supabase-js');
  
  const supabaseUrl = process.env.SUPABASE_URL || 'https://jhntnrplogyjdjtlqfba.supabase.co';
  const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w';
  
  db = createClient(supabaseUrl, supabaseKey);
  console.log('🔄 Usando Supabase para entorno de producción');
} else {
  // En desarrollo, usar SQLite local
  const sqlite3 = require('sqlite3').verbose();
  const path = require('path');
  const dbPath = path.join(__dirname, 'gym.db');
  console.log('💾 Usando SQLite local:', dbPath);
  db = new sqlite3.Database(dbPath);
}

// Inicializar la base de datos
const initDatabase = async () => {
  if (isVercel || isProduction) {
    // Inicializar Supabase
    return initSupabase();
  } else {
    // Inicializar SQLite
    return initSQLite();
  }
};

// Inicializar Supabase
const initSupabase = async () => {
  try {
    console.log('🔄 Inicializando Supabase...');

    // Verificar si existe el usuario admin
    const { data: existingUser, error: selectError } = await db
      .from('users')
      .select('*')
      .eq('username', 'admin');

    console.log('👤 Usuarios admin encontrados:', existingUser?.length || 0);

    if (!existingUser || existingUser.length === 0) {
      // Crear usuario admin
      const adminUsername = process.env.ADMIN_USERNAME || 'admin';
      const adminPassword = process.env.ADMIN_PASSWORD || 'aguanteAllBoys';
      const hashedPassword = bcrypt.hashSync(adminPassword, 10);

      console.log('🔐 Creando usuario admin...');
      const { data: newUser, error } = await db
        .from('users')
        .insert([
          {
            username: adminUsername,
            password: hashedPassword,
            role: 'admin'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creando usuario admin:', error);
      } else {
        console.log('✅ Usuario admin creado exitosamente:', newUser);
      }
    } else {
      console.log('✅ Usuario admin ya existe en Supabase');
    }

    // Agregar datos de ejemplo
    await initSampleDataSupabase();

  } catch (error) {
    console.error('❌ Error inicializando Supabase:', error);
    // No lanzar error para que la app siga funcionando
  }
};

// Inicializar SQLite (código original)
const initSQLite = () => {
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
          // Crear usuario admin
          const adminUsername = process.env.ADMIN_USERNAME || 'admin';
          const adminPassword = process.env.ADMIN_PASSWORD || 'aguanteAllBoys';
          const hashedPassword = bcrypt.hashSync(adminPassword, 10);
          db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            [adminUsername, hashedPassword, 'admin'], (err) => {
            if (err) {
              reject(err);
            } else {
              console.log('Usuario admin creado exitosamente');
              resolve();
            }
          });
        } else {
          console.log('Usuario admin ya existe');
          resolve();
        }
      });
    });
  });
};

// Datos de ejemplo para Supabase
const initSampleDataSupabase = async () => {
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

  try {
    // Verificar si ya existen actividades
    const { data: existingActivities } = await db
      .from('activities')
      .select('id')
      .limit(1);

    if (!existingActivities || existingActivities.length === 0) {
      const { error } = await db
        .from('activities')
        .insert(sampleActivities);

      if (error) {
        console.error('Error insertando actividades de ejemplo:', error);
      } else {
        console.log('Actividades de ejemplo creadas en Supabase');
      }
    }
  } catch (error) {
    console.error('Error con datos de ejemplo:', error);
  }
};

// Funciones para usuarios
const getUserByUsername = async (username) => {
  if (isVercel || isProduction) {
    const { data, error } = await db
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      throw error;
    }
    return data;
  } else {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
};

// Funciones para actividades
const getActivitiesByDate = async (date) => {
  if (isVercel || isProduction) {
    const { data, error } = await db
      .from('activities')
      .select('*')
      .eq('date', date)
      .order('time');
    
    if (error) throw error;
    return data || [];
  } else {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM activities WHERE date = ? ORDER BY time", [date], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

const getAllActivities = async () => {
  if (isVercel || isProduction) {
    const { data, error } = await db
      .from('activities')
      .select('*')
      .order('date')
      .order('time');
    
    if (error) throw error;
    return data || [];
  } else {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM activities ORDER BY date, time", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

const createActivity = async (date, title, time, description = '') => {
  if (isVercel || isProduction) {
    const { data, error } = await db
      .from('activities')
      .insert([{ date, title, time, description }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO activities (date, title, time, description) VALUES (?, ?, ?, ?)", 
        [date, title, time, description], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, date, title, time, description });
      });
    });
  }
};

const updateActivity = async (id, date, title, time, description = '') => {
  if (isVercel || isProduction) {
    const { data, error } = await db
      .from('activities')
      .update({ date, title, time, description, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    return new Promise((resolve, reject) => {
      db.run("UPDATE activities SET date = ?, title = ?, time = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", 
        [date, title, time, description, id], function(err) {
        if (err) reject(err);
        else resolve({ id, date, title, time, description });
      });
    });
  }
};

const deleteActivity = async (id) => {
  if (isVercel || isProduction) {
    const { error } = await db
      .from('activities')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { deleted: true };
  } else {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM activities WHERE id = ?", [id], function(err) {
        if (err) reject(err);
        else resolve({ deleted: this.changes > 0 });
      });
    });
  }
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
