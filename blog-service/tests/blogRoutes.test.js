const request = require('supertest');
const app = require('../src/app');

describe('Blog Routes', () => {
  test('POST /blog/posts - Deve criar uma nova postagem', async () => {
    const newPost = {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      content: 'Test content',
      authorName: 'Test Author'
    };

    const response = await request(app)
      .post('/blog/posts')
      .send(newPost);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

});

describe('PUT /blog/posts/:id', () => {
  test('deve atualizar um post existente', async () => {
    const updatedData = { title: 'Updated Title' };
    const postId = 'id_do_post'; // Substitua pelo ID real de um post

    const response = await request(app)
      .put(`/blog/posts/${postId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
  });
});

describe('DELETE /blog/posts/:id', () => {
  test('deve deletar um post', async () => {
    const postId = 'id_do_post'; // Substitua pelo ID real de um post

    const response = await request(app)
      .delete(`/blog/posts/${postId}`);

    expect(response.statusCode).toBe(200);
  });
});

describe('GET /blog/posts/:id', () => {
  test('deve recuperar um post específico', async () => {
    const postId = 'id_do_post'; // Substitua pelo ID real de um post

    const response = await request(app)
      .get(`/blog/posts/${postId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title');
  });
});

describe('GET /blog/posts', () => {
  test('deve listar todos os posts', async () => {
    const response = await request(app)
      .get('/blog/posts');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
