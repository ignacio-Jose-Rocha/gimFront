const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://jhntnrplogyjdjtlqfba.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w';

const supabase = createClient(supabaseUrl, supabaseKey);

const createActivitiesTable = async () => {
  try {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║   Creando Tabla Activities en Supabase ║');
    console.log('╚════════════════════════════════════════╝\n');

    console.log('🔄 Conectando a Supabase...');
    console.log('URL:', supabaseUrl);

    const sqlQuery = `
      CREATE TABLE IF NOT EXISTS activities (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        activity_name VARCHAR(255) NOT NULL,
        day VARCHAR(50) NOT NULL,
        start_time VARCHAR(5) NOT NULL,
        end_time VARCHAR(5) NOT NULL,
        duration_hours DECIMAL(3,1) NOT NULL,
        instructor VARCHAR(255) NOT NULL,
        description TEXT,
        capacity INTEGER,
        level VARCHAR(50) DEFAULT 'Todos',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_activities_day ON activities(day);
      CREATE INDEX IF NOT EXISTS idx_activities_instructor ON activities(instructor);
      CREATE INDEX IF NOT EXISTS idx_activities_activity_name ON activities(activity_name);
    `;

    console.log('📝 Ejecutando SQL...\n');

    const { data, error } = await supabase.rpc('exec', {
      sql: sqlQuery
    }).catch(async () => {
      console.log('⚠️  RPC exec no disponible. Intenta crear la tabla manualmente en Supabase SQL Editor:\n');
      console.log(sqlQuery);
      return { error: { message: 'RPC no disponible' } };
    });

    if (error && error.message !== 'RPC no disponible') {
      console.error('❌ Error:', error);
      return false;
    }

    console.log('✅ Tabla activities creada exitosamente');
    
    console.log('\n🧪 Verificando tabla...');
    const { data: testData, error: testError } = await supabase
      .from('activities')
      .select('*')
      .limit(1);

    if (testError) {
      console.error('⚠️  Error verificando tabla:', testError.message);
      console.log('\n📋 Por favor, crea la tabla manualmente en Supabase SQL Editor con este código:\n');
      console.log(sqlQuery);
      return false;
    }

    console.log('✅ Tabla verificada correctamente');
    console.log('\n✅ Setup completado exitosamente');
    console.log('\n📝 Próximo paso: ejecuta "node backend/seed-activities.js" para cargar actividades');
    return true;

  } catch (error) {
    console.error('❌ Error:', error);
    console.log('\n📋 Por favor, crea la tabla manualmente en Supabase SQL Editor con este código:\n');
    console.log(`
CREATE TABLE IF NOT EXISTS activities (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  activity_name VARCHAR(255) NOT NULL,
  day VARCHAR(50) NOT NULL,
  start_time VARCHAR(5) NOT NULL,
  end_time VARCHAR(5) NOT NULL,
  duration_hours DECIMAL(3,1) NOT NULL,
  instructor VARCHAR(255) NOT NULL,
  description TEXT,
  capacity INTEGER,
  level VARCHAR(50) DEFAULT 'Todos',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_activities_day ON activities(day);
CREATE INDEX IF NOT EXISTS idx_activities_instructor ON activities(instructor);
CREATE INDEX IF NOT EXISTS idx_activities_activity_name ON activities(activity_name);
    `);
    return false;
  }
};

if (require.main === module) {
  createActivitiesTable().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = createActivitiesTable;
