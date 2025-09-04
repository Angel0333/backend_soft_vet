const { connection } = require('../config DB/dataBase');

const mostrarMascotas = (req, res) => {
    connection.query('SELECT * FROM Mascotas', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las mascotas' });
        }
        res.json(results);
    });
};

const mostrarMascota = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Mascotas WHERE id_mascota = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la mascota' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        res.json(results[0]);
    });
};

const crearMascota = (req, res) => {
    const { nombre_mascota, edad_mascota, sexo_mascota, historia_clinica, observaciones_mascota, id_raza, id_cliente } = req.body;

    if (!nombre_mascota || !edad_mascota || !sexo_mascota || !id_raza || !id_cliente) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: nombre, edad, sexo, raza y cliente'
        });
    }

    connection.query(
        'INSERT INTO Mascotas (nombre_mascota, edad_mascota, sexo_mascota, historia_clinica, observaciones_mascota, id_raza, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nombre_mascota, edad_mascota, sexo_mascota, historia_clinica, observaciones_mascota, id_raza, id_cliente],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    error: 'Error al crear la mascota',
                    detalle: error.message
                });
            }
            res.json({
                message: "Mascota creada correctamente",
            });
        }
    );
};

const editarMascota = (req, res) => {
    const { id } = req.params;
    const { nombre_mascota, edad_mascota, sexo_mascota, historia_clinica, observaciones_mascota, id_raza, id_cliente } = req.body;

    connection.query(
        'UPDATE Mascotas SET nombre_mascota = ?, edad_mascota = ?, sexo_mascota = ?, historia_clinica = ?, observaciones_mascota = ?, id_raza = ?, id_cliente = ? WHERE id_mascota = ?',
        [nombre_mascota, edad_mascota, sexo_mascota, historia_clinica, observaciones_mascota, id_raza, id_cliente, id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al editar la mascota' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Mascota no encontrada' });
            }
            res.json({ id_mascota: id, nombre_mascota, edad_mascota, sexo_mascota, historia_clinica, observaciones_mascota, id_raza, id_cliente });
        }
    );
};

const eliminarMascota = (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM Mascotas WHERE id_mascota = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la mascota' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarMascotas,
    mostrarMascota,
    crearMascota,
    editarMascota,
    eliminarMascota
};