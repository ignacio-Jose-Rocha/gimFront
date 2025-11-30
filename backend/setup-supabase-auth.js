const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const SUPABASE_URL = 'https://jhntnrplogyjdjtlqfba.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const setupAuth = async () => {
  console.log('🔍 Configurando autenticación en Supabase...\n');

  try {
    // 1. Verificar si la tabla users existe
    const { data: checkTable, error: tableError } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (tableError) {
      console.log('❌ La tabla "users" no existe o no tienes permisos.');
      console.log('\n🔧 Debes crear la tabla "users" en Supabase con este SQL:');
      console.log('CREATE TABLE users (');
      console.log('  id BIGSERIAL PRIMARY KEY,');
      console.log('  username TEXT UNIQUE NOT NULL,');
      console.log('  password TEXT NOT NULL,');
      console.log('  role TEXT DEFAULT \'admin\',');
      console.log('  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
      console.log(');\n');
      console.log('ALTER TABLE users ENABLE ROW LEVEL SECURITY;\n');
      console.log('CREATE POLICY "Allow public read" ON users FOR SELECT USING (true);\n');
      console.log('CREATE POLICY "Allow all operations" ON users FOR ALL USING (true);\n');
      return;
    }

    // 2. Verificar si el usuario admin existe
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('username', 'admin');

    if (existingUser && existingUser.length > 0) {
      console.log('✅ El usuario "admin" ya existe.');
      
      // Opcional: Actualizar contraseña si se desea
      // const hashedPassword = bcrypt.hashSync('aguanteAllBoys', 10);
      // await supabase.from('users').update({ password: hashedPassword }).eq('username', 'admin');
      // console.log('✅ Contraseña actualizada.');
    } else {
      console.log('👤 Creando usuario "admin"...');
      const hashedPassword = bcrypt.hashSync('aguanteAllBoys', 10);
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([
          {
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
          }
        ])
        .select();

      if (createError) {
        console.error('❌ Error creando usuario:', createError.message);
      } else {
        console.log('✅ Usuario "admin" creado exitosamente.');
        console.log('   Usuario: admin');
        console.log('   Contraseña: aguanteAllBoys');
      }
    }

  } catch (err) {
    console.error('💥 Error general:', err.message);
  }
};

setupAuth();
