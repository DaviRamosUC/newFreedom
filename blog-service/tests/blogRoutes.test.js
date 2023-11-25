const request = require('supertest');
const app = require('../src/app');

describe('Blog Routes', () => {
  test('POST /api/posts - Deve criar uma nova postagem', async () => {
    const newPost = {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      content: 'Test content',
      authorName: 'Test Author'
    };

    const response = await request(app)
      .post('/api/posts')
      .send(newPost);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Adicione mais testes para outras rotas...
});
