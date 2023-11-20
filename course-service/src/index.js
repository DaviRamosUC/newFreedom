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

app.post('/courses/:id/like', async (req, res) => {
    try {
      const courseId = req.params.id;
      const courseRef = db.collection('courses').doc(courseId);
  
      // Pode ser um incremento simples ou um controle mais complexo de usuários que deram like
      await courseRef.update({ likes: admin.firestore.FieldValue.increment(1) });
  
      res.status(200).send(`Like adicionado ao curso ${courseId}`);
    } catch (error) {
      console.error('Erro ao adicionar like:', error);
      res.status(500).send('Erro interno');
    }
  });

// Outras rotas...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
module.exports = app;