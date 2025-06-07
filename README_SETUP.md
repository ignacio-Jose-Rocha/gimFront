# Gimnasio App - Setup Local con SQLite

## Descripción
Esta aplicación de gimnasio ahora funciona completamente en local con SQLite para la persistencia de datos. Incluye:

- ✅ Autenticación local con SQLite
- ✅ Usuario: `admin` / Contraseña: `aguanteAllBoys`
- ✅ Gestión de actividades del calendario con persistencia
- ✅ Subida de imágenes local
- ✅ Base de datos SQLite que persiste al reiniciar

## Estructura del Proyecto

```
gimFront/
├── src/                    # Frontend React
├── backend/               # Backend Node.js + Express + SQLite
│   ├── server.js         # Servidor principal
│   ├── database.js       # Configuración SQLite
│   ├── routes/           # Rutas de la API
│   ├── uploads/          # Imágenes subidas
│   └── gym.db           # Base de datos SQLite (se crea automáticamente)
└── package.json          # Scripts para ejecutar todo
```

## Instalación y Configuración

### 1. Instalar dependencias del frontend
```bash
npm install
```

### 2. Instalar dependencias del backend
```bash
cd backend
npm install
cd ..
```

## Ejecución

### Opción 1: Ejecutar todo automáticamente (Recomendado)
```bash
npm run start:dev
```
Este comando ejecuta simultáneamente:
- Backend en `http://localhost:3001`
- Frontend en `http://localhost:5173`

### Opción 2: Ejecutar por separado

**Terminal 1 - Backend:**
```bash
npm run backend:dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Acceso a la Aplicación

1. **Página principal**: `http://localhost:5173`
2. **Login de admin**: Hacer clic en "Admin" en el footer
3. **Credenciales**:
   - Usuario: `admin`
   - Contraseña: `aguanteAllBoys`

## Funcionalidades Implementadas

### ✅ Autenticación
- Login local con SQLite
- JWT para sesiones
- Usuario admin creado automáticamente

### ✅ Gestión de Actividades
- Agregar actividades al calendario
- Persistencia en SQLite
- Formulario intuitivo con validaciones
- Las actividades se mantienen al reiniciar

### ✅ Subida de Imágenes
- Subida local de imágenes del calendario
- Almacenamiento en `/backend/uploads/`
- URLs servidas por el backend

### ✅ Base de Datos
- SQLite con tablas: `users`, `activities`, `calendar_images`
- Inicialización automática
- Persistencia completa

## API Endpoints

### Autenticación
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verificar token
- `POST /api/auth/subir-imagen` - Subir imagen
- `GET /api/auth/ultima-imagen` - Obtener última imagen

### Actividades
- `GET /api/activities` - Obtener todas las actividades
- `GET /api/activities/date/:date` - Actividades por fecha
- `POST /api/activities` - Crear actividad (requiere auth)
- `PUT /api/activities/:id` - Actualizar actividad (requiere auth)
- `DELETE /api/activities/:id` - Eliminar actividad (requiere auth)

## Archivos de Base de Datos

La base de datos SQLite se crea automáticamente en:
```
backend/gym.db
```

**¡IMPORTANTE!** Este archivo contiene todos los datos y se mantiene entre reinicios.

## Solución de Problemas

### Error de conexión al backend
- Verificar que el backend esté ejecutándose en puerto 3001
- Revisar la consola del backend para errores

### Error de base de datos
- Eliminar `backend/gym.db` para recrear la base de datos
- Reiniciar el backend

### Error de permisos de archivos
- Verificar permisos de escritura en la carpeta `backend/uploads/`

## Desarrollo

Para desarrollo, usar:
```bash
npm run start:dev
```

Esto incluye:
- Hot reload del frontend (Vite)
- Auto-restart del backend (nodemon)
- Logs en tiempo real de ambos servicios
