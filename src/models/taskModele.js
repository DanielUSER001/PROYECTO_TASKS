const pg  = require("../config/config")

// TRAER TODAS LAS TAREAS (GET)

const getTasks = async () => {
    try{
        const res = await pg.query("SELECT * FROM tasks")
        return res.rows

    }catch(error){
        throw error
    }
}

// TRAER  LA TAREA POR EL ID (GET)
const getTasksById = async (id) => {

    try{
        const res = await pg.query("SELECT * FROM tasks WHERE id = $1" , [id])
        return res.rows[0]

    }catch(error){
        throw error
    }
}

// CREAR NUEVA TAREA 
const createTask = async (task) => {
    const {title, descripcion} = task
    try{
        const res = await pg.query("INSERT INTO  tasks (title, descripcion) VALUES($1,  $2) RETURNING *",[title, descripcion])
        return res.rows[0]

    }catch(error){
        throw error
    }
}

// ACTUALIZAR LA TAREA
const updateTask = async (id, task) => {
    const {title, descripcion} = task
    try{
        const res = await pg.query("UPDATE tasks SET title = $1 , descripcion = $2 WHERE id = $3 RETURNING *", [title, descripcion, id])
        return res.rows[0]

    }catch(error){
        throw error
    }
}

// ELIMINAR LA TAREA
const deleteTask = async (id) => {
    try{
        const res = await pg.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id])
        return res.rows[0]

    }catch(error){
        throw error
    }
}

module.exports = {
    getTasks,
    getTasksById,
    createTask,
    updateTask,
    deleteTask
}