# Instrucciones para Configurar Supabase

## Paso 1: Crear la Tabla en Supabase

1. Ve a tu dashboard de Supabase: https://app.supabase.com
2. Selecciona tu proyecto: `jhntnrplogyjdjtlqfba`
3. En el menú lateral, ve a **SQL Editor**
4. Haz clic en **New Query**
5. Copia y pega el siguiente código SQL:

```sql
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
```

6. Haz clic en **Run** (o presiona Ctrl+Enter)
7. Espera a que se complete la ejecución

## Paso 2: Verificar que la Tabla se Creó

1. En el menú lateral, ve a **Table Editor**
2. Deberías ver la tabla `activities` en la lista
3. Haz clic en ella para verificar que tiene las columnas correctas

## Paso 3: Cargar las Actividades

Una vez que la tabla esté creada, ejecuta:

```bash
cd /home/ignacio/Escritorio/gimFront
node backend/seed-activities.js
```

Este comando cargará 25 actividades de ejemplo en la base de datos.

## Paso 4: Verificar que las Actividades se Cargaron

1. Ve a **Table Editor** en Supabase
2. Haz clic en la tabla `activities`
3. Deberías ver todas las actividades listadas

## Credenciales de Supabase

- **URL**: https://jhntnrplogyjdjtlqfba.supabase.co
- **API Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w
- **Database URL**: postgresql://postgres:centerFit@db.jhntnrplogyjdjtlqfba.supabase.co:5432/postgres

## Troubleshooting

### Error: "Table already exists"
Si ves este error, significa que la tabla ya existe. Puedes:
- Eliminar la tabla y crearla de nuevo
- O simplemente ejecutar el seed script

### Error: "Permission denied"
Verifica que estés usando la API Key correcta (anon key, no service role key)

### Las actividades no se cargan
1. Verifica que la tabla exista en Supabase
2. Verifica que las credenciales sean correctas
3. Ejecuta: `node backend/seed-activities.js` nuevamente

## Próximos Pasos

Una vez que todo esté configurado:

1. Inicia el servidor backend:
```bash
cd backend
npm install
node server.js
```

2. Inicia el frontend:
```bash
npm run dev
```

3. Accede a la aplicación en http://localhost:5173

## Usar la API

### Obtener todas las actividades
```bash
curl http://localhost:3001/api/activities/all
```

### Obtener actividades del lunes
```bash
curl http://localhost:3001/api/activities/by-day/Lunes
```

### Obtener actividades de un profesor
```bash
curl http://localhost:3001/api/activities/by-instructor/María%20García
```

### Obtener horario semanal
```bash
curl http://localhost:3001/api/activities/schedule/weekly
```

## Archivos Importantes

- `SUPABASE_SQL.sql` - Script SQL para crear la tabla
- `backend/seed-activities.js` - Script para cargar actividades
- `backend/supabase-activities.js` - Funciones de base de datos
- `backend/routes/activities-api.js` - API REST
- `src/utils/activitiesAPI.js` - Cliente API para React
- `src/components/AdminActividades.jsx` - Componente de administración
