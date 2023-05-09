const connection = require('../Database/database');
const bcrypt = require('bcrypt');

async function hash(senha){
    const salt = 8;//configuração de encriptação
    const senhaHash = await bcrypt.hash(senha, salt);// encripta a senha antes de salvar
    return senhaHash;
}

async function create(body) {
    const { nome, email, senha } = body;
   
    const senhaHash = await hash(senha);

    connection.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senhaHash], (error, results) => {
        if (error) throw error;

    });
    return { Status: "OK", data: { nome, email } }
}



async function getAll() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM usuarios', (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
}

async function get(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
            if (error) return reject(error);
            resolve(results)
        });
    })
}

async function remove(id) {
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        return true;
    });
    return true;
}

async function update(id, body) {
   
    const { nome, email, senha } = body;
    const senhaHash = await hash(senha);
    connection.query('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senhaHash, id], (error, results) => {
        if (error) throw error;

    });
    return { Status: "OK", data: { nome, email } }
}


async function userIsExisting(id){
 user = await get(id);
 if (Array.isArray(user) && user.length === 0) {
   return false;
  } else {
return true
  }

      
}

module.exports = { create, getAll, get, remove ,update , userIsExisting}