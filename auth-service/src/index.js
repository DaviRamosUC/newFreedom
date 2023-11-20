require('dotenv').config();
const repo = require('./repository')
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json()); // Para parsear JSON no corpo das requisições

app.post('/login', async (req, res) => {
  const { email, senha } = req.query;
  console.log(req)
  try {
    const user = await repo.getUserCredentials(email);

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).send('Senha incorreta');
    }

    const token = jwt.sign({ id: user.id, email }, jwtSecret, { expiresIn: '1h' });
    await repo.saveUserToken(email, token);

    res.json({ token, id: user.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/create-user', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const createdAt = new Date();
    const hashedSenha = await bcrypt.hash(senha, 10); // 10 é o número de rounds para o salt

    const newUser = await pool.query(
      'INSERT INTO users (email, senha, created_at) VALUES ($1, $2, $3) RETURNING *', 
      [email, hashedSenha, createdAt]
    );
    
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/revalidate-token', async (req, res) => {
  try {
    const { oldToken } = req.body;

    // Verifica o token antigo
    jwt.verify(oldToken, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(401).send('Token inválido ou expirado');
      }

      // Gera um novo token
      const newToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Atualiza o token no banco de dados
      await repo.updateUserToken(user.id, newToken);

      // Retorna o novo token
      res.json({ token: newToken });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

app.put('/change-password', async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;

    // Verificar a senha antiga
    const user = await repo.getUserById(id)
    if (user.rows.length === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    const validPassword = await bcrypt.compare(oldPassword, user.rows[0].senha);
    if (!validPassword) {
      return res.status(400).send('Senha antiga incorreta');
    }

    // Hash da nova senha e atualização
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await repo.updateUserPassword(hashedPassword, id)

    res.status(200).send('Senha alterada com sucesso');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

app.delete('/delete-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await repo.deleteUserById(id);

    if (deleteUser.rowCount === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    res.status(200).send('Usuário excluído com sucesso');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;