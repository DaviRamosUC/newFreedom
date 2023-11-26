require('dotenv').config();
const express = require('express');
const authMiddleware = require('./middlewares/auth_middleware')
const courseRoutes = require('./routes/courseRoutes')

const app = express();
app.use(express.json());
app.use(authMiddleware.validateTokenMiddleware)
app.use('/courses', courseRoutes);

  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
module.exports = app;