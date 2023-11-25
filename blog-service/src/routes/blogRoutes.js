const express = require('express');
const router = express.Router();

// Importe os controladores
const blogController = require('../controllers/blogController');

// Rotas
router.post('/posts', blogController.createPost);
router.put('/posts/:id', blogController.updatePost);
router.delete('/posts/:id', blogController.deletePost);
router.get('/posts/:id', blogController.getPost);
router.get('/posts', blogController.getAllPosts);

module.exports = router;
