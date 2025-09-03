const mysql = require('mysql2');

const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'171101',
    database:'soft_vet'
});

connection.connect((err)=>{
    if(err){
        console.log('error al conectar a la base de datos:',err);
        return;
    }
    console.log('conectado a la base de datos');
});

module.exports={connection};