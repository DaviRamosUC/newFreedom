const request = require('supertest');
const app = require('../src/index'); // Importe seu app Express

describe('Testes de usuário', () => {
  let testUserEmail;
  let testUserId;
  let testUserToken;

  // Criar usuário antes de executar os testes
  beforeAll(async () => {
    const createdAt = new Date().getTime();
    testUserEmail = `usuario_teste${createdAt}@test.com`;
    const createUserResponse = await request(app)
      .post('/auth/create-user')
      .send({
        email: testUserEmail,
        senha: 'senha_teste'
      });

    expect(createUserResponse.statusCode).toEqual(200);
    testUserId = createUserResponse.body.id; // Armazene o ID do usuário criado
  });

  // Teste de login
  test('Deve realizar o login com sucesso', async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: testUserEmail,
        senha: 'senha_teste'
      });

    console.log(loginResponse)
    expect(loginResponse.statusCode).toEqual(200);
    expect(loginResponse.body).toHaveProperty('token'); // Verifica se o token foi retornado
    testUserToken = loginResponse.body.token
  });

  test('Deve alterar a senha do usuário', async () => {
    const oldPassword = 'senha_teste'; // A senha atual do usuário de teste
    const newPassword = 'nova_senha123';

    const res = await request(app)
      .put('/auth/change-password')
      .send({
        id: testUserId,
        oldPassword: oldPassword,
        newPassword: newPassword
      });
  
    expect(res.statusCode).toEqual(200); // Ou outro código de status que você espera
    // Aqui você pode adicionar mais verificações conforme necessário
  });

  test('Deve revalidar o token e retornar um novo', async () => {
    const res = await request(app)
      .post('/auth/revalidate-token')
      .send({ testUserToken });
  
    expect(res.statusCode).toEqual(200); // Ou outro código de status que você espera
    expect(res.body).toHaveProperty('token'); // Verifica se um novo token foi retornado
    // Aqui você pode adicionar mais verificações conforme necessário
  });

  // Excluir o usuário após os testes
  afterAll(async () => {
    const deleteResponse = await request(app).delete(`/delete-user/${testUserId}`);
    expect(deleteResponse.statusCode).toEqual(200);
  });
});
