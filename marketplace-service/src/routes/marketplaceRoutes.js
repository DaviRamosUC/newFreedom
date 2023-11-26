const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');

router.post('/products', marketplaceController.createProduct);
// Defina as outras rotas CRUD aqui

module.exports = router;
