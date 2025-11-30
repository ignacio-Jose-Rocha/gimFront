const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://jhntnrplogyjdjtlqfba.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w';

const supabase = createClient(supabaseUrl, supabaseKey);

const setupSupabase = async () => {
  try {
    console.log('🔄 Conectando a Supabase...');
    console.log('URL:', supabaseUrl);

    const { data: testData, error: testError } = await supabase
      .from('activities')
      .select('count', { count: 'exact' })
      .limit(1);

    if (testError) {
      if (testError.code === 'PGRST116' || testError.message.includes('does not exist')) {
        console.log('⚠️  Tabla activities no existe. Creando tabla...');
        
        const { data: createResult, error: createError } = await supabase
          .rpc('create_activities_table');

        if (createError) {
          console.log('⚠️  No se pudo crear tabla con RPC. Intenta crear manualmente en Supabase SQL Editor:');
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
      } else {
        console.error('❌ Error conectando a Supabase:', testError);
        return false;
      }
    }

    console.log('✅ Conexión a Supabase exitosa');
    console.log('✅ Tabla activities existe');
    return true;
  } catch (error) {
    console.error('❌ Error en setupSupabase:', error);
    return false;
  }
};

const testConnection = async () => {
  try {
    console.log('\n🧪 Probando conexión...');
    
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error en consulta:', error);
      return false;
    }

    console.log('✅ Consulta exitosa');
    console.log(`📊 Actividades en base de datos: ${data.length}`);
    return true;
  } catch (error) {
    console.error('❌ Error en testConnection:', error);
    return false;
  }
};

const main = async () => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   Setup Supabase - Actividades Gym    ║');
  console.log('╚════════════════════════════════════════╝\n');

  const setupOk = await setupSupabase();
  
  if (setupOk) {
    const testOk = await testConnection();
    
    if (testOk) {
      console.log('\n✅ Setup completado exitosamente');
      console.log('\n📝 Próximo paso: ejecuta "node backend/seed-activities.js" para cargar actividades');
    } else {
      console.log('\n⚠️  Setup parcial - verifica la conexión');
    }
  } else {
    console.log('\n❌ Setup fallido - verifica las credenciales de Supabase');
  }
};

if (require.main === module) {
  main().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { setupSupabase, testConnection };
