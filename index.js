const express = require ("express")
const mysql = require ("mysql2")
const cors = require ("cors")
const usuarios = require ("./routes/usuarios")
const clientes = require ("./routes/clientes")

const app = express()

app.use(express.json())
app.use(cors())
app.use("/",usuarios)
app.use("/",clientes)

app.get("/", (req, res) => {
    res.send("API de usuarios")
})

app.listen(8000, () => {
    console.log("Servidor corriendo en el puerto 8000")
})