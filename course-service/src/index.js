require('dotenv').config();
const { storage, db } = require('./config/firebaseConfig');
const admin = require('firebase-admin');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const express = require('express');
const app = express();
const authMiddleware = require('./middlewares/auth_middleware')

app.use(express.json());
app.use(authMiddleware.validateTokenMiddleware)

if (admin.apps.length === 0) { // Verifica se o admin já foi inicializado
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

app.post('/curses/create-course', async (req, res) => {
  try {
    const { titulo, descricao, urlMedia } = req.body;
    const created_at = new Date();
    const updated_at = null;
    const likes = 0;
    const deslikes = 0;
    const course = {
      titulo,
      descricao,
      urlMedia,
      likes,
      deslikes,
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

app.post('/courses/:courseId/comments', async (req, res) => {
    const { courseId } = req.params;
    const { userId, comentario } = req.body;
  
    try {
      const courseRef = db.collection('courses').doc(courseId);
      const courseDoc = await courseRef.get();
  
      if (!courseDoc.exists) {
        return res.status(404).send('Curso não encontrado.');
      }
  
      const comment = {
        text: comentario,
        created_at: new Date()
      };
  
      await courseRef.collection('comentarios').doc(userId).set(comment);
      res.status(200).send('Comentário adicionado com sucesso.');
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      res.status(500).send('Erro interno ao adicionar comentário.');
    }
});

app.post('/courses/:courseId/upload-image', upload.single('image'), async (req, res) => {
    const { courseId } = req.params;
    const file = req.file;
  
    if (!file) {
      return res.status(400).send('Nenhum arquivo foi enviado.');
    }
  
    const blob = storage.bucket().file(`courses/${courseId}/${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });
  
    blobStream.on('error', (error) => res.status(500).send('Erro ao fazer upload da imagem.'));
  
    blobStream.on('finish', async () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.bucket().name}/o/${encodeURIComponent(blob.name)}?alt=media`;
      
      // Aqui você pode associar a URL da imagem ao curso no Firestore
      await db.collection('courses').doc(courseId).update({ imageUrl: publicUrl });
  
      res.status(200).send({ imageUrl: publicUrl });
    });
  
    blobStream.end(file.buffer);
});
  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
module.exports = app;