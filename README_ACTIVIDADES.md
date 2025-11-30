# Sistema de Actividades del Gimnasio

## ✅ Estado Actual

✅ **Tabla creada en Supabase**
✅ **24 actividades cargadas**
✅ **API REST funcional**
✅ **Componente React de administración**
✅ **Interfaz responsive mejorada**

## 📊 Actividades Cargadas

- **Yoga**: Lunes 07:00-08:00 y 18:00-19:00 (María García)
- **Spinning**: Martes 08:00-09:00 y 19:00-20:00 (Carlos López)
- **Funcional**: Lunes, Miércoles, Viernes 09:00-10:00 y Viernes 20:00-21:00 (Juan Martínez)
- **Boxeo**: Martes 19:00-20:00, Jueves 19:00-20:00, Sábado 10:00-11:00 (Facundo Rodríguez)
- **Jiu Jitsu**: Lunes, Miércoles, Viernes 20:00-21:30 (Joaquín Silva)
- **Karate**: Martes, Jueves, Sábado 18:00-19:30 (Mauricio Fernández)
- **Sala de Musculación**: Todos los días (Personal Trainers)

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
cd /home/ignacio/Escritorio/gimFront
npm install
cd backend
npm install
```

### 2. Iniciar el Servidor Backend

```bash
cd backend
node server.js
```

El servidor estará disponible en: `http://localhost:3001`

### 3. Iniciar el Frontend

En otra terminal:

```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 📡 API REST

### Endpoints Disponibles

#### Obtener todas las actividades
```bash
GET http://localhost:3001/api/activities/all
```

#### Obtener actividades por día
```bash
GET http://localhost:3001/api/activities/by-day/Lunes
```

#### Obtener actividades por profesor
```bash
GET http://localhost:3001/api/activities/by-instructor/María%20García
```

#### Obtener actividades por tipo
```bash
GET http://localhost:3001/api/activities/by-activity/Yoga
```

#### Obtener horario por día
```bash
GET http://localhost:3001/api/activities/schedule/day/Lunes
```

#### Obtener horario semanal completo
```bash
GET http://localhost:3001/api/activities/schedule/weekly
```

#### Crear actividad
```bash
POST http://localhost:3001/api/activities/create
Content-Type: application/json

{
  "activity_name": "Yoga",
  "day": "Lunes",
  "start_time": "07:00",
  "end_time": "08:00",
  "duration_hours": 1,
  "instructor": "María García",
  "description": "Clase de yoga",
  "capacity": 20,
  "level": "Todos"
}
```

#### Actualizar actividad
```bash
PUT http://localhost:3001/api/activities/1
Content-Type: application/json

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

#### Eliminar actividad
```bash
DELETE http://localhost:3001/api/activities/1
```

## 🎨 Componentes React

### AdminActividades

Componente completo para administrar actividades:

```javascript
import AdminActividades from './components/AdminActividades';

function App() {
  return <AdminActividades />;
}
```

**Características:**
- Crear nuevas actividades
- Editar actividades existentes
- Eliminar actividades
- Ver horario por día
- Cálculo automático de duración
- Interfaz responsive

### Cliente API

```javascript
import activitiesAPI from '../utils/activitiesAPI';

const getAllActivities = async () => {
  const response = await activitiesAPI.getAllActivities();
  console.log(response.data);
};

const createActivity = async () => {
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
  console.log(response.data);
};
```

## 📁 Estructura de Archivos

```
gimFront/
├── backend/
│   ├── supabase-activities.js      # Funciones de base de datos
│   ├── routes/
│   │   └── activities-api.js       # Rutas API REST
│   ├── check-and-seed.js           # Script para cargar actividades
│   ├── server.js                   # Servidor principal
│   └── package.json
├── src/
│   ├── components/
│   │   ├── AdminActividades.jsx    # Componente de administración
│   │   ├── AdminActividades.css    # Estilos
│   │   ├── actividades.jsx         # Componente de visualización
│   │   └── actividades.css         # Estilos mejorados
│   ├── utils/
│   │   └── activitiesAPI.js        # Cliente API
│   └── App.tsx
├── SUPABASE_SQL.sql                # Script SQL
├── INSTRUCCIONES_SUPABASE.md       # Instrucciones de setup
├── ACTIVITIES_API.md               # Documentación API
└── README_ACTIVIDADES.md           # Este archivo
```

## 🔧 Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz:

```env
SUPABASE_URL=https://jhntnrplogyjdjtlqfba.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRucnBsb2d5amRqdGxxZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM5NTAsImV4cCI6MjA4MDAzOTk1MH0.JkeEhZdJsHZvFlpThKBy5KHviFtP8czS5aB4mzJXm-w
NODE_ENV=development
```

## 📱 Responsive Design

La interfaz se adapta a:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

## 🐛 Troubleshooting

### Error: "Tabla no existe"
Ejecuta: `node backend/check-and-seed.js`

### Error: "Conexión rechazada"
Verifica que:
1. Supabase esté en línea
2. Las credenciales sean correctas
3. El servidor esté corriendo

### Las actividades no se cargan
1. Verifica la conexión a Supabase
2. Ejecuta: `node backend/check-and-seed.js`
3. Verifica que la tabla tenga datos

## 📚 Documentación Adicional

- `ACTIVITIES_API.md` - Documentación completa de la API
- `INSTRUCCIONES_SUPABASE.md` - Instrucciones de configuración
- `SETUP_ACTIVITIES.md` - Guía de instalación

## 🎯 Próximas Mejoras

- [ ] Agregar autenticación
- [ ] Implementar reservas
- [ ] Agregar notificaciones
- [ ] Dashboard de estadísticas
- [ ] Exportar horario a PDF
- [ ] Integración con calendario

## 📞 Soporte

Para problemas o preguntas, revisa:
1. Los archivos de documentación
2. Los comentarios en el código
3. Los logs de la consola

## ✨ Características Implementadas

✅ Interfaz responsive mejorada
✅ Sistema completo de actividades
✅ API REST funcional
✅ Base de datos Supabase
✅ Componente de administración
✅ Cliente API JavaScript
✅ 24 actividades de ejemplo
✅ Documentación completa
✅ Sin comentarios en el código (como solicitaste)
