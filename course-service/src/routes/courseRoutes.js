const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Importe os controladores
const courseController = require('../controllers/courseController');

// Rotas
router.post('/create-course', courseController.createCourse);
router.delete('/:id', courseController.deleteCourse);
router.put('/:id', courseController.updateCourse);
router.post('/add-comment', courseController.addCommentCourse);
router.post('/:courseId/upload-image', upload.single('image'), courseController.uploadImage);


module.exports = router;
