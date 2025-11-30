import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jhntnrplogyjdjtlqfba.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seedAdmin() {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          nombre: 'admin',
          password: 'centerFit'
        }
      ]);

    if (error) throw error;
    console.log('✅ Admin creado exitosamente');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

seedAdmin();
