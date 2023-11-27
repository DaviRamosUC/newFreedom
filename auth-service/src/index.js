require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const port = process.env.PORT || 3000;

sequelize.authenticate()
.then(() => console.log('Conexão com o banco de dados estabelecida.'))
.catch(err => console.error('Erro ao conectar com o banco de dados:', err));

const app = express();
app.use(express.json()); // Para parsear JSON no corpo das requisições
app.use(cors());
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;