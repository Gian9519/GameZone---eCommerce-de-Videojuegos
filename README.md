# GameZone - eCommerce de Videojuegos

GameZone es una tienda online de videojuegos desarrollada con React, Bootstrap y Styled-Components. Ofrece una experiencia de compra completa con autenticación de usuarios, gestión de carrito de compras y panel de administración.

## Características Principales

- 🎮 Catálogo de videojuegos con búsqueda y paginación
- 👤 Sistema de autenticación (login, registro, perfiles)
- 🛒 Carrito de compras funcional con persistencia
- 🔍 Búsqueda de productos por nombre, categoría o plataforma
- 📱 Diseño totalmente responsivo
- 🎨 Interfaz moderna con React Icons y Toastify
- 🔐 Rutas protegidas para usuarios autenticados
- ⚙️ Panel de administración para gestión de productos
- 📝 Formularios con validaciones
- 📊 Paginación infinita y tradicional

## Tecnologías Utilizadas

- React 18
- React Router DOM
- React Bootstrap
- Styled-Components
- React Icons
- React Toastify
- React Helmet
- Context API
- RAWG API (para datos de videojuegos)

## Instalación

1. Clona el repositorio:
   ```
   git clone [URL_DEL_REPOSITORIO]
   cd final-proyecto
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Inicia la aplicación:
   ```
   npm start
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

### Como Visitante

- Navega por el catálogo de videojuegos
- Busca juegos por nombre, categoría o plataforma
- Filtra y pagina los resultados
- Regístrate una cuenta para poder comprar

### Como Usuario Registrado

- Inicia sesión con tu cuenta
- Agrega productos al carrito
- Gestiona tu carrito de compras
- Realiza el proceso de checkout
- Accede a tu perfil de usuario

### Como Administrador

- Inicia sesión con credenciales de administrador
   - Email: admin@example.com
   - Contraseña: password
- Accede al panel de administración
- Agrega, edita o elimina productos
- Gestiona el catálogo completo

## Estructura del Proyecto

```
src/
├── App.jsx
├── components
│   ├── auth
│   │   └── ProtectedRoute.jsx
│   ├── cart
│   │   ├── Cart.jsx
│   │   └── CartSidebar.jsx
│   ├── common
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   └── SearchBar.jsx
│   ├── contact
│   │   └── ContactForm.jsx
│   ├── products
│   │   ├── ProductCard.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProductItem.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductModal.jsx
│   │   └── SearchBar.jsx
│   └── ui
│       ├── ErrorStates.jsx
│       ├── Loading.jsx
│       ├── LoadingStates.jsx
│       ├── Pagination.jsx
│       └── ToastNotifications.jsx
├── context
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── ProductContext.jsx
├── hooks
├── index.css
├── index.js
├── pages
│   ├── Admin.jsx
│   ├── Checkout.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── ProductDetail.jsx
│   ├── Products.jsx
│   ├── Profile.jsx
│   └── Register.jsx
├── services
│   ├── gamesAPI.js
│   └── products.js
├── styles
│   ├── global.js
│   ├── skeleton.css
│   └── variables.js
└── utils
    ├── notifications.js
    └── validations.js
```

## Variables de Entorno

El proyecto utiliza la API de RAWG para obtener datos de videojuegos. La clave de API está configurada en el archivo `services/gamesAPI.js`.

## Construcción para Producción

Para crear una versión optimizada para producción:

```
npm run build
```

Esto creará una carpeta `build` con los archivos optimizados para despliegue.

## Licencia

Este proyecto fue desarrollado como parte del curso de Talento Lab.

## Créditos

- Datos de videojuegos proporcionados por [RAWG](https://rawg.io/)
- Iconos de [React Icons](https://react-icons.github.io/react-icons/)
