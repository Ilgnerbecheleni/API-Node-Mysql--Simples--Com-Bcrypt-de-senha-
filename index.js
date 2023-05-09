const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

//configura seu app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//importa suas rotas
const routes = require('./routes');//usuarios

app.use('/', routes);


app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});