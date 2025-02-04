

# E-Commerce API

_Este proyecto es una API escalable y modular para un sistema de comercio electrónico, implementado con **Node.js, Express, Prisma y TypeScript**. Se diseñó siguiendo los principios de **arquitectura hexagonal**, asegurando flexibilidad, mantenibilidad y separación de responsabilidades._

---

## 🚀 **Tecnologías Utilizadas**
- **Node.js** (Back-end)
- **Express** (Framework)
- **TypeScript** (Tipado fuerte y mantenibilidad)
- **Prisma ORM** (Manejo eficiente de base de datos)
- **PostgreSQL** (Base de datos relacional)
---

## 📂 **Estructura del Proyecto**
La API está organizada en módulos para facilitar la escalabilidad y el mantenimiento:

```
💄 e-commerce-api
 └📂 src
   ├📂 auth
   │  ├📂 application (Casos de uso y validaciones)
   │  ├📂 domain (Interfaces y lógica de negocio)
   │  ├📂 infrastructure (Routers y controladores)
   ├📂 core
   │  ├📂 infrastructure
   │  │  ├📂 errors (Manejo de errores personalizados)
   │  │  ├📂 security (JWT y autenticación)
   │  │  ├📂 logger (Sistema de logs con Winston)
   |  ├📂 application 
   │   │ ├📂 services(Servicio de autenticacion de registro)
   │  │  ├📂 dto (data-transfer-object correspondiente a los datos a recibir en el login y registro )
   │  │  ├📂 logger (Sistema de logs con Winston)
   ├📂 orders (Gestión de pedidos)
   ├📂 products (Gestión de productos)
   ├📂 users (Gestión de usuarios)
   ├📂 database (Prisma ORM y migraciones)
   └📄 server.ts (Configuración del servidor)
 ├📂 deploy (variables de entorno) 
 ├📂 prisma (Esquema de base de datos y migraciones)
 ├📝 .eslintrc.json (Configuración de ESLint)
 ├📝 package.json
 ├📝 README.md
```

---

## 💡 **Arquitectura Hexagonal**
Este proyecto sigue los principios de **Arquitectura Hexagonal**, lo que permite la independencia de los frameworks y la reutilización de la lógica de negocio en diferentes interfaces.
Se utilizo el principio de Inversion de dependencias para garantizar la extensibilidad del codigo y servicios asociados.

| **Capa**              | **Responsabilidad** |
|----------------------|----------------------|
| **Infraestructura**   | Routers, controladores y conexión con Prisma |
| **Aplicación**       | Casos de uso y validaciones de negocio |
| **Dominio**         | Entidades, interfaces y lógica pura de negocio |

Cada módulo sigue esta estructura para garantizar escalabilidad y testeabilidad.

Adicionalmente se implemento un sistema de Logging con la libreria winston, la cual nos permite registrar todos los eventos del sistema para futuras revisiones.
Se implemento un manejo de errores abstracto y generico, para cada estilo de error en la aplicacion.


---

## 🛠️ **Instalación y Configuración**
Sigue estos pasos para configurar el proyecto en tu entorno:

### **1️⃣ Clona el repositorio**
```sh
git clone https://github.com/tu_usuario/e-commerce-api.git
cd e-commerce-api
```

### **2️⃣ Instala las dependencias**
```sh
npm install
```

### **3️⃣ Configura las variables de entorno**
Crea un archivo `.env.dev` en la raíz del proyecto con las descritas en el archiv:

```
PORT=3000
APP_NAME="Ecommerce-test"
ENVIRONMENT=development
DEBUG=true
SECRET_KEY=supersecretkey22234
ALLOWED_ORIGINS="*"
DATABASE_URL=postgresql://postgres:admin@localhost:5432/e-commerce-db
API_URL=http://localhost:8000
JWT_SECRET=superSecretKey
HOST=localhost
```

### **4️⃣ Generar base de datos**
```sh
npx prisma migrate dev --name init
```

### **5️⃣ Generar cliente Prisma**
```sh
npx prisma generate
```

### **6️⃣ Iniciar el servidor**
```sh
npm run dev
```
La API se ejecutará en:  
📌 `http://localhost:3000/`

---

De esta manera se podra acceder a la documentacion de la API y endpoints correspondientes 

## 💚 **Autenticación y Seguridad**
El sistema utiliza **JWT (JSON Web Token)** para la autenticación.  
Se implementó un **middleware de autorización** para proteger rutas sensibles.

---

## 🌐 **Documentación Swagger**
La API está documentada con **Swagger**. Puedes acceder a la documentación en:

📌 `http://localhost:3000/docs`

---

## 📝 **Licencia**
Este proyecto está bajo la **Licencia MIT**. Puedes modificarlo y distribuirlo libremente.

---

🚀 **Listo! Ahora tienes un README completo y bien documentado con toda la estructura, escalabilidad y arquitectura del proyecto.**

