const express = require('express');
const router = express.Router();

const {
    mostrarClientes,
    mostrarCliente,
    crearCliente,
    editarCliente,
    eliminarCliente
} = require('../controllers/clientes');

router.get("/clientes", mostrarClientes);
router.get("/cliente/:id", mostrarCliente);
router.post("/cliente", crearCliente);
router.put("/cliente/:id", editarCliente);
router.delete("/cliente/:id", eliminarCliente);

module.exports = router;