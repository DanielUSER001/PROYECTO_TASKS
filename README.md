# 🚀 API de Tareas (Task API)

API RESTful para gestión de tareas construida con Node.js, Express y PostgreSQL.

## 📋 Características

- CRUD completo de tareas
- Validación de datos
- Manejo de errores centralizado
- Seguridad con Helmet
- Conexión a PostgreSQL

## 🛠️ Tecnologías

- Node.js
- Express
- PostgreSQL
- express-validator
- Helmet

## 🚀 Instalación

1. Clonar el repositorio
```bash
git clone git@github.com:DanielUSER001/NODE_FILES.git
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
# Crear archivo .env con:
DB_HOST=tu_host
DB_USER=tu_usuario
DB_PASS=tu_password
DB_NAME=tu_database
PORT=3000
```

4. Iniciar servidor
```bash
npm run dev
```

## 🔗 Endpoints

- GET /tasks - Obtener todas las tareas
- GET /tasks/:id - Obtener tarea por ID
- POST /tasks - Crear nueva tarea
- PUT /tasks/:id - Actualizar tarea
- DELETE /tasks/:id - Eliminar tarea

## 📝 Estructura del Proyecto

```plaintext
src/
├── routes/          # Rutas de la API
├── controllers/     # Controladores
├── models/          # Modelos de datos
├── config/         # Configuraciones
└── app.js          # Punto de entrada
```

## 👨‍💻 Autor

Daniel - [GitHub](https://github.com/DanielUSER001) 