require('dotenv').config()
const express = require('express');
const app = express();

app.use(express.json()); // Para parsear requisições JSON
app.use('/marketplace', marketplaceRoutes);
// Definição das rotas será feita aqui

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // Para uso em testes
