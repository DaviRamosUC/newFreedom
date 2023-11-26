const request = require('supertest');
const app = require('../src/index'); // Ajuste o caminho conforme necessário

describe('Marketplace Routes', () => {
  test('POST /api/products - Deve criar um novo produto', async () => {
    const productData = {
      title: 'Produto Teste',
      description: 'Descrição Teste',
      price: 100,
      userId: 'idUsuarioTeste'
    };

    const response = await request(app)
      .post('/api/products')
      .send(productData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Adicione mais testes para as outras rotas
});
