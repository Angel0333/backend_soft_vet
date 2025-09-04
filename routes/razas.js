const express = require('express');
const router = express.Router();

const {
    mostrarRazas,
    mostrarRaza,
    crearRaza,
    editarRaza,
    eliminarRaza
} = require('../controllers/razas');

router.get("/razas", mostrarRazas);
router.get("/raza/:id", mostrarRaza);
router.post("/raza", crearRaza);
router.put("/raza/:id", editarRaza);
router.delete("/raza/:id", eliminarRaza);

module.exports = router;