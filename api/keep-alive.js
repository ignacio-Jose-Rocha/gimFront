const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://wsntuugxdzynpslbrfdz.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbnR1dWd4ZHp5bnBzbGJyZmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjgxMDAsImV4cCI6MjA2MDk0NDEwMH0.MSD584rXn9x9LkkNk1ITmRJYhppkfPbXqjCjOA0kZOk';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  try {
    console.log('🔄 Keep-alive ping to Supabase...');
    
    // Hacer una consulta simple para mantener la conexión activa
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Keep-alive error:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
    
    console.log('✅ Keep-alive successful');
    
    res.status(200).json({
      success: true,
      message: 'Supabase keep-alive ping successful',
      timestamp: new Date().toISOString(),
      data_count: data?.length || 0
    });
    
  } catch (err) {
    console.error('❌ Keep-alive exception:', err);
    res.status(500).json({
      success: false,
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
};
