const taskModele = require("../models/taskModele")
const {validationResult} = require("express-validator")

// OBTENER TODAS LAS TAREAS
const getTasks = async (req, res, next) => {
    try {
        const tasks = await  taskModele.getTasks()
        res.json(tasks)
    }catch(error){
        next(error)
    }
};

// OBTENER LAS TAREAS POR ID
const getTasksById = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    try {
        const task = await taskModele.getTasksById(req.params.id)
        if(!task){
            return res.status(404).json({ error: "TAREA NO ENCONTRADA R"})
        }
        res.json(task)
    }catch(error){
        next(error)
    }
}

// CREAR UNA TAREA
const createTask = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const task = await taskModele.createTask(req.body)
        if(!task){
            return res.status(404).json({ error: "TAREA NO ENCONTRADA C"})
        }
        res.status(201).json(task)
    }catch(error){
        next(error)
    }
}

// ACTUALIZAR UNA TAREA
const updateTask = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
   

    try {
        const task = await taskModele.updateTask( req.params.id, req.body)
        if(!task){
            return res.status(404).json({ error: "TAREA NO ENCONTRADA U"})
        }
        res.status(201).json({message : "TAREA ACTUALIZADA", tareaAtualizada: task})
    }catch(error){
        next(error)
    }
}


// ELMINAR TAREA
const deleteTask = async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try{
        const task = await taskModele.deleteTask( req.params.id)
        if(!task){
            return res.status(404).json({ error: "TAREA NO ENCONTRADA D"})
        }
        res.status(200).json({message: "TAREA ELIMINIDA",tareaEliminada:task})
    }catch(error){
        next(error)
    }
}

module.exports = {
    getTasks,
    getTasksById,
    createTask,
    updateTask,
    deleteTask
}

