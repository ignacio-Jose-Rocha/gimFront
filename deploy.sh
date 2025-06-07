#!/bin/bash

# 🚀 Script de Deployment para Gimnasio App
# Este script prepara y deploya la aplicación a Vercel

echo "🏋️ Preparando deployment de Gimnasio App..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

print_status "Verificando dependencias..."

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
fi

# Verificar que npm esté instalado
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado. Por favor instala npm primero."
    exit 1
fi

print_success "Node.js y npm están instalados"

# Instalar dependencias del frontend
print_status "Instalando dependencias del frontend..."
npm install
if [ $? -ne 0 ]; then
    print_error "Error instalando dependencias del frontend"
    exit 1
fi
print_success "Dependencias del frontend instaladas"

# Instalar dependencias del backend
print_status "Instalando dependencias del backend..."
cd backend
npm install
if [ $? -ne 0 ]; then
    print_error "Error instalando dependencias del backend"
    exit 1
fi
cd ..
print_success "Dependencias del backend instaladas"

# Construir el frontend
print_status "Construyendo el frontend..."
npm run build
if [ $? -ne 0 ]; then
    print_error "Error construyendo el frontend"
    exit 1
fi
print_success "Frontend construido exitosamente"

# Verificar que Vercel CLI esté instalado
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI no está instalado."
    echo "¿Quieres instalarlo ahora? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_status "Instalando Vercel CLI..."
        npm install -g vercel
        if [ $? -ne 0 ]; then
            print_error "Error instalando Vercel CLI"
            exit 1
        fi
        print_success "Vercel CLI instalado"
    else
        print_warning "Puedes instalar Vercel CLI manualmente con: npm install -g vercel"
        print_warning "O deployar manualmente subiendo el código a GitHub y conectando con Vercel Dashboard"
        exit 0
    fi
fi

# Verificar login en Vercel
print_status "Verificando login en Vercel..."
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    print_warning "No estás logueado en Vercel."
    echo "¿Quieres hacer login ahora? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        vercel login
        if [ $? -ne 0 ]; then
            print_error "Error en el login de Vercel"
            exit 1
        fi
    else
        print_warning "Necesitas hacer login en Vercel para deployar: vercel login"
        exit 0
    fi
fi

print_success "Login en Vercel verificado"

# Deployar a Vercel
print_status "Deployando a Vercel..."
echo "¿Es este un deployment de producción? (y/n)"
read -r prod_response

if [[ "$prod_response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    print_status "Deployando a producción..."
    vercel --prod
else
    print_status "Deployando a preview..."
    vercel
fi

if [ $? -eq 0 ]; then
    print_success "🎉 Deployment completado exitosamente!"
    echo ""
    echo "📋 Información importante:"
    echo "• Usuario admin: admin"
    echo "• Contraseña: aguanteAllBoys"
    echo "• Los datos se reinician con cada deploy (SQLite en memoria)"
    echo "• Se cargan datos de ejemplo automáticamente"
    echo ""
    echo "🔗 Tu aplicación está disponible en la URL mostrada arriba"
else
    print_error "Error durante el deployment"
    exit 1
fi
