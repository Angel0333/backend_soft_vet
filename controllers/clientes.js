const { connection } = require('../config DB/dataBase');


const mostrarClientes = (req, res) => {
    connection.query('SELECT * FROM Clientes', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los clientes' });
        }
        res.json(results);
    });
};


const mostrarCliente = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Clientes WHERE id_cliente = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el cliente' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(results[0]);
    });
};


const crearCliente = (req, res) => {
    const { nombre_cliente, dni_cliente, direccion_cliente, telefono_cliente, mail_cliente } = req.body;
    if (!nombre_cliente || !dni_cliente || !direccion_cliente || !telefono_cliente || !mail_cliente) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    connection.query(
        'INSERT INTO Clientes (nombre_cliente, dni_cliente, direccion_cliente, telefono_cliente, mail_cliente) VALUES (?, ?, ?, ?, ?)',
        [nombre_cliente, dni_cliente, direccion_cliente, telefono_cliente, mail_cliente],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al crear el cliente', detalle: error.message });
            }
            res.json({ message: 'Cliente creado correctamente' });
        }
    );
};


const editarCliente = (req, res) => {
    const { id } = req.params;
    const { nombre_cliente, dni_cliente, direccion_cliente, telefono_cliente, mail_cliente } = req.body;
    connection.query(
        'UPDATE Clientes SET nombre_cliente = ?, dni_cliente = ?, direccion_cliente = ?, telefono_cliente = ?, mail_cliente = ? WHERE id_cliente = ?',
        [nombre_cliente, dni_cliente, direccion_cliente, telefono_cliente, mail_cliente, id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al editar el cliente' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.json({ id, nombre_cliente, dni_cliente, direccion_cliente, telefono_cliente, mail_cliente });
        }
    );
};


const eliminarCliente = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Clientes WHERE id_cliente = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el cliente' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarClientes,
    mostrarCliente,
    crearCliente,
    editarCliente,
    eliminarCliente
};