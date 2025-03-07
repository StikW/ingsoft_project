# Sistema de Arrendamiento Residencial

Aplicación web para la publicación y búsqueda de avisos de arrendamiento en unidades residenciales.

## Características Principales

- Registro y autenticación de usuarios (propietarios e interesados)
- Panel de propietarios para publicar y gestionar avisos
- Panel de interesados para buscar y contactar propietarios
- Sistema de calificación y comentarios
- Interfaz responsiva

## Tecnologías Utilizadas

- React con TypeScript
- Material UI
- Zustand para gestión de estado
- React Router para navegación
- Datos mock para simulación de backend

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas principales
├── hooks/         # Hooks personalizados
├── store/         # Estado global con Zustand
├── services/      # Servicios y APIs
├── types/         # Tipos TypeScript
└── data/          # Datos mock
```

## Estado del Proyecto

### ✅ Completado
- Configuración inicial del proyecto
- Sistema de autenticación y registro
- Navegación protegida por roles
- Gestión de estado con Zustand
- Interfaz de usuario con Material UI
- Datos mock para simulación

### 🚧 En Desarrollo
- Panel de propietarios
  - Formulario para publicar propiedades
  - Lista de propiedades del propietario
  - Gestión de mensajes
- Panel de búsqueda
  - Filtros de búsqueda
  - Listado de propiedades
  - Sistema de mensajería

### 📝 Pendiente
- Implementación de calificaciones y comentarios
- Mejoras en la interfaz de usuario
- Optimización de rendimiento
- Pruebas unitarias y de integración

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la build de producción

## Datos de Prueba

La aplicación utiliza datos mock para simular el backend. Los usuarios de prueba son:

### Propietario
- Email: propietario@ejemplo.com
- Contraseña: cualquier valor

### Interesado
- Email: interesado@ejemplo.com
- Contraseña: cualquier valor

## Contribución

1. Crear una rama para la nueva característica
2. Realizar los cambios
3. Enviar un pull request

## Licencia

MIT
