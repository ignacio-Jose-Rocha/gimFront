import { useState, useEffect } from 'react';

const KeepAlive = () => {
  const [status, setStatus] = useState('Checking...');
  const [result, setResult] = useState(null);

  const keepAlive = async () => {
    try {
      setStatus('🔄 Pinging Supabase...');
      
      const response = await fetch('https://wsntuugxdzynpslbrfdz.supabase.co/rest/v1/users?select=count&limit=1', {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbnR1dWd4ZHp5bnBzbGJyZmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjgxMDAsImV4cCI6MjA2MDk0NDEwMH0.MSD584rXn9x9LkkNk1ITmRJYhppkfPbXqjCjOA0kZOk',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbnR1dWd4ZHp5bnBzbGJyZmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjgxMDAsImV4cCI6MjA2MDk0NDEwMH0.MSD584rXn9x9LkkNk1ITmRJYhppkfPbXqjCjOA0kZOk'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStatus('✅ Success');
        setResult({
          success: true,
          message: 'Supabase keep-alive ping successful',
          timestamp: new Date().toISOString(),
          status: response.status,
          data_count: data?.length || 0
        });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      setStatus('❌ Error');
      setResult({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  };

  useEffect(() => {
    keepAlive();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'monospace',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1>Supabase Keep Alive</h1>
      <div style={{ marginBottom: '20px' }}>
        <strong>Status:</strong> {status}
      </div>
      {result && (
        <div>
          <strong>Result:</strong>
          <pre style={{ 
            backgroundColor: '#fff', 
            padding: '15px', 
            border: '1px solid #ddd',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={keepAlive}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Again
        </button>
      </div>
    </div>
  );
};

export default KeepAlive;
