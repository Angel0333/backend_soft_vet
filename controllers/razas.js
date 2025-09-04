const { connection } = require('../config DB/dataBase');

const mostrarRazas = (req, res) => {
    connection.query('SELECT * FROM Razas', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las razas' });
        }
        res.json(results);
    });
};

const mostrarRaza = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Razas WHERE id_raza = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la raza' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Raza no encontrada' });
        }
        res.json(results[0]);
    });
};

const crearRaza = (req, res) => {
    const { nombre_raza, id_especie } = req.body;

    if (!nombre_raza || !id_especie) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: nombre_raza y id_especie'
        });
    }

    connection.query(
        'INSERT INTO Razas (nombre_raza, id_especie) VALUES (?, ?)',
        [nombre_raza, id_especie],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    error: 'Error al crear la raza',
                    detalle: error.message
                });
            }
            res.json({
                message: "Raza creada correctamente",
            });
        }
    );
};

const editarRaza = (req, res) => {
    const { id } = req.params;
    const { nombre_raza, id_especie } = req.body;

    connection.query(
        'UPDATE Razas SET nombre_raza = ?, id_especie = ? WHERE id_raza = ?',
        [nombre_raza, id_especie, id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al editar la raza' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Raza no encontrada' });
            }
            res.json({ id_raza: id, nombre_raza, id_especie });
        }
    );
};

const eliminarRaza = (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM Razas WHERE id_raza = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la raza' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Raza no encontrada' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarRazas,
    mostrarRaza,
    crearRaza,
    editarRaza,
    eliminarRaza
};