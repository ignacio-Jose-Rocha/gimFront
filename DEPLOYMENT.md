# 🚀 Guía de Deployment - Gimnasio App

## 📋 Configuración para Vercel

### **Preparación del Proyecto**

1. **Asegurar que todos los archivos estén listos:**
   ```bash
   npm run build  # Construir el frontend
   ```

2. **Verificar estructura de archivos:**
   ```
   gimFront/
   ├── backend/           # Backend Node.js + SQLite
   ├── src/              # Frontend React
   ├── dist/             # Build del frontend (generado)
   ├── vercel.json       # Configuración de Vercel
   └── package.json      # Scripts principales
   ```

### **Deployment en Vercel**

#### **Opción 1: Vercel CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Hacer login
vercel login

# Deployar
vercel --prod
```

#### **Opción 2: GitHub + Vercel Dashboard**
1. Subir código a GitHub
2. Conectar repositorio en [vercel.com](https://vercel.com)
3. Configurar variables de entorno (si es necesario)
4. Deploy automático

### **Variables de Entorno en Vercel**
En el dashboard de Vercel, agregar:
```
NODE_ENV=production
VERCEL=1
```

## 🗄️ **Base de Datos en Producción**

### **SQLite en Vercel**
- ✅ **Desarrollo**: SQLite archivo local (`gym.db`)
- ✅ **Producción**: SQLite en memoria (se reinicia con cada deploy)
- ✅ **Datos de ejemplo**: Se cargan automáticamente en producción

### **Comportamiento:**
- **Local**: Los datos persisten entre reinicios
- **Vercel**: Los datos se reinician con cada deploy, pero se cargan datos de ejemplo automáticamente

### **Datos de Ejemplo Incluidos:**
- Usuario admin: `admin` / `aguanteAllBoys`
- Actividades de ejemplo para la semana actual
- Configuración automática de la base de datos

## 🔧 **Configuración Automática**

### **Detección de Entorno**
La app detecta automáticamente el entorno:
```javascript
// Desarrollo
API_BASE_URL = 'http://localhost:3001/api'

// Producción
API_BASE_URL = '/api'
```

### **Inicialización de Base de Datos**
```javascript
// Se ejecuta automáticamente:
1. Crear tablas (users, activities)
2. Crear usuario admin
3. Cargar datos de ejemplo (solo en producción)
```

## 📱 **URLs de Acceso**

### **Desarrollo**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

### **Producción (Vercel)**
- App completa: `https://tu-app.vercel.app`
- API: `https://tu-app.vercel.app/api`

## 🔐 **Credenciales de Acceso**

**En cualquier entorno:**
- Usuario: `admin`
- Contraseña: `aguanteAllBoys`

## 🚨 **Limitaciones en Vercel**

### **SQLite en Memoria**
- Los datos se pierden con cada deploy
- Ideal para demos y testing
- Para producción real, considerar PostgreSQL o MongoDB

### **Alternativas para Persistencia Real**
1. **Vercel Postgres**: Base de datos PostgreSQL
2. **MongoDB Atlas**: Base de datos NoSQL
3. **PlanetScale**: MySQL serverless
4. **Supabase**: PostgreSQL con API REST

## 🔄 **Migración a Base de Datos Persistente**

Si necesitas persistencia real, puedes migrar fácilmente:

1. **Cambiar en `backend/database.js`**:
   ```javascript
   // Reemplazar SQLite con PostgreSQL/MongoDB
   ```

2. **Actualizar variables de entorno**:
   ```
   DATABASE_URL=postgresql://...
   ```

3. **Mantener la misma API**: El frontend no necesita cambios

## ✅ **Checklist de Deployment**

- [ ] Código subido a GitHub
- [ ] `vercel.json` configurado
- [ ] Build del frontend exitoso
- [ ] Variables de entorno configuradas
- [ ] Deploy realizado
- [ ] Login funcionando
- [ ] Actividades cargándose
- [ ] CRUD de actividades operativo

## 🆘 **Troubleshooting**

### **Error de Build**
```bash
# Limpiar y reconstruir
rm -rf dist node_modules
npm install
npm run build
```

### **Error de API**
- Verificar que `vercel.json` esté configurado
- Revisar logs en Vercel Dashboard
- Confirmar variables de entorno

### **Error de Base de Datos**
- Los datos se reinician automáticamente
- Verificar que el usuario admin se cree correctamente
- Revisar logs del servidor

## 📞 **Soporte**

Si tienes problemas con el deployment:
1. Revisar logs en Vercel Dashboard
2. Verificar configuración de `vercel.json`
3. Confirmar que el build local funcione
4. Revisar variables de entorno
