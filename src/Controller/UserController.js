const { use } = require('../../routes')
const userService = require('../Service/UserService')

// Criamos toda a parte dos controllers da aplicação para interagir com os services que acessam o banco de acordo com a rota

const create = async (req, res) => {
  const body = req.body
  const resposta = await userService.create(body)

  res.status(201).send(resposta)
}

const getAll = async (req, res) => {
  try {
    const users = await userService.getAll()
    if (Array.isArray(users) && users.length === 0) {
      res
        .status(400)
        .send({
          message: `Não existem usuarios cadastrados nessa base de dados`
        })
    } else {
      res.send(users)
    }
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const get = async (req, res) => {
  try {
    const id = req.params.id
    const user = await userService.get(id)
    const checkUser = await userService.userIsExisting(id) //verifica existencia de um usuario
    if (checkUser) {
      res.send(user)
    } else {
      res.status(400).send({ message: `Usuário com id ${id} não encontrado` })
    }
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const remove = async (req, res) => {
  try {
    const id = req.params.id
    const checkUser = await userService.userIsExisting(id) //verifica existencia de um usuario
    if (checkUser) {
      const deletar = await userService.remove(id) //executa a ação se existir
      if (deletar) {
        res.send({ status: 'OK', message: `usuario com id ${id} removido` })
      }
    } else {
      res.status(400).send({ message: `Usuário com id ${id} não encontrado` })
    }
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const update = async (req, res) => {
  const body = req.body
  const id = req.params.id

  const checkUser = await userService.userIsExisting(id) //verifica existencia de um usuario
  if (checkUser) {
    const resposta = await userService.update(id, body)
    res.status(201).send(resposta)
  } else {
    res.status(400).send({ message: `Usuário com id ${id} não encontrado` })
  }
}

module.exports = { create, getAll, get, remove, update }
