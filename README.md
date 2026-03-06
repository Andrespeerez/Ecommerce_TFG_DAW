<a id="readme-top"></a>

# E-Commerce Carpintería

## DEMO ONLINE:
[https://ecommercetfgdaw-production.up.railway.app/](https://ecommercetfgdaw-production.up.railway.app/)

## DESCRIPCIÓN DEL PROYECTO

Plataforma de comercio electrónico de venta de productos de carpintería usando Laravel + Inertia + React + MySQL + TailWindCSS.

Desarrollada para el Proyecto Proyecto Intermodular de 2º DAW.

<a href="https://laravel.com/docs/12.x" target="_blank">![laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat&logo=laravel)</a>
<a href="https://es.react.dev/" target="_blank">![react](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)</a>
<a href="https://inertiajs.com/" target="_blank">![inertia](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=flat)</a>
<a href="https://www.mysql.com/" target="_blank">![mysql](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)</a>
<a href="https://tailwindcss.com/" target="_blank">![tailwindcss](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)</a>

<p align="right">(<a href="#readme-top">Arriba</a>)</p>

## TABLA DE CONTENIDOS

- <a href="#funcionalidades">Funcionalidades</a>
- <a href="#tecnologias">Tecnologías</a>
- <a href="#requisitos-previos">Requisitos Previos</a>
- <a href="#instalacion">Instalación</a>
- <a href="#estructura">Estructura del Proyecto</a>
- <a href="#contribucion">Contribución</a>
- <a href="#autoria">Autoría</a>

<p align="right">(<a href="#readme-top">Arriba</a>)</p>

## FUNCIONALIDADES <a id="funcionalidades"></a>

- [x] Registro de usuarios con autenticación y roles
- [ ] Catálogo de productos con filtros avanzados:
  - [x] Busqueda de texto
  - [x] Por material
  - [x] Por categoría
  - [x] Por acabado
  - [x] Por rango de precio
  - [ ] Búsqueda avanzada que combine Título y Descripción de producto
- [x] Carrito de compras controlado desde servidor con notificaciones de stock / disponibilidad
  - [x] Carrito implementado en variable de session en Servidor (puedes añadir productos sin estar loggeado)
  - [x] Sistema contra anti-persona (límite de productos que se pueden comprar de una tacada) 
- [x] Histórico de pedidos con estados
- [x] Diseño responsive
- [x] UI/UX:
  - [x] Validación de formularios en Cliente
  - [x] Barra de carga cuando está esperando respuesta del servidor
  - [x] Notificaciones cuando el servidor responde con un error o success
  - [x] Interfaz clara y coherente
  - [x] Skeletons para elementos de interfaz
  - [x] Navegación de login y cambio de datos de profile confusa para personas mayores
  - [x] Animación del carrito para guiar la vista en la navegación
- [ ] Seguridad:
  - [x] Throttling para peticiones pesadas (login, registro, cambios de datos en perfil de usuario, checkout)
  - [x] Token CSRF
  - [x] Prepared Statements de Eloquent para prevenir SQL Injection
  - [x] Salidas saneadas para prevenir XSS
  - [x] Cabeceras para evitar renderizar la web en Iframes (clickjacking)
  - [x] Validaciones siempre en servidor
  - [x] Middleware de auth y admin para rutas protegidas por roles
  - [ ] Comprobación de que recurso pertenece al usuario que solicita (IDORs). Actualmente no está habilitado el endpoint para ver "/pedidos/{id}".
- [x] Performance:
  - [x] Guardar imágenes en distintas resoluciones (normal, small, preview) para evitar reducir la descarga de imágenes grandes para ser usadas en Cards pequeños
  - [x] Cache para consultas repetitivas en servidor (menor uso de base de datos para buscar items del carrito, categorías, productos más vendidos)
  - [x] Descarga de fuentes en /public/fonts
  - [x] Imágenes con loading="lazy" que no son importantes
  - [x] Imágenes importantes (como el hero) carga con fetchpriority="high" y preload en el head (solo en la vista Home)

<p align="right">(<a href="#readme-top">Arriba</a>)</p>


## TECNOLOGÍAS <a id="tecnologias"></a>

### Backend:

- PHP 8.2
- Laravel 12
- MySQL 8.0
- Breeze -> Para autenticación

### Frontend:

- React 18
- Inertia.js
- Tailwindcss 3.4

<p align="right">(<a href="#readme-top">Arriba</a>)</p>

## REQUISITOS PREVIOS <a id="requisitos-previos"></a>

- Git
- Composer
- Node.js
- MySQL

<p align="right">(<a href="#readme-top">Arriba</a>)</p>

## INSTALACIÓN <a id="instalacion"></a>

Para instalar el proyecto:

1. **Clona el repositorio**
```bash
git clone git@github.com:Andrespeerez/Ecommerce_TFG_DAW.git
cd Ecommerce_TFG_DAW
```

2. **Crea el archivo de configuración**

El archivo `.env.example` con el que viene el proyecto incluye la configuración del proyecto, aunque deberemos de renombrarlo y hacer algunos ajustes:
```bash
cp .env.example .env
```

Y editamos el contenido:
```.env
APP_NAME="Carpintería ..."
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8080

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=ecommerce
DB_USERNAME=...
DB_PASSWORD=...
```

3. **Generar la clave**
```bash
php artisan key:generate
```

4. **Crear la base de datos**
```bash
CREATE DATABASE ecommerce;
```

5. **Ejecutar migraciones**
```bash
php artisan migrate --seed
php artisan storage:link
```

6. **Instalar dependecias**
```bash
composer install
npm install
```

7. **Inicia VITE**
```bash
npm run dev
```

8. **Inicia servidor**
```bash
php artisan serve
```

> Todo esto es para local. Para desplegarlo en producción deberíamos de desplegarlo en un servidor, por ejemplo, nginx, compilar los assets, ...

<p align="right">(<a href="#readme-top">Arriba</a>)</p>

## ESTRUCTURA DEL PROYECTO <a id="estructura"></a>
```
ecommerce-carpinteria/
|-- app/
|   |-- Http/
|   |   |--- Controllers/
|   |   |    |--- Admin/                     # Controladores admin
|   |   |    |--- Public/                    # Controladores públicos
|   |   |    |--- ProfileController.php      # Controlador de Area de Usuario
|   |   |   
|   │   |--- Middleware/                     # Middleware --> isAdmin y Cabeceras de Seguridad
|   |
|   |--- Models/                             # Modelos Eloquent
|   |--- Services/                           # Lógica de negocio
|        |--- CartService.php
|        |--- OrderService.php
|        |--- OrderLineService.php
|        |--- ImageService.php                    # Se encarga de guardar imágenes en distintas resoluciones
|        |--- ProductService.php
|       
|--- database/
|    |--- migrations/                         # Migraciones SQL
|    |--- seeders/                            # Datos de prueba
|
|--- resources/
|   |--- css/                                 # css con clases personalizadas (tamaños de letras y estilos para ProductDetails#product_description)
|   |--- js/
|   |    |--- Components/                     # Componentes React
|   |    |--- Layouts/                        # Layouts Inertia
|   |    |--- Pages/                          # Páginas React 
|   |
|   |--- views/
|        |--- app.blade.php                   # Template base
|     
|--- routes/
|    |--- web.php                             # Rutas
|  
|--- README.md
|--- composer.json
|--- package.json
|--- vite.config.js
|--- tailwind.config.js                       # Theme de la web

```

<p align="right">(<a href="#readme-top">Arriba</a>)</p>

## CONTRIBUCIÓN <a id="contribucion"></a>

Este es un proyecto académico.

<p align="right">(<a href="#readme-top">Arriba</a>)</p>

## AUTORÍA <a id="autoria"></a>

Andrés Pérez Guardiola

- Alumno de 2º DAW - IGFormación (Alicante)

<p align="right">(<a href="#readme-top">Arriba</a>)</p>

