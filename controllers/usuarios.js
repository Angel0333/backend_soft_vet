const {connection} = require('../config DB/dataBase')

const mostrarUsuarios = (req, res) => {
    connection.query('SELECT * FROM Usuarios', (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los usuarios'});
        }
        res.json(result);
    })
}


const mostrarUsuario = (req, res) => {
    const { id } = req.params;

//se puede utilizar  const query = 'SELECT * FROM Usuarios WHERE id = ${id}'  y ya no sera necesario utilizar el [id] abajo. pero queda vulnerable a las inyecciones sql    

    connection.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id], (error, result) => {
        if (error) {
            return res.status(500).json ({ error: 'Error al obtener el usuario'});
        }
        if (results.length === 0) {
            return res.status(404).json ({ error: 'Usuario no encontrado'});

        }
        res.json(results[0]);
    });    
}


const crearUsuario = (req, res) => {
    const {nombre_usuario, contrasena_usuario} = req.body;

    if (!nombre || !contraseña) {
        return res.status (400).json ({
            error: 'Faltan datos requeridos: nombre y contraseña'
        });
    }

    connection.query(
        'INSERT INTO Usuarios (nombre_usuario, contrasena_usuario) VALUES (?,?)',
        [nombre_usuario, contrasena_usuario],
        (error, results) => {
            if (error) {
                return res.status (500).json ({
                    error: 'Error al crear el usuario',
                    detalle: error.message // muestra el error real
                });
            }
            res.json ({
                message: "Usuario creado correctamente",
            });
        }
    );
}


const editarUsuario = (req,res) => {
    const { id } = req.params;
    const {nombre_usuario, contrasena_usuario} = req.body;

    connection.query('UPDATE Usuarios SET nombre_usuario = ?, contrasena_usuario = ? WHERE id_usuario = ?', [nombre_usuario, contrasena_usuario, id_usuario], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json ({ error: 'Usuario no encontrado' });
        }
        res.json ({ id_usuario, nombre_usuario, contrasena_usuario});
    });
}


const eliminarUsuario = (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json ({error: 'Error al eliminar al usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json ({error: 'Usuario no encontrado'});
        }
        res.status(204).send();
    });
}

module.exports = {
    mostrarUsuarios,
    mostrarUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
};