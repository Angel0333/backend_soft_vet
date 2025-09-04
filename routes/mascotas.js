const express = require('express');
const router = express.Router();

const {
    mostrarMascotas,
    mostrarMascota,
    crearMascota,
    editarMascota,
    eliminarMascota
} = require('../controllers/mascotas');

router.get("/mascotas", mostrarMascotas);
router.get("/mascota/:id", mostrarMascota);
router.post("/mascota", crearMascota);
router.put("/mascota/:id", editarMascota);
router.delete("/mascota/:id", eliminarMascota);

module.exports = router;