require('dotenv').config()
const express = require('express');
const app = express();
const authMiddleware = require('./middlewares/auth_middleware')
const marketplaceRoutes = require('./routes/marketplaceRoutes')

app.use(express.json()); // Para parsear requisições JSON
app.use(authMiddleware.validateTokenMiddleware)
app.use('/marketplace', marketplaceRoutes);
// Definição das rotas será feita aqui

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // Para uso em testes
