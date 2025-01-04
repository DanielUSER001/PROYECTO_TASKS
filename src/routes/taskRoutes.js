const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");

const {body, param, validationResult} = require("express-validator")

// GUÍA COMPLETA DE VALIDACIONES EXPRESS-VALIDATOR

/* body('campo')
    // 1. STRINGS
    .isString()          // Verifica que sea texto
    .isAlpha()           // Solo letras (no números ni símbolos)
    .isAlphanumeric()    // Solo letras y números
    .isLowercase()       // Solo minúsculas
    .isUppercase()       // Solo mayúsculas
    .contains('texto')   // Debe contener la palabra 'texto'
    .equals('valor')     // Debe ser exactamente 'valor'
    .matches(/regex/)    // Debe coincidir con el patrón regex

    // 2. LONGITUD
    .isLength({min: 3})  // Mínimo 3 caracteres
    .isLength({max: 10}) // Máximo 10 caracteres
    .isEmpty()           // Debe estar vacío
    .notEmpty()          // No debe estar vacío

    // 3. NÚMEROS
    .isNumeric()         // Debe ser número
    .isInt()             // Debe ser entero
    .isFloat()           // Debe ser decimal
    .isPositive()        // Debe ser positivo
    .isNegative()        // Debe ser negativo
    .min(5)              // Mínimo valor 5
    .max(10)             // Máximo valor 10

    // 4. EMAIL
    .isEmail()           // Debe ser email válido
    .normalizeEmail()    // Normaliza formato de email
    .contains('@')       // Debe contener @

    // 5. FECHAS
    .isDate()            // Debe ser fecha válida
    .isBefore('2024-12-31') // Debe ser antes de esta fecha
    .isAfter('2024-01-01')  // Debe ser después de esta fecha

    // 6. URLs E IPs
    .isURL()             // Debe ser URL válida
    .isIP()              // Debe ser IP válida
    .isFQDN()            // Debe ser dominio válido

    // 7. BOOLEANOS
    .isBoolean()         // Debe ser true/false
    .toBoolean()         // Convierte a booleano

    // 8. SANITIZACIÓN (LIMPIEZA)
    .trim()              // Quita espacios inicio/fin
    .escape()            // Escapa HTML para prevenir XSS
    .blacklist('/<>')    // Elimina estos caracteres
    .whitelist('abc123') // Solo permite estos caracteres
    .stripLow()          // Elimina caracteres de control

    // 9. CONTROL
    .optional()          // Campo no obligatorio
    .exists()            // Campo debe existir
    .notEmpty()          // No debe estar vacío
    .custom((value) => {
        // Validación personalizada
        if(tu condición ) {
            throw new Error('Error personalizado')
        }
        return true
    })

    // 10. ARRAYS
    .isArray()           // Debe ser un array
    .isIn(['a', 'b'])    // Valor debe estar en la lista
 */



// MIDDLEWARE PARA VALIDAR EL CUERPO DE LA TAREA
const validateBodyTask = [
    body("title")
    .isLength({min: 3}).withMessage("El titulo es obligatorio")
    .isString().withMessage("title es un  string")
    .trim().escape(),
    body("description")
    .optional()
    .isString().withMessage("description es un string")
    .trim()
    .escape()

]

// MIDDLEWARE PARA VALIDAR EL ID DE LA TAREA
const validateIdTask = [ 
    param("id")
    .isInt({gt: 0}).withMessage("id del Tarea debe ser un numero diferente de cero y entero positivo")
    .toInt()
]

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     responses:
 *       200:
 *         description: Lista de todas las tarea existentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tasks'
 * 
 * 
 * 
 * 
 * 
 */


/** Get all tasks */
router.get("/", taskController.getTasks);


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene la tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tasks'
 *       404:
 *         description: Tarea no encontrada
 * 
 */


/** Get task by ID */
router.get("/:id",validateIdTask, taskController.getTasksById);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear Tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tasks2'
 * 
 *     responses:
 *       200:
 *         description: Creación de la tarea exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tasks'
 *       400:
 *         description: Formato invalido
 * 
 * 
 * 
 * 
 * 
 */

/** Create new task */
router.post("/", validateBodyTask, taskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tasks2'
 * 
 *     responses:
 *       200:
 *         description: Se actualizo la tarea
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tasks'
  *       404:
 *         description: Tarea no encontrada
 *       400:
 *         description: Formato invalido
 * 
 * 
 * 
 * 
 * 
 */



/** Update task by ID */
router.put("/:id", validateIdTask, validateBodyTask, taskController.updateTask);


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar la tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Eliminación de la tarea
 *        
 *       404:
 *         description: Tarea no encontrada
 * 
 */



/** Delete task by ID */
router.delete("/:id", validateIdTask, taskController.deleteTask);

module.exports = router;