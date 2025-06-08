# 🚀 Configuración de Supabase para el Gimnasio

## 📋 Pasos para Configurar Supabase

### 1. Crear Cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

### 2. Obtener Credenciales
En tu dashboard de Supabase:
1. Ve a **Settings** → **API**
2. Copia:
   - **Project URL** (algo como: `https://xxxxx.supabase.co`)
   - **anon public key** (clave pública)

### 3. Crear Tablas en Supabase

Ve a **SQL Editor** en tu dashboard y ejecuta este SQL:

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de actividades
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  time TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir acceso público (para la demo)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations on activities" ON activities FOR ALL USING (true);
```

### 4. Configurar Variables de Entorno en Vercel

En tu dashboard de Vercel:
1. Ve a tu proyecto
2. Ve a **Settings** → **Environment Variables**
3. Agrega estas variables:

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-clave-publica-aqui
ADMIN_USERNAME=admin
ADMIN_PASSWORD=aguanteAllBoys
JWT_SECRET=gym_secret_key_2024_super_secure
NODE_ENV=production
VERCEL=1
```

### 5. Re-deployar

Después de configurar las variables de entorno, haz un nuevo deploy:
- Vercel detectará los cambios automáticamente
- O puedes hacer un redeploy manual

## ✅ Verificación

Una vez configurado:
1. Ve a tu app en Vercel
2. Intenta hacer login con: `admin` / `aguanteAllBoys`
3. Verifica que puedas crear actividades en el calendario

## 🔧 Desarrollo Local

Para desarrollo local, sigue usando SQLite (no necesitas cambiar nada).
El código detecta automáticamente el entorno y usa:
- **Local**: SQLite
- **Vercel**: Supabase

## 🆘 Solución de Problemas

### Error de conexión a Supabase:
- Verifica que las variables de entorno estén correctas
- Asegúrate de que las tablas estén creadas
- Revisa que las políticas RLS estén configuradas

### Error de autenticación:
- Verifica que el usuario admin se haya creado
- Revisa los logs en Vercel Functions

### Error de CORS:
- Las políticas RLS deben permitir acceso público
- Verifica la configuración de CORS en el servidor

## 📱 Credenciales de Acceso

**Usuario:** `admin`
**Contraseña:** `aguanteAllBoys`

## 🎯 Beneficios de Supabase

- ✅ **Persistencia real**: Los datos no se pierden
- ✅ **Escalabilidad**: Maneja miles de usuarios
- ✅ **Gratuito**: Plan generoso para proyectos pequeños
- ✅ **PostgreSQL**: Base de datos robusta
- ✅ **API REST**: Fácil de usar
- ✅ **Dashboard**: Interfaz visual para gestionar datos
