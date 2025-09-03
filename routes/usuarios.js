const express = require('express');
const router = express.Router();

const { mostrarUsuarios,
    mostrarUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
} = require('../controllers/usuarios');



    router.get("/usuarios", mostrarUsuarios);
    router.get("/usuario/:id", mostrarUsuario);
    router.post("/usuario", crearUsuario)
    router.put("/usuario/:id", editarUsuario)
    router.delete("/usuario/:id", eliminarUsuario)
    module.exports = router;