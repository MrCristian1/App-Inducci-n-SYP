# Plataforma de Inducción - Solutions and Payroll (React Version)

Esta plataforma web interactiva está diseñada para automatizar el proceso de inducción de la empresa Solutions and Payroll, utilizando elementos de gamificación para hacer el aprendizaje más dinámico y atractivo. Esta versión ha sido migrada a React, Tailwind CSS y Vite para mejorar la experiencia de desarrollo y el rendimiento.

## Características Principales

- **Experiencia Gamificada**: Recorrido por niveles con desbloqueo progresivo.
- **Contenido Estructurado**: Organizado en 5 secciones temáticas clave.
- **Quizzes Interactivos**: Preguntas para reforzar el aprendizaje en cada sección.
- **Sistema de Logros**: Insignias por completar cada nivel.
- **Diseño Responsivo**: Funciona en dispositivos móviles y de escritorio.
- **Almacenamiento Local**: Guarda el progreso del usuario durante la sesión.
- **Animaciones Fluidas**: Implementadas con Framer Motion.
- **Iconografía Rica**: Integración con FontAwesome.

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario
- **Vite**: Herramienta de compilación rápida para desarrollo moderno
- **Tailwind CSS**: Framework CSS utilitario para diseño rápido y consistente
- **Framer Motion**: Biblioteca de animaciones para React
- **React Router**: Enrutamiento declarativo para React
- **FontAwesome**: Iconos vectoriales escalables

## Estructura del Proyecto

```
/
├── index.html                # Punto de entrada HTML
├── vite.config.js            # Configuración de Vite
├── tailwind.config.js        # Configuración de Tailwind CSS
├── postcss.config.js         # Configuración de PostCSS
├── package.json              # Dependencias y scripts
├── src/
│   ├── main.jsx              # Punto de entrada de React
│   ├── App.jsx               # Componente principal
│   ├── index.css             # Estilos globales con Tailwind
│   ├── assets/               # Recursos estáticos
│   │   └── logo.svg          # Logo de la empresa
│   ├── components/           # Componentes reutilizables
│   │   ├── Confetti.jsx      # Efecto de confeti para celebraciones
│   │   ├── LevelNode.jsx     # Nodo de nivel para el mapa
│   │   └── QuizOption.jsx    # Opción de quiz
│   ├── context/              # Contexto global
│   │   └── AppContext.jsx    # Gestión de estado global
│   ├── data/                 # Datos de la aplicación
│   │   └── appData.js        # Contenido y configuración
│   ├── hooks/                # Hooks personalizados
│   └── pages/                # Páginas de la aplicación
│       ├── Welcome.jsx       # Pantalla de bienvenida
│       ├── Map.jsx           # Mapa de niveles
│       ├── LevelContent.jsx  # Contenido y quiz de nivel
│       ├── Achievement.jsx   # Pantalla de logro
│       └── FinalAchievement.jsx # Logro final
```

## Cómo Iniciar el Proyecto

1. Instalar dependencias:
   ```
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```
   npm run dev
   ```

3. Construir para producción:
   ```
   npm run build
   ```

## Cómo Personalizar el Contenido

Todo el contenido de la plataforma se encuentra en el archivo `src/data/appData.js`. Puedes modificar:

1. **Información de la Empresa**: Nombre, configuración general.
2. **Contenido de los Niveles**: Textos informativos, preguntas y respuestas.
3. **Logros**: Nombres, iconos y descripciones de las insignias.

## Personalización Visual

Los colores principales se definen en `tailwind.config.js` y pueden ser modificados para adaptarse a los colores corporativos:

```js
theme: {
  extend: {
    colors: {
      primary: '#e63946',    // Rojo corporativo
      secondary: '#1d3557',  // Azul corporativo
      light: '#f1faee',      // Blanco/crema para fondos
      accent: '#457b9d',     // Azul medio para acentos
      success: '#2a9d8f',    // Verde para éxito
      warning: '#e9c46a',    // Amarillo para advertencias
    },
  },
},
```

## Posibles Mejoras Futuras

- Integración con sistema de autenticación para seguimiento por usuario
- Panel de administración para gestionar contenidos sin editar código
- Estadísticas de completitud y rendimiento de los usuarios
- Más elementos de gamificación como tablas de clasificación o puntos
- Implementación de tests unitarios y de integración
- Optimización para PWA (Progressive Web App)

---

Desarrollado para Solutions and Payroll © 2023