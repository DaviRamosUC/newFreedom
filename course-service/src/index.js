require('dotenv').config();
const express = require('express');
const app = express();
const admin = require('firebase-admin');
const db = require('./config/firebaseConfig');
const authMiddleware = require('./middlewares/auth_middleware')

app.use(express.json());
app.use(authMiddleware.validateTokenMiddleware)

if (admin.apps.length === 0) { // Verifica se o admin já foi inicializado
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

app.post('/create-course', async (req, res) => {
  try {
    const { titulo, descricao, urlMedia } = req.body;
    const created_at = new Date();
    const updated_at = null;
    const comentarios = null;
    const likes = 0;
    const deslikes = 0;
    const course = {
      titulo,
      descricao,
      urlMedia,
      likes,
      deslikes,
      comentarios,
      created_at,
      updated_at
    };

    const ref = await db.collection('courses').add(course);
    res.status(201).send(`Curso criado com ID: ${ref.id}`);
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    res.status(500).send('Erro interno');
  }
});

app.delete('/courses/:id', async (req, res) => {
    const courseId = req.params.id;
  
    try {
      const courseRef = db.collection('courses').doc(courseId);
      const courseDoc = await courseRef.get();
  
      if (!courseDoc.exists) {
        return res.status(404).send('Curso não encontrado.');
      }
  
      await courseRef.delete();
      res.status(200).send(`Curso com ID ${courseId} deletado com sucesso.`);
    } catch (error) {
      console.error('Erro ao deletar curso:', error);
      res.status(500).send('Erro interno ao deletar curso.');
    }
});

app.put('/courses/:id', async (req, res) => {
    const courseId = req.params.id;
    const updatedData = req.body;
  
    try {
      const courseRef = db.collection('courses').doc(courseId);
      const courseDoc = await courseRef.get();
  
      if (!courseDoc.exists) {
        return res.status(404).send('Curso não encontrado.');
      }
  
      await courseRef.update(updatedData);
      res.status(200).send(`Curso com ID ${courseId} atualizado com sucesso.`);
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
      res.status(500).send('Erro interno ao atualizar curso.');
    }
});
  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
module.exports = app;