const db = require('../config/firebaseConfig');

const marketplaceController = {
  createProduct: async (req, res) => {
    try {
      const { title, description, price, userId } = req.body;
      const newProduct = {
        title,
        description,
        price,
        userId,
        createdAt: new Date()
      };

      const ref = await db.collection('products').add(newProduct);
      res.status(201).json({ id: ref.id, ...newProduct });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).send('Erro interno ao criar produto.');
    }
  },

  // Adicione aqui as outras funções CRUD

};

module.exports = marketplaceController;
