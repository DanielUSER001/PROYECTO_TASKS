const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API DE GESTIÓN DE TAREAS",
            version: "1.0.0",
            description: "API PARA GESTIONAR CON UN CRUD (C-CREAR, R-LEER, U-ACTUALIZAR, D-ELIMINAR) DE TAREAS CON NODE.JS (EXPRESS) Y POSTGRES"
        },
        servers: [
            {
                url: "https://node-files-o3i9.onrender.com/"
            }
        ],
        components: {
            schemas: {
                Tasks: {
                    type: "object",
                    required: ["title"], // Corrección aquí
                    properties: {
                        id: {
                            type: "integer",
                            example: 10
                        },
                        title: {
                            type: "string",
                            example: "TAREA 4"
                        },
                        description: {
                            type: "string",
                            example: "TAREA 4 RECOGER LA BASURA PRIORIDAD 4"
                        }
                    }
                },
                Tasks2: {
                    type: "object",
                    required: ["title"], // Corrección aquí
                    properties: {
                        title: {
                            type: "string",
                            example: "TAREA 4"
                        },
                        description: {
                            type: "string",
                            example: "TAREA 4 RECOGER LA BASURA PRIORIDAD 4"
                        }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
};


const swaggerSpec = swaggerJSDoc(options);
const setupSwaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    console.log("Swagger docs disponible en la ruta https://node-files-o3i9.onrender.com/api-docs")
}

module.exports = setupSwaggerDocs;