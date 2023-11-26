require("dotenv").config()
const express = require('express');
const blogRoutes = require('./routes/blogRoutes');
const app = express();


app.use(express.json()); // Middleware para parsear JSON
app.use('/blog', blogRoutes);

// Definição de rotas virá aqui

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // Exporte para uso nos testes

