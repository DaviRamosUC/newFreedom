const firebase = require('../config/firebaseConfig'); // Caminho para sua configuração do Firebase

const blogController = {
  // Cria uma nova publicação
  createPost: async (req, res) => {
    try {
      const { title, subtitle, content, authorName, imageUrl } = req.body;
      const newPost = {
        title,
        subtitle,
        content,
        authorName,
        imageUrl,
        createdAt: new Date()
      };

      const ref = await firebase.db.collection('posts').add(newPost);
      res.status(201).json({ id: ref.id, ...newPost });
    } catch (error) {
      console.error('Erro ao criar a publicação:', error);
      res.status(500).send('Erro interno ao criar a publicação.');
    }
  },

  // Atualiza uma publicação existente
  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      await db.collection('posts').doc(id).update(updatedData);
      res.status(200).send(`Publicação com ID ${id} atualizada com sucesso.`);
    } catch (error) {
      console.error('Erro ao atualizar a publicação:', error);
      res.status(500).send('Erro interno ao atualizar a publicação.');
    }
  },

  // Deleta uma publicação
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;

      await db.collection('posts').doc(id).delete();
      res.status(200).send(`Publicação com ID ${id} deletada com sucesso.`);
    } catch (error) {
      console.error('Erro ao deletar a publicação:', error);
      res.status(500).send('Erro interno ao deletar a publicação.');
    }
  },

  // Retorna uma publicação específica
  getPost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await db.collection('posts').doc(id).get();

      if (!post.exists) {
        return res.status(404).send('Publicação não encontrada.');
      }

      res.status(200).json(post.data());
    } catch (error) {
      console.error('Erro ao recuperar a publicação:', error);
      res.status(500).send('Erro interno ao recuperar a publicação.');
    }
  },

  // Retorna todas as publicações
  getAllPosts: async (req, res) => {
    try {
      const snapshot = await db.collection('posts').get();
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      res.status(200).json(posts);
    } catch (error) {
      console.error('Erro ao recuperar publicações:', error);
      res.status(500).send('Erro interno ao recuperar publicações.');
    }
  }
};

module.exports = blogController;
