const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");
const setupSwaggerDocs = require("./docs/swagger")
const {default: helmet} = require("helmet")
const app = express();
const dotenv = require("dotenv");

// 🔐 SEGURIDAD: Configuración de variables de entorno
dotenv.config()

// 🛡️ SEGURIDAD BÁSICA
app.use(helmet())  // Protege headers HTTP

// 💭 SEGURIDAD ADICIONAL RECOMENDADA:
// 1. CORS - Protección contra peticiones de otros dominios
// const cors = require('cors')
// app.use(cors({
//     origin: 'tu-dominio.com',
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }))

// 2. RATE LIMITING - Protección contra ataques DDoS
// const rateLimit = require('express-rate-limit')
// app.use(rateLimit({
//     windowMs: 15 * 60 * 1000,  // 15 minutos
//     max: 100  // máximo 100 peticiones por IP
// }))

// 3. AUTENTICACIÓN - Proteger rutas
// const jwt = require('jsonwebtoken')
// app.use('/tasks', authenticateToken)  // Middleware de autenticación

// 4. SANITIZACIÓN - Limpieza adicional de datos
// const sanitize = require('express-mongo-sanitize')
// app.use(sanitize())  // Previene inyección de NoSQL

// 5. HTTPS - Forzar conexión segura
// app.use((req, res, next) => {
//     if (!req.secure) {
//         return res.redirect('https://' + req.headers.host + req.url)
//     }
//     next()
// })

// 6. LOGGING - Registro de seguridad
// const morgan = require('morgan')
// app.use(morgan('combined'))  // Log de todas las peticiones

// 📦 MIDDLEWARES BÁSICOS
app.use(bodyParser.json());
app.use("/tasks", taskRoutes);// ASIGNACIÓN DE RUTAS
setupSwaggerDocs(app) // CONFIGURAR SWAGGER
app.use(errorHandler) // CONTROLADOR DE ERRORES


const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`EL SERVIDOR ESTA CORRIENDO EN EL PUERTO ${port} TODO BIEN`)
}) 