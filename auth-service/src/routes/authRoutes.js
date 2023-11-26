const express = require('express');
const router = express.Router();

// Importe os controladores
const loginController = require('../controllers/authController');

// Rotas
router.post('/login', loginController.loginAuth);
router.post('/create-user', loginController.createUserAuth);
router.post('/validate-token', loginController.validateTokenAuth);
router.post('/revalidate-token', loginController.revalidateTokenAuth);
router.delete('/delete-user/:id', loginController.deleteUserAuth);
router.put('/change-password/:id', loginController.changePasswordAuth);


module.exports = router;
