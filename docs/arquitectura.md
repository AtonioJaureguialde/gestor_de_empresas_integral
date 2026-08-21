# Arquitectura de CleanOps

## Visión General
CleanOps es una aplicación web progresiva (PWA) para la gestión integral de servicios de limpieza.

## Stack Tecnológico

### Fase 1: MVP (Actual)
- **Frontend:** HTML5, CSS3, JavaScript Vanilla
- **Almacenamiento:** localStorage / sessionStorage
- **Despliegue:** GitHub Pages (gratuito)

### Fase 2: Producción
- **Frontend:** React + Vite o Vue 3 + Vite
- **Backend:** Node.js + Express o Serverless Functions
- **Base de Datos:** Supabase (PostgreSQL gratuito hasta 500MB)
- **Autenticación:** Supabase Auth o Firebase Auth
- **Despliegue:** Vercel / Netlify (gratuito)

### Fase 3: Escalado
- **Backend:** API REST / GraphQL
- **Base de Datos:** PostgreSQL con réplicas
- **Cache:** Redis
- **Colas:** Bull / RabbitMQ
- **Monitoreo:** Sentry, LogRocket

## Estructura de Carpetas
```
src/
├── index.html          # Punto de entrada
├── css/                # Estilos modularizados
│   ├── variables.css   # Variables CSS (colores, fuentes)
│   ├── layout.css      # Layout principal
│   ├── components.css  # Componentes reutilizables
│   └── phases/         # Estilos por módulo/fase
├── js/
│   ├── app.js          # Entry point
│   ├── api/            # Comunicación con backend
│   ├── auth/           # Autenticación y autorización
│   ├── ui/             # Componentes UI genéricos
│   ├── views/          # Vistas/pantallas
│   └── features/       # Funcionalidades específicas
└── data/               # Datos seed/demo
```

## Flujo de Datos
1. Usuario interactúa con la UI
2. View procesa la interacción
3. Feature ejecuta la lógica de negocio
4. API se comunica con el backend (o localStorage en MVP)
5. UI se actualiza reactivamente

## Seguridad
- Validación de inputs en frontend y backend
- Tokens JWT para autenticación
- HTTPS obligatorio en producción
- CORS configurado correctamente

## Rendimiento
- Lazy loading de módulos
- Code splitting por rutas
- Cache estratégico de assets
- Imágenes optimizadas (WebP)