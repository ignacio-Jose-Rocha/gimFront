const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://jhntnrplogyjdjtlqfba.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const setupSupabase = async () => {
  console.log('🔍 Verificando conexión a Supabase...\n');

  try {
    // Verificar si la tabla existe intentando hacer una consulta
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error:', error.message);
      console.log('\n📋 La tabla "activities" no existe o no tienes permisos.');
      console.log('\n🔧 Para crear la tabla, ve a tu proyecto en Supabase:');
      console.log('   1. Abre https://supabase.com/dashboard');
      console.log('   2. Selecciona tu proyecto');
      console.log('   3. Ve a "SQL Editor"');
      console.log('   4. Ejecuta este SQL:\n');
      console.log('CREATE TABLE activities (');
      console.log('  id BIGSERIAL PRIMARY KEY,');
      console.log('  date TEXT NOT NULL,');
      console.log('  title TEXT NOT NULL,');
      console.log('  time TEXT NOT NULL,');
      console.log('  description TEXT,');
      console.log('  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),');
      console.log('  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
      console.log(');\n');
      console.log('-- Habilitar Row Level Security');
      console.log('ALTER TABLE activities ENABLE ROW LEVEL SECURITY;\n');
      console.log('-- Permitir lectura pública');
      console.log('CREATE POLICY "Allow public read access" ON activities');
      console.log('  FOR SELECT USING (true);\n');
      console.log('-- Permitir escritura autenticada (opcional)');
      console.log('CREATE POLICY "Allow authenticated insert" ON activities');
      console.log('  FOR INSERT WITH CHECK (true);\n');
      console.log('CREATE POLICY "Allow authenticated update" ON activities');
      console.log('  FOR UPDATE USING (true);\n');
      console.log('CREATE POLICY "Allow authenticated delete" ON activities');
      console.log('  FOR DELETE USING (true);\n');
    } else {
      console.log('✅ Conexión exitosa a Supabase!');
      console.log(`📊 Actividades encontradas: ${data.length}`);
      
      if (data.length === 0) {
        console.log('\n📝 La tabla está vacía. ¿Quieres agregar actividades de prueba?');
        console.log('   Ejecuta: node add-test-activities.js');
      } else {
        console.log('\n📋 Actividades en la base de datos:');
        data.forEach((activity, index) => {
          console.log(`   ${index + 1}. ${activity.title} - ${activity.date} (${activity.time})`);
        });
      }
    }
  } catch (err) {
    console.error('💥 Error de conexión:', err.message);
  }
};

setupSupabase();
