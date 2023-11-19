require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json()); // Para parsear JSON no corpo das requisições

app.post('/login', (req, res) => {
  // Aqui você faria a validação das credenciais
  // Por enquanto, vamos assumir que o login é sempre bem-sucedido

  const user = { id: 1, username: req.body.username }; // Dados fictícios do usuário
  const token = jwt.sign(user, jwtSecret, { expiresIn: '1h' }); // Gere o token

  res.json({ token }); // Envie o token como resposta
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app; // Exporte para usar nos testes
