const {Pool} = require("pg")
const dotenv = require("dotenv")
const fs = require("fs")
dotenv.config()
//  CONFIGURACION DE LA CONEXION A LA BASE DE DATOS
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("src/cert/ca.crt").toString()
    }
})

// CONEXION A LA BASE DE DATOS
pool.connect(( err, client, release )=> {
    if(err){
        console.log("error en la conexion a la base de datos", err.stack)
    }else {
        console.log("conexion *exitosa* a la base de datos de TEMBO.IO")
        release()
    }
})


module.exports = pool