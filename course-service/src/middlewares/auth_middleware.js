const axios = require("axios");

const authMiddleware = {
  validateTokenMiddleware: async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send("Token de autenticação não fornecido.");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/validate-token",
        { token }
      );
      if (response.status === 200) {
        next(); // Token válido, prosseguir para a rota solicitada
      } else {
        res.status(401).send("Token inválido.");
      }
    } catch (error) {
      console.error("Erro ao validar o token:", error);
      res.status(500).send("Erro interno ao validar o token.");
    }
  },
};

module.exports = authMiddleware;
