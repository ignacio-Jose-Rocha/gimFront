// Función serverless simple para mantener Supabase activo
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  try {
    console.log('🔄 Keep-alive ping to Supabase...');
    
    // Hacer fetch directo a Supabase REST API
    const supabaseUrl = 'https://wsntuugxdzynpslbrfdz.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbnR1dWd4ZHp5bnBzbGJyZmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjgxMDAsImV4cCI6MjA2MDk0NDEwMH0.MSD584rXn9x9LkkNk1ITmRJYhppkfPbXqjCjOA0kZOk';
    
    const response = await fetch(`${supabaseUrl}/rest/v1/users?select=count&limit=1`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Keep-alive successful');
      
      return res.status(200).json({
        success: true,
        message: 'Supabase keep-alive ping successful',
        timestamp: new Date().toISOString(),
        status: response.status,
        data_count: data?.length || 0,
        environment: 'Vercel Function'
      });
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
  } catch (error) {
    console.error('❌ Keep-alive error:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      environment: 'Vercel Function'
    });
  }
}
