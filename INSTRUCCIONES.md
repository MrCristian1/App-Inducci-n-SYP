# Instrucciones de Instalación y Uso

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14.0.0 o superior)
- npm (viene incluido con Node.js)

## Instalación

### Opción 1: Usando el Script de Instalación

1. Abre PowerShell como administrador
2. Navega hasta la carpeta del proyecto
3. Ejecuta el script de instalación:

```powershell
.\install-dependencies.ps1
```

### Opción 2: Instalación Manual

1. Abre una terminal o línea de comandos
2. Navega hasta la carpeta del proyecto
3. Ejecuta el siguiente comando para instalar las dependencias:

```
npm install
```

## Ejecución del Proyecto

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

```
npm run dev
```

Esto iniciará la aplicación en modo desarrollo. Abre [http://localhost:5173](http://localhost:5173) para verla en el navegador.

La página se recargará automáticamente si realizas cambios en el código.

### Construcción para Producción

Para construir la aplicación para producción:

```
npm run build
```

Esto generará una versión optimizada de la aplicación en la carpeta `dist`.

### Vista Previa de Producción

Para previsualizar la versión de producción:

```
npm run preview
```

## Estructura de Archivos Importantes

- `src/data/appData.js`: Contiene toda la información de la inducción (niveles, preguntas, respuestas)
- `src/context/AppContext.jsx`: Gestiona el estado global de la aplicación
- `src/pages/`: Contiene todas las páginas principales de la aplicación
- `src/components/`: Contiene componentes reutilizables

## Personalización

### Modificar Contenido

Para modificar el contenido de la inducción, edita el archivo `src/data/appData.js`:

- Información de la empresa
- Niveles y su contenido
- Preguntas y respuestas
- Logros y badges

### Modificar Estilos

Los estilos principales se definen en:

- `tailwind.config.js`: Configuración de colores y temas
- `src/index.css`: Estilos globales y componentes personalizados

## Solución de Problemas

### Error: ENOENT: no such file or directory

Asegúrate de estar en el directorio correcto del proyecto al ejecutar los comandos.

### Error: Port 5173 is already in use

Otro proceso está usando el puerto 5173. Puedes:

1. Cerrar la aplicación que está usando ese puerto
2. Cambiar el puerto en el archivo `vite.config.js`:

```js
export default defineConfig({
  // ...
  server: {
    port: 3000 // Cambia a otro puerto
  }
})
```

### Problemas con las dependencias

Si encuentras problemas con las dependencias, intenta:

```
npm clean-install
```

## Contacto y Soporte

Para cualquier consulta o soporte técnico, contacta al equipo de desarrollo.