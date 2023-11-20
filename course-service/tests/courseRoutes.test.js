const request = require('supertest');
const app = require('../src/index'); // Substitua pelo caminho correto do seu app Express

describe('Curso Routes', () => {
  let authToken;

  beforeAll(async () => {
    // Simule o login ou obtenha um token de teste válido do seu microserviço de autenticação
    authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c3VhcmlvX3Rlc3RlIiwiaWF0IjoxNzAwNDkxMTY1LCJleHAiOjE3MDA0OTQ3NjV9.i2unKT0KWy2Tx6kEGWfEuXyHrmEPiRXZg8iOuJPh_N4'; // Substitua pelo seu token real
    courseId = '';
  });

  test('POST /create-course - deve criar um novo curso', async () => {
    const courseData = {
      titulo: 'Curso Teste',
      descricao: 'Descrição Teste',
      urlMedia: 'http://url.to/media'
    };

    const response = await request(app)
      .post('/create-course')
      .set('Authorization', `${authToken}`)
      .send(courseData);

    expect(response.statusCode).toBe(201);
    expect(response.text).toContain('Curso criado com ID:');
    let dataResponse = response.text.split(":")
    courseId = dataResponse[1].trim()
  });

  test('PUT /courses/:id - deve atualizar um curso', async () => {
    const updatedData = {
      titulo: 'Novo Título',
      descricao: 'Nova Descrição',
      urlMedia: "https://youtu.be/efXKIEvKXOc?si=Ut_407OjM50qXpgM"
    };

    const response = await request(app)
      .put(`/courses/${courseId}`)
      .set('Authorization', `${authToken}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain(`Curso com ID ${courseId} atualizado com sucesso.`);
  });

  afterAll(async () => {
    const response = await request(app)
      .delete(`/courses/${courseId}`)
      .set('Authorization', `${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain(`Curso com ID ${courseId} deletado com sucesso.`);
  });

});