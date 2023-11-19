const request = require('supertest');
const app = require('../src/index'); // Importe seu app Express

describe('Testes de Autenticação', () => {
  test('Login bem-sucedido deve retornar um token JWT', async () => {
    const response = await request(app)
      .post('/login') // Rota de login que você irá criar
      .send({
        username: 'usuario_teste',
        password: 'senha_teste'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Aqui você pode adicionar mais testes, como login falho, validação, etc.
});
