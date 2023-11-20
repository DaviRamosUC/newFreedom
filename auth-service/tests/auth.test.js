const request = require('supertest');
const app = require('../src/index'); // Importe seu app Express

describe('Testes de usuário', () => {
  var id = 1;
  const createdAt = new Date();
  test('Deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/create-user')
      .send({
        email: 'usuario_teste',
        senha: 'senha_teste'
      });
      
    expect(res.statusCode).toEqual(200); // Ou outro código de status que você espera
    expect(res.body).toHaveProperty('id'); // Verifica se a resposta tem a propriedade id
  });

  test('Login bem-sucedido deve retornar um token JWT', async () => {
    const response = await request(app)
      .post('/login') // Rota de login que você irá criar
      .send({
        email: 'usuario_teste'+createdAt,
        senha: 'senha_teste'
      });

    id = response.body.id;

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Deve alterar a senha do usuário', async () => {
    const userId = id; // Substitua pelo ID de um usuário de teste
    const oldPassword = 'senha_teste'; // A senha atual do usuário de teste
    const newPassword = 'nova_senha123';

    const res = await request(app)
      .put('/change-password')
      .send({
        id: userId,
        oldPassword: oldPassword,
        newPassword: newPassword
      });
  
    expect(res.statusCode).toEqual(200); // Ou outro código de status que você espera
    // Aqui você pode adicionar mais verificações conforme necessário
  });

  test('Deve excluir o usuário', async () => {
    const res = await request(app)
      .delete(`/delete-user/${id}`);

    expect(res.statusCode).toEqual(200); // Ou outro código de status que você espera
    // Aqui você pode adicionar mais verificações conforme necessário
  });

  const oldToken = 'seu_token_jwt_existente'; // Substitua pelo token JWT de um usuário de teste

  test('Deve revalidar o token e retornar um novo', async () => {
    const res = await request(app)
      .post('/revalidate-token')
      .send({ oldToken });
  
    expect(res.statusCode).toEqual(200); // Ou outro código de status que você espera
    expect(res.body).toHaveProperty('token'); // Verifica se um novo token foi retornado
    // Aqui você pode adicionar mais verificações conforme necessário
  });

});
