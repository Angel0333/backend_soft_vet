const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'olivia',
    database:'db_softVet'
});

connection.connect((err) =>{
    if (err) {
        console.error('Error al conectar la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos')
})

module.exports = { connection };