# API de Actividades - Documentación

## Descripción General

API REST para gestionar actividades del gimnasio en Supabase. Permite crear, leer, actualizar y eliminar actividades con información de profesor, día, horario y duración.

## Estructura de Datos

### Tabla: activities

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
```

## Campos

- **id**: Identificador único (auto-generado)
- **activity_name**: Nombre de la actividad (Yoga, Spinning, Funcional, etc.)
- **day**: Día de la semana (Lunes, Martes, Miércoles, etc.)
- **start_time**: Hora de inicio (formato HH:MM)
- **end_time**: Hora de finalización (formato HH:MM)
- **duration_hours**: Duración en horas (ej: 1, 1.5, 2)
- **instructor**: Nombre del profesor
- **description**: Descripción de la actividad
- **capacity**: Capacidad máxima de participantes
- **level**: Nivel de dificultad (Todos, Principiante, Intermedio, Avanzado)
- **created_at**: Fecha de creación
- **updated_at**: Fecha de última actualización

## Endpoints

### 1. Crear Actividad

**POST** `/api/activities/create`

```json
{
  "activity_name": "Yoga",
  "day": "Lunes",
  "start_time": "07:00",
  "end_time": "08:00",
  "duration_hours": 1,
  "instructor": "María García",
  "description": "Clase de yoga para principiantes",
  "capacity": 20,
  "level": "Todos"
}
```

**Respuesta (201)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "activity_name": "Yoga",
    "day": "Lunes",
    "start_time": "07:00",
    "end_time": "08:00",
    "duration_hours": 1,
    "instructor": "María García",
    "description": "Clase de yoga para principiantes",
    "capacity": 20,
    "level": "Todos",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### 2. Obtener Todas las Actividades

**GET** `/api/activities/all`

**Respuesta (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "activity_name": "Yoga",
      "day": "Lunes",
      "start_time": "07:00",
      "end_time": "08:00",
      "duration_hours": 1,
      "instructor": "María García",
      "description": "Clase de yoga para principiantes",
      "capacity": 20,
      "level": "Todos",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 3. Obtener Actividades por Día

**GET** `/api/activities/by-day/:day`

Ejemplo: `/api/activities/by-day/Lunes`

**Respuesta (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "activity_name": "Yoga",
      "day": "Lunes",
      "start_time": "07:00",
      "end_time": "08:00",
      "duration_hours": 1,
      "instructor": "María García",
      "description": "Clase de yoga para principiantes",
      "capacity": 20,
      "level": "Todos",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 4. Obtener Actividades por Profesor

**GET** `/api/activities/by-instructor/:instructor`

Ejemplo: `/api/activities/by-instructor/María García`

**Respuesta (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "activity_name": "Yoga",
      "day": "Lunes",
      "start_time": "07:00",
      "end_time": "08:00",
      "duration_hours": 1,
      "instructor": "María García",
      "description": "Clase de yoga para principiantes",
      "capacity": 20,
      "level": "Todos",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 5. Obtener Actividades por Nombre

**GET** `/api/activities/by-activity/:activityName`

Ejemplo: `/api/activities/by-activity/Yoga`

**Respuesta (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "activity_name": "Yoga",
      "day": "Lunes",
      "start_time": "07:00",
      "end_time": "08:00",
      "duration_hours": 1,
      "instructor": "María García",
      "description": "Clase de yoga para principiantes",
      "capacity": 20,
      "level": "Todos",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 6. Obtener Horario por Día

**GET** `/api/activities/schedule/day/:day`

Ejemplo: `/api/activities/schedule/day/Lunes`

**Respuesta (200)**:
```json
{
  "success": true,
  "data": {
    "07:00": [
      {
        "id": 1,
        "activity_name": "Yoga",
        "day": "Lunes",
        "start_time": "07:00",
        "end_time": "08:00",
        "duration_hours": 1,
        "instructor": "María García",
        "description": "Clase de yoga para principiantes",
        "capacity": 20,
        "level": "Todos",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### 7. Obtener Horario Semanal Completo

**GET** `/api/activities/schedule/weekly`

**Respuesta (200)**:
```json
{
  "success": true,
  "data": {
    "Lunes": [
      {
        "id": 1,
        "activity_name": "Yoga",
        "day": "Lunes",
        "start_time": "07:00",
        "end_time": "08:00",
        "duration_hours": 1,
        "instructor": "María García",
        "description": "Clase de yoga para principiantes",
        "capacity": 20,
        "level": "Todos",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
      }
    ],
    "Martes": [],
    "Miércoles": [],
    "Jueves": [],
    "Viernes": [],
    "Sábado": [],
    "Domingo": []
  }
}
```

### 8. Obtener Actividad por ID

**GET** `/api/activities/:id`

Ejemplo: `/api/activities/1`

**Respuesta (200)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "activity_name": "Yoga",
    "day": "Lunes",
    "start_time": "07:00",
    "end_time": "08:00",
    "duration_hours": 1,
    "instructor": "María García",
    "description": "Clase de yoga para principiantes",
    "capacity": 20,
    "level": "Todos",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### 9. Actualizar Actividad

**PUT** `/api/activities/:id`

Ejemplo: `/api/activities/1`

```json
{
  "activity_name": "Yoga Avanzado",
  "day": "Lunes",
  "start_time": "07:00",
  "end_time": "08:30",
  "duration_hours": 1.5,
  "instructor": "María García",
  "description": "Clase de yoga avanzado",
  "capacity": 15,
  "level": "Avanzado"
}
```

**Respuesta (200)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "activity_name": "Yoga Avanzado",
    "day": "Lunes",
    "start_time": "07:00",
    "end_time": "08:30",
    "duration_hours": 1.5,
    "instructor": "María García",
    "description": "Clase de yoga avanzado",
    "capacity": 15,
    "level": "Avanzado",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T11:45:00Z"
  }
}
```

### 10. Eliminar Actividad

**DELETE** `/api/activities/:id`

Ejemplo: `/api/activities/1`

**Respuesta (200)**:
```json
{
  "success": true,
  "message": "Actividad eliminada"
}
```

## Códigos de Error

- **400**: Faltan campos requeridos
- **404**: Actividad no encontrada
- **500**: Error del servidor

## Ejemplos de Uso con cURL

### Crear actividad
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

### Actualizar actividad
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

### Eliminar actividad
```bash
curl -X DELETE http://localhost:3001/api/activities/1
```

## Cargar Datos Iniciales

Para cargar las actividades de ejemplo en Supabase:

```bash
node backend/seed-activities.js
```

## Integración en el Servidor

Agregar en `backend/server.js`:

```javascript
const activitiesRouter = require('./routes/activities-api');
app.use('/api/activities', activitiesRouter);
```

## Notas Importantes

- Los días deben ser: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo
- Las horas deben estar en formato HH:MM (24 horas)
- La duración se calcula automáticamente pero también se puede especificar manualmente
- Todos los campos excepto description, capacity y level son requeridos
- Las actividades se ordenan automáticamente por día y hora
