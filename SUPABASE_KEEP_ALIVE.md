# 🔄 Mantener Supabase Activo

## 📋 Problema
Supabase en el plan gratuito entra en "pausa" después de 1 semana de inactividad.

## ✅ Soluciones Implementadas

### 1. **Vercel Cron Job (Automático)**
- ✅ **Configurado:** Ping cada 6 horas a Supabase
- ✅ **Endpoint:** `/api/keep-alive`
- ✅ **Horario:** `0 */6 * * *` (cada 6 horas)
- ✅ **Gratis:** Incluido en Vercel

**Verificar que funciona:**
- Ve a: `https://tu-app.vercel.app/api/keep-alive`
- Deberías ver: `{"success": true, "message": "Supabase keep-alive ping successful"}`

### 2. **UptimeRobot (Backup)**
Si quieres doble seguridad:

1. **Regístrate:** [uptimerobot.com](https://uptimerobot.com)
2. **Nuevo Monitor:**
   - **Tipo:** HTTP(S)
   - **URL:** `https://tu-app.vercel.app/api/keep-alive`
   - **Intervalo:** 5 minutos
   - **Gratis:** Hasta 50 monitores

## 🎯 Opciones de Upgrade

### **Plan Pro ($25/mes)**
- ✅ **Sin pausing automático**
- ✅ **Mejor rendimiento**
- ✅ **500MB → 8GB storage**
- ✅ **Backups automáticos**
- ✅ **Soporte prioritario**

**Cómo upgradearlo:**
1. Dashboard Supabase → **Settings** → **Billing**
2. **Upgrade to Pro**

## 🔍 Monitoreo

### **Verificar Estado:**
- **Endpoint:** `https://tu-app.vercel.app/api/keep-alive`
- **Dashboard Supabase:** Settings → General → Project Status

### **Logs en Vercel:**
1. **Dashboard Vercel** → tu proyecto
2. **Functions** → `keep-alive`
3. **Ver logs** de ejecución

## ⚙️ Configuración Actual

### **Cron Schedule:**
```
0 */6 * * *  # Cada 6 horas
```

### **Función Keep-Alive:**
- Hace una consulta simple a la tabla `users`
- Registra timestamp de la actividad
- Retorna status de éxito/error

## 🚨 Qué Hacer Si Se Pausa

Si Supabase se pausa a pesar del keep-alive:

1. **Ve al Dashboard de Supabase**
2. **Haz click en "Resume Project"**
3. **Espera 1-2 minutos** a que se reactive
4. **Verifica** que el keep-alive funcione

## 📊 Estadísticas

### **Plan Gratuito:**
- **Pausa:** Después de 7 días de inactividad
- **Storage:** 500MB
- **Requests:** 50,000/mes
- **Bandwidth:** 2GB/mes

### **Con Keep-Alive:**
- **Actividad:** Cada 6 horas
- **Consumo:** ~1,440 requests/mes
- **Impacto:** Mínimo en límites gratuitos

## 🎯 Recomendación

**Para uso personal/demo:** Keep-alive automático (ya configurado)
**Para producción:** Upgrade a Plan Pro ($25/mes)
