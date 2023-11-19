const request = require('supertest');
const app = require('../src/index'); // Importe seu app Express

describe('Testes de Autentica��o', () => {
  test('Login bem-sucedido deve retornar um token JWT', async () => {
    const response = await request(app)
      .post('/login') // Rota de login que voc� ir� criar
      .send({
        username: 'usuario_teste',
        password: 'senha_teste'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Aqui voc� pode adicionar mais testes, como login falho, valida��o, etc.
});
