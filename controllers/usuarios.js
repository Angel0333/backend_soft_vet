const {connection}=require('../config/dataBase');

// traer todos los Usuarios
const mostrarUsuarios =(req,res) => {
    connection.query('SELECT * FROM Usuarios', (error,results)=> {
        if(error){
            return res.status(500).json({error: 'error al obtener los Usuarios'});
        }
        res.json(results);
    });
}

// traer un Usuario por id
const mostrarUsuario=(req,res)=>{

    const {id}= req.params;

    connection.query('SELECT * FROM Usuarios WHERE  id=?', [id], (error,results)=>{
        if(error){
            return res.status(500).json({error:'error al obtener el Usuario'});
        }
        if(results.length===0){
            return res.status(404).json({error:'Usuario no encontrado'});
        }
        res.json(results[0]);

    });
}

// crear un Usuario
const crearUsuario= (req,res)=>{
    const {nombre,contraseña} =req.body;

    if(!nombre || !contraseña){
        return res.status(400).json({

            error: 'faltan datos requeridos: nombre y contraseña'
        });
    }
    connection.query(
        'INSERT INTO Usuarios (nombre,contraseña) values (?,?)',
        [nombre,contraseña],
        (error,results)=>{
            if(error){
                return res.status(500).json({
                    error:'error al crear el Usuario',
                    detalle: error.message
                });
            }
            res.json({
                message:'Usuario creado correctamente'
            });
        }
    );

}

// editar Usuario
const editarUsuario = (req,res)=>{
    const {id} = req.params;
    const {nombre,contraseña}=req.body;

    connection.query('UPDATE Usuarios SET nombre=?,contraseña=? WHERE id_usuario=?',
        [nombre,contraseña,id],(error,results)=>{
            if(error){
                return res.status(500).json({error:'error al editar el usuario'});
           }
           if(results.affectedRows===0){
            return res.status(404).json({error: 'Usuario no encontrado'});
           }
           res.json({id,nombre,contraseña});

        });
}

// eliminar un usuario
const elimnarUsuario=(req,res)=>{
    const {id}=req.params;

    connection.query('DELETE FROM  Usuarios WHERE id_usuario =?', [id],(error,results)=>{
        if(error){
            return res.status(500).json({error: 'error al eliminar el usuario'});
        }
        if(results.affectedRows===0){
            return res.status(404).json({error: 'usuario no encontrado'});
        }
        res.status(204).send();
    });
}

module.exports={
    mostrarUsuarios,
    mostrarUsuario,
    crearUsuario,
    editarUsuario,
    elimnarUsuario
};