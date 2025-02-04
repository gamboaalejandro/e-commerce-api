xzr# Install dependencies

npm install

# Migrate .eslintrc to eslint.config

npx @eslint/migrate-config .eslintrc.json

# Generate Prisma migrations

npx prisma migrate dev --name init

# Generate Prisma database without migrations

npx prisma db push

# generate client for prisma

npx prisma generate



# E-Commerce API

_Este proyecto es una API escalable y modular para un sistema de comercio electrónico, implementado con **Node.js, Express, Prisma y TypeScript**. Se diseñó siguiendo los principios de **arquitectura hexagonal**, asegurando flexibilidad, mantenibilidad y separación de responsabilidades._

---

## 🚀 **Tecnologías Utilizadas**
- **Node.js** (Back-end)
- **Express** (Framework)
- **TypeScript** (Tipado fuerte y mantenibilidad)
- **Prisma ORM** (Manejo eficiente de base de datos)
- **PostgreSQL** (Base de datos relacional)
- **JWT** (Autenticación segura)
- **Express Validator** (Validación de datos)
- **Swagger** (Documentación de API)
- **Winston Logger** (Registro estructurado de logs)
- **Arquitectura Hexagonal** (Separación clara entre capas)

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
   ├📂 orders (Gestión de pedidos)
   ├📂 products (Gestión de productos)
   ├📂 users (Gestión de usuarios)
   ├📂 database (Prisma ORM y migraciones)
   └📄 server.ts (Configuración del servidor)
 ├📝 prisma (Esquema de base de datos y migraciones)
 ├📝 .eslintrc.json (Configuración de ESLint)
 ├📝 package.json
 ├📝 README.md
```

---

## 💡 **Arquitectura Hexagonal**
Este proyecto sigue los principios de **Arquitectura Hexagonal**, lo que permite la independencia de los frameworks y la reutilización de la lógica de negocio en diferentes interfaces.

| **Capa**              | **Responsabilidad** |
|----------------------|----------------------|
| **Infraestructura**   | Routers, controladores y conexión con Prisma |
| **Aplicación**       | Casos de uso y validaciones de negocio |
| **Dominio**         | Entidades, interfaces y lógica pura de negocio |

Cada módulo sigue esta estructura para garantizar escalabilidad y testabilidad.

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
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
DATABASE_URL=postgresql://usuario:password@localhost:5432/e-commerce-db?schema=public
JWT_SECRET=tu_secreto_super_seguro
PORT=3000
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

## 💚 **Autenticación y Seguridad**
El sistema utiliza **JWT (JSON Web Token)** para la autenticación.  
Se implementó un **middleware de autorización** para proteger rutas sensibles.

Ejemplo de middleware de autenticación:
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
}
```

---

## 🌐 **Documentación Swagger**
La API está documentada con **Swagger**. Puedes acceder a la documentación en:

📌 `http://localhost:3000/docs`

---

## 🔍 **Ejemplo de Uso**
### **Registro de Usuario**
```sh
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "email": "test@example.com",
  "password": "123456"
}'
```

### **Obtener una Orden**
```sh
curl -X GET http://localhost:3000/api/order/123e4567-e89b-12d3-a456-426614174000 \
-H "Authorization: Bearer <your_token>"
```

---

## 📝 **Licencia**
Este proyecto está bajo la **Licencia MIT**. Puedes modificarlo y distribuirlo libremente.

---

🚀 **Listo! Ahora tienes un README completo y bien documentado con toda la estructura, escalabilidad y arquitectura del proyecto.**

