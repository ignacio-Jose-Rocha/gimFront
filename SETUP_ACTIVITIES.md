# Configuración del Sistema de Actividades

## Descripción

Sistema completo para gestionar actividades del gimnasio con información de profesor, día, horario y duración. Incluye API REST, base de datos Supabase y componentes React.

## Archivos Creados

### Backend
- `backend/supabase-activities.js` - Funciones para interactuar con Supabase
- `backend/routes/activities-api.js` - Rutas API REST
- `backend/seed-activities.js` - Script para cargar datos iniciales
- `backend/server-setup.js` - Configuración del servidor

### Frontend
- `src/utils/activitiesAPI.js` - Cliente API para React
- `src/components/AdminActividades.jsx` - Componente de administración
- `src/components/AdminActividades.css` - Estilos del componente

### Documentación
- `ACTIVITIES_API.md` - Documentación completa de la API
- `SETUP_ACTIVITIES.md` - Este archivo

## Instalación

### 1. Instalar Dependencias

```bash
cd backend
npm install @supabase/supabase-js
```

### 2. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
SUPABASE_URL=https://wsntuugxdzynpslbrfdz.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbnR1dWd4ZHp5bnBzbGJyZmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjgxMDAsImV4cCI6MjA2MDk0NDEwMH0.MSD584rXn9x9LkkNk1ITmRJYhppkfPbXqjCjOA0kZOk
NODE_ENV=development
```

### 3. Crear Tabla en Supabase

En el dashboard de Supabase, ejecutar:

```sql
CREATE TABLE activities (
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

CREATE INDEX idx_activities_day ON activities(day);
CREATE INDEX idx_activities_instructor ON activities(instructor);
CREATE INDEX idx_activities_activity_name ON activities(activity_name);
```

### 4. Integrar en el Servidor

En `backend/server.js`, agregar:

```javascript
const activitiesRouter = require('./routes/activities-api');
app.use('/api/activities', activitiesRouter);
```

### 5. Cargar Datos Iniciales

```bash
node backend/seed-activities.js
```

## Uso

### API REST

#### Crear Actividad
```bash
curl -X POST http://localhost:3001/api/activities/create \
  -H "Content-Type: application/json" \
  -d '{
    "activity_name": "Yoga",
    "day": "Lunes",
    "start_time": "07:00",
    "end_time": "08:00",
    "duration_hours": 1,
    "instructor": "María García",
    "description": "Clase de yoga para principiantes",
    "capacity": 20,
    "level": "Todos"
  }'
```

#### Obtener Todas las Actividades
```bash
curl http://localhost:3001/api/activities/all
```

#### Obtener Actividades por Día
```bash
curl http://localhost:3001/api/activities/by-day/Lunes
```

#### Obtener Actividades por Profesor
```bash
curl http://localhost:3001/api/activities/by-instructor/María%20García
```

#### Obtener Horario Semanal
```bash
curl http://localhost:3001/api/activities/schedule/weekly
```

#### Actualizar Actividad
```bash
curl -X PUT http://localhost:3001/api/activities/1 \
  -H "Content-Type: application/json" \
  -d '{
    "activity_name": "Yoga Avanzado",
    "day": "Lunes",
    "start_time": "07:00",
    "end_time": "08:30",
    "duration_hours": 1.5,
    "instructor": "María García",
    "description": "Clase de yoga avanzado",
    "capacity": 15,
    "level": "Avanzado"
  }'
```

#### Eliminar Actividad
```bash
curl -X DELETE http://localhost:3001/api/activities/1
```

### React

#### Usar el Cliente API

```javascript
import activitiesAPI from '../utils/activitiesAPI';

const getAllActivities = async () => {
  try {
    const response = await activitiesAPI.getAllActivities();
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const createNewActivity = async () => {
  try {
    const response = await activitiesAPI.createActivity({
      activity_name: 'Yoga',
      day: 'Lunes',
      start_time: '07:00',
      end_time: '08:00',
      duration_hours: 1,
      instructor: 'María García',
      description: 'Clase de yoga',
      capacity: 20,
      level: 'Todos'
    });
    console.log('Actividad creada:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Usar el Componente de Administración

```javascript
import AdminActividades from './components/AdminActividades';

function App() {
  return (
    <div>
      <AdminActividades />
    </div>
  );
}
```

## Estructura de Datos

### Actividad

```javascript
{
  id: 1,
  activity_name: "Yoga",
  day: "Lunes",
  start_time: "07:00",
  end_time: "08:00",
  duration_hours: 1,
  instructor: "María García",
  description: "Clase de yoga para principiantes",
  capacity: 20,
  level: "Todos",
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z"
}
```

## Funciones Disponibles

### Backend (supabase-activities.js)

- `createActivity(activityData)` - Crear nueva actividad
- `getAllActivities()` - Obtener todas las actividades
- `getActivitiesByDay(day)` - Obtener actividades por día
- `getActivitiesByInstructor(instructor)` - Obtener actividades por profesor
- `getActivitiesByActivityName(activityName)` - Obtener actividades por nombre
- `getActivityById(id)` - Obtener actividad por ID
- `updateActivity(id, activityData)` - Actualizar actividad
- `deleteActivity(id)` - Eliminar actividad
- `getScheduleByDay(day)` - Obtener horario por día
- `getWeeklySchedule()` - Obtener horario semanal completo

### Frontend (activitiesAPI.js)

- `createActivity(activityData)` - Crear actividad
- `getAllActivities()` - Obtener todas las actividades
- `getActivitiesByDay(day)` - Obtener por día
- `getActivitiesByInstructor(instructor)` - Obtener por profesor
- `getActivitiesByActivityName(activityName)` - Obtener por nombre
- `getActivityById(id)` - Obtener por ID
- `updateActivity(id, activityData)` - Actualizar
- `deleteActivity(id)` - Eliminar
- `getScheduleByDay(day)` - Horario por día
- `getWeeklySchedule()` - Horario semanal

## Validaciones

- Campos requeridos: activity_name, day, start_time, end_time, duration_hours, instructor
- Días válidos: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo
- Formato de hora: HH:MM (24 horas)
- Duración mínima: 0.5 horas
- Niveles: Todos, Principiante, Intermedio, Avanzado

## Mejoras Responsive

El componente AdminActividades incluye:
- Grid responsivo que se adapta a diferentes tamaños de pantalla
- Diseño mobile-first
- Breakpoints en 768px y 480px
- Fuentes escalables con clamp()
- Espaciado adaptativo

## Troubleshooting

### Error: "Tabla activities no existe"
Ejecutar el script SQL en Supabase para crear la tabla.

### Error: "Faltan campos requeridos"
Verificar que todos los campos obligatorios estén presentes en la solicitud.

### Error: "Error conectando a Supabase"
Verificar que las variables de entorno SUPABASE_URL y SUPABASE_ANON_KEY sean correctas.

### Las actividades no se cargan
Verificar que el servidor esté corriendo en el puerto correcto (3001 por defecto).

## Próximas Mejoras

- Agregar autenticación para proteger endpoints
- Implementar paginación
- Agregar búsqueda avanzada
- Implementar reservas de actividades
- Agregar notificaciones por email
- Crear dashboard de estadísticas
