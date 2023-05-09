const express = require ('express');
const route = express.Router();
const userController = require('./src/Controller/UserController')


// Defina uma rota GET para buscar todos os usuários
route.get('/usuarios',userController.getAll);
  
  // Defina uma rota GET para buscar um usuário por ID
  route.get('/usuarios/:id',userController.get);
  
  // Defina uma rota POST para criar um novo usuário
  route.post('/usuarios', userController.create);
  
  // Defina uma rota PUT para atualizar um usuário existente
  route.put('/usuarios/:id', userController.update);

  
  // Defina uma rota DELETE para excluir um usuário existente
  route.delete('/usuarios/:id', userController.remove);
  



module.exports = route;