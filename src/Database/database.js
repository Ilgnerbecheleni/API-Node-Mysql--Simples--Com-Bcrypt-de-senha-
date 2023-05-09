const mysql = require('mysql2');
require('dotenv').config()



// Cria uma conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
  });
  
  
  // Conecte-se ao banco de dados MySQL
  connection.connect(error => {
      if (error) throw error;
      console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
      
      // Cria a tabela 'usuarios' caso ela não exista
      connection.query(`CREATE TABLE IF NOT EXISTS usuarios (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        senha VARCHAR(1000) NOT NULL,
        PRIMARY KEY (id)
      )`, error => {
        if (error) throw error;
      
      });
    });

    module.exports = connection;