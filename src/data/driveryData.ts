export interface AppScreenshotModule {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  image: string;
  alt: string;
  summary: string;
  highlights: string[];
  voicePrompt: string;
}

export interface CapabilityPillar {
  id: string;
  index: string;
  title: string;
  description: string;
  detail: string;
  span: "wide" | "standard";
}

export const SCREENSHOT_MODULES: AppScreenshotModule[] = [
  {
    id: "chat-mesh",
    index: "01",
    title: "Chat Híbrido y Red Mesh P2P",
    shortTitle: "Chat Mesh P2P",
    image: "/assets/aistudio/Screenshot_20261114-174423_6d8ce5d4.jpg",
    alt: "Pantalla de DRIVERY OS mostrando Dry IA y el Canal Familiar con Red Mesh P2P activa",
    summary:
      "Comunícate con tu familia cercana y amigos sin interrupciones mediante conmutación automática entre red tradicional y malla local Bluetooth/Wi-Fi Direct, operativo incluso durante apagones o en modo avión.",
    highlights: [
      "Canal Familiar y Mesh P2P cifrado de extremo a extremo",
      "Conmutación automática entre conexión online y enlace directo offline",
      "Integración directa con Dry IA dentro del mismo hilo de mensajería",
    ],
    voicePrompt: "Activa el canal familiar en modo Mesh y envía mi ubicación",
  },
  {
    id: "mapa-tactico",
    index: "02",
    title: "Mapa Táctico y Rutas Inteligentes",
    shortTitle: "Mapa Táctico",
    image: "/assets/aistudio/Screenshot_20261114-174443_2f9e2a05.jpg",
    alt: "Mapa táctico nocturno de DRIVERY OS con monitoreo de origen y comando de voz para destino",
    summary:
      "Visualiza tu entorno con cartografía táctica de alto contraste, fija puntos de origen precisos y traza rutas inteligentes dictando tu destino al Orbe sin apartar la vista del camino.",
    highlights: [
      "Monitoreo táctico en tiempo real con baja latencia de datos",
      "Búsqueda de destinos y paradas intermedias mediante voz natural",
      "Planificación rápida de salidas urbanas con estimación de recorrido",
    ],
    voicePrompt: "Traza una ruta segura hacia Los Palos Grandes evitando tráfico",
  },
  {
    id: "calculadora-tasas",
    index: "03",
    title: "Calculadora Multi-Divisa en Tiempo Real",
    shortTitle: "Calculadora BCV",
    image: "/assets/aistudio/Screenshot_20261114-174509_19182c39.jpg",
    alt: "Calculadora Digital de DRIVERY OS con conversión instantánea entre USD, BCV y Bolívares",
    summary:
      "Consulta la tasa del día al instante y ejecuta operaciones financieras con conversión simultánea entre USDT, USD, Euro y tasa oficial BCV directamente desde el teclado o por voz.",
    highlights: [
      "Referencias actualizadas de USDT, USD, Euro y tasa BCV",
      "Cálculo aritmético combinado con equivalencia instantánea en pantalla",
      "Envío directo de resultados al Lienzo para llevar registro contable",
    ],
    voicePrompt: "Calcula 150 dólares a tasa BCV y guárdalo en mis cuentas",
  },
  {
    id: "lienzo-notas",
    index: "04",
    title: "Lienzo de Pendientes y Cuentas",
    shortTitle: "Lienzo Inteligente",
    image: "/assets/aistudio/Screenshot_20261114-174534_398e0b4c.jpg",
    alt: "Bloc de Notas Inteligente de DRIVERY OS con filtros de ideas, tareas, apuntes y registros de cálculo",
    summary:
      "Un espacio organizado para anotar pendientes, ideas y llevar el historial exacto de tus cuentas personales con equivalencias cambiarias registradas automáticamente por fecha.",
    highlights: [
      "Clasificación inmediata en Ideas, Tareas, Apuntes y Avisos",
      "Registro automático de cálculos dictados por voz con la tasa del momento",
      "Recordatorios programables mediante lenguaje natural al Orbe",
    ],
    voicePrompt: "Recuérdame pagar el servicio mañana a las 3 de la tarde",
  },
  {
    id: "orbe-salidas",
    index: "05",
    title: "Asistente con Personalidad y Planes",
    shortTitle: "Dry IA y Salidas",
    image: "/assets/aistudio/Screenshot_20261114-175102_dda4f4e0.jpg",
    alt: "Interfaz del Orbe de voz de DRIVERY OS para cuadrar salidas, comida y experiencias",
    summary:
      "Conversa con una inteligencia artificial cercana y resolutiva para cuadrar salidas, descubrir restaurantes o atracciones, pedir páginas web por voz y controlar música en segundo plano.",
    highlights: [
      "Recomendaciones personalizadas de sitios, comida y entretenimiento",
      "Navegador por voz capaz de abrir páginas y reproducir audio en segundo plano",
      "Memoria contextual de tus planes guardados en un solo gesto",
    ],
    voicePrompt: "Cuadra una salida para cenar hoy y pon música en segundo plano",
  },
  {
    id: "acceso-seguro",
    index: "06",
    title: "Acceso Verificado y Ecosistema Unificado",
    shortTitle: "Acceso Seguro",
    image: "/assets/aistudio/Screenshot_20261114-174417_fd89e41e.jpg",
    alt: "Pantalla de bienvenida de DRIVERY OS con acceso verificado mediante Google y WhatsApp",
    summary:
      "Entra en segundos mediante autenticación verificada con Google y tu número de WhatsApp para sincronizar tu identidad, tus canales familiares y tu configuración personal.",
    highlights: [
      "Verificación dual con cuenta de Google y número telefónico",
      "Perfil altamente personalizable adaptado a tu rutina diaria",
      "Sincronización cifrada entre dispositivos sin configuraciones complejas",
    ],
    voicePrompt: "Sincronizar perfil verificado y cargar preferencias de red",
  },
];

export const ECOSYSTEM_PILLARS: CapabilityPillar[] = [
  {
    id: "telco-telemetry",
    index: "01",
    title: "Telemetría Telco 4.0 con y sin internet",
    description:
      "Supervisa la estabilidad de tu señal, latencia y consumo de datos en tiempo real. Cuando la cobertura cae o activas el modo avión, el motor híbrido enlaza nodos cercanos mediante red Mesh P2P.",
    detail: "Auto-Switch Online / Mesh P2P · Baja huella de batería",
    span: "wide",
  },
  {
    id: "voice-browser-music",
    index: "02",
    title: "Navegador por voz y audio continuo",
    description:
      "Pide páginas web, consulta información o reproduce tu música y podcasts en segundo plano mientras usas el mapa táctico o el chat sin interrupciones.",
    detail: "Control manos libres · Reproducción en segundo plano",
    span: "standard",
  },
  {
    id: "rates-ledger",
    index: "03",
    title: "Tasas del día conectadas a tu Lienzo",
    description:
      "Cruza montos entre USDT, USD, Euro y tasa BCV al instante y archiva cada operación en tu Lienzo inteligente para mantener tus cuentas claras.",
    detail: "USDT / USD / EUR / BCV · Historial automático",
    span: "standard",
  },
  {
    id: "dry-ia-personality",
    index: "04",
    title: "IA aplicada con personalidad y criterio",
    description:
      "Dry IA entiende tu contexto local para recomendarte dónde ir, organizar planes con amigos, redactar mensajes y ejecutar tareas entre módulos con una sola instrucción de voz.",
    detail: "Orbe multimodal · Ecosistema personalizable",
    span: "wide",
  },
];

export const SOCIAL_CHANNELS = [
  {
    id: "x",
    label: "X (Twitter)",
    handle: "@DriveryOS",
    href: "https://x.com/intent/tweet?text=Ya%20me%20un%C3%AD%20a%20la%20beta%20exclusiva%20de%20Drivery%20OS%2C%20el%20ecosistema%20Telco%204.0%20con%20chat%20Mesh%20offline%2C%20mapa%20t%C3%A1ctico%20y%20asistente%20por%20voz.",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@drivery.os",
    href: "https://www.instagram.com/",
  },
  {
    id: "telegram",
    label: "Telegram",
    handle: "Comunidad Beta",
    href: "https://t.me/share/url",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: "Invitar contacto",
    href: "https://wa.me/",
  },
];
