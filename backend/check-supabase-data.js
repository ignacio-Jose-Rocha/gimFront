const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://jhntnrplogyjdjtlqfba.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const checkData = async () => {
  console.log('🔍 Verificando estructura de datos en Supabase...\n');

  const { data, error } = await supabase
    .from('activities')
    .select('*');

  if (error) {
    console.error('❌ Error:', error);
  } else {
    console.log('✅ Datos encontrados:', JSON.stringify(data, null, 2));
  }
};

checkData();
