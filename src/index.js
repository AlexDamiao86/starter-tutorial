const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");

//Iniciando o App
const app = express();
//Permite o recebimento de dados atraves do formato JSON
app.use(express.json());
app.use(cors());

//Iniciando o DB
mongoose.connect('mongodb://localhost:27017/nodeapi', 
  { useNewUrlParser: true, 
    useUnifiedTopology: true });
//Registrar o modelo em nossa aplicação
requireDir('./models');

//Primeira rota
app.use('/api', require('./routes'));

app.listen(3333);