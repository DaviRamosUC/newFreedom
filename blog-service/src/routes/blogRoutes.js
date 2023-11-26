const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Importe os controladores
const blogController = require('../controllers/blogController');

// Rotas
router.post('/posts', blogController.createPost);
router.put('/posts/:id', blogController.updatePost);
router.delete('/posts/:id', blogController.deletePost);
router.get('/posts/:id', blogController.getPost);
router.get('/posts', blogController.getAllPosts);
router.post('/posts/:id/upload-image', upload.single('image'), blogController.uploadImage);


module.exports = router;
