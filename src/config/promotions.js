// Configuraciones de promociones
export const PROMOTIONS = {
  winter: {
    title: "PROMOCIÓN DE INVIERNO",
    subtitle: "¡Mantente en forma durante el invierno!",
    icon: "❄️",
    theme: "winter",
    backgroundImage: "https://images.unsplash.com/photo-1551524164-6cf2ac531400?w=800&h=600&fit=crop&auto=format", // Montañas nevadas
    discount: "50%",
    offerTitle: "🔥 OFERTA ESPECIAL DE INVIERNO 🔥",
    benefits: [
      "✅ Acceso completo al gimnasio",
      "✅ Clases grupales incluidas",
      "✅ Asesoramiento nutricional",
      "✅ Plan de entrenamiento personalizado"
    ],
    validity: "⏰ Oferta válida hasta fin de mes",
    ctaText: "¡QUIERO MI DESCUENTO!",
    whatsappNumber: "5491123456789", // Reemplaza con tu número real de WhatsApp
    whatsappMessage: "¡Hola! Me interesa la promoción de invierno del 50% de descuento. ¿Podrían darme más información?",
    effects: ["❄", "❅", "❆", "❄", "❅", "❆"]
  },

  summer: {
    title: "PROMOCIÓN DE VERANO",
    subtitle: "¡Prepárate para el verano!",
    icon: "☀️",
    theme: "summer",
    backgroundImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&auto=format", // Playa de verano
    discount: "40%",
    offerTitle: "🏖️ OFERTA ESPECIAL DE VERANO 🏖️",
    benefits: [
      "✅ Acceso completo al gimnasio",
      "✅ Clases de aqua aeróbicos",
      "✅ Plan nutricional de verano",
      "✅ Entrenamiento al aire libre"
    ],
    validity: "🌞 Oferta válida durante todo el verano",
    ctaText: "¡QUIERO ESTAR EN FORMA!",
    whatsappNumber: "5491123456789",
    whatsappMessage: "¡Hola! Me interesa la promoción de verano del 40% de descuento.",
    effects: ["☀️", "🌞", "🏖️", "🌊", "🏄", "🌴"]
  },

  autumn: {
    title: "PROMOCIÓN DE OTOÑO",
    subtitle: "¡Renueva tu energía en otoño!",
    icon: "🍂",
    theme: "autumn",
    backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format", // Bosque de otoño
    discount: "35%",
    offerTitle: "🍁 OFERTA ESPECIAL DE OTOÑO 🍁",
    benefits: [
      "✅ Acceso completo al gimnasio",
      "✅ Clases de yoga y pilates",
      "✅ Programa de detox otoñal",
      "✅ Entrenamiento funcional"
    ],
    validity: "🍂 Oferta válida durante el otoño",
    ctaText: "¡RENUEVO MI ENERGÍA!",
    whatsappNumber: "5491123456789",
    whatsappMessage: "¡Hola! Me interesa la promoción de otoño del 35% de descuento.",
    effects: ["🍂", "🍁", "🌰", "🍄", "🦔", "🌾"]
  },

  christmas: {
    title: "PROMOCIÓN NAVIDEÑA",
    subtitle: "¡El mejor regalo para tu salud!",
    icon: "🎄",
    theme: "christmas",
    backgroundImage: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&h=600&fit=crop&auto=format", // Decoración navideña
    discount: "60%",
    offerTitle: "🎁 OFERTA ESPECIAL DE NAVIDAD 🎁",
    benefits: [
      "✅ Acceso completo al gimnasio",
      "✅ Todas las clases grupales",
      "✅ Plan nutricional navideño",
      "✅ Entrenamiento personalizado",
      "✅ Regalo sorpresa incluido"
    ],
    validity: "🎅 Oferta válida hasta fin de año",
    ctaText: "¡QUIERO MI REGALO!",
    whatsappNumber: "5491123456789",
    whatsappMessage: "¡Hola! Me interesa la promoción navideña del 60% de descuento.",
    effects: ["🎄", "🎁", "⭐", "🎅", "❄️", "🔔"]
  }
};

// Función para obtener la promoción actual basada en la fecha
export const getCurrentPromotion = () => {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth() devuelve 0-11

  // Invierno: Junio, Julio, Agosto (hemisferio sur)
  if (month >= 6 && month <= 8) {
    return PROMOTIONS.winter;
  }
  
  // Verano: Diciembre, Enero, Febrero (hemisferio sur)
  if (month === 12 || month <= 2) {
    return PROMOTIONS.summer;
  }
  
  // Otoño: Marzo, Abril, Mayo (hemisferio sur)
  if (month >= 3 && month <= 5) {
    return PROMOTIONS.autumn;
  }
  
  // Primavera: Septiembre, Octubre, Noviembre (hemisferio sur)
  // Durante noviembre y diciembre también mostrar navidad
  if (month >= 11) {
    return PROMOTIONS.christmas;
  }
  
  // Por defecto, mostrar la promoción de invierno
  return PROMOTIONS.winter;
};

// Función para obtener una promoción específica
export const getPromotion = (season) => {
  return PROMOTIONS[season] || null;
};
