const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const repo = require('../repositories/repository')
const jwtSecret = process.env.JWT_SECRET;


const authController = {
    loginAuth: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const user = await repo.getUserCredentials(email);

            if (!user) {
                return res.status(404).send('Usuário não encontrado');
            }

            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                return res.status(401).send('Senha incorreta');
            }

            const token = jwt.sign({ id: user.id, email }, jwtSecret, { expiresIn: '1h' });
            await repo.saveUserToken(email, token);

            res.json({ token });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },
    createUserAuth: async (req, res) => {
        try {
            const { email, senha } = req.body;
            const createdAt = new Date();
            const hashedSenha = await bcrypt.hash(senha, 10); // 10 é o número de rounds para o salt

            const newUser = await repo.createUser(email, hashedSenha, createdAt)
            res.json(newUser);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },
    revalidateTokenAuth: async (req, res) => {
        try {
            const { oldToken } = req.body;

            // Verifica o token antigo
            jwt.verify(oldToken, process.env.JWT_SECRET, async (err, user) => {
                if (err) {
                    return res.status(401).send('Token inválido ou expirado');
                }

                // Gera um novo token
                const newToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

                // Atualiza o token no banco de dados
                await repo.updateUserToken(user.id, newToken);

                // Retorna o novo token
                res.json({ token: newToken });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erro no servidor');
        }
    },
    validateTokenAuth: async (req, res) => {
        try {
            const { token } = req.body;
            var tokenTratado = ''
            tokenTratado = token
            if (tokenTratado.startsWith('Bearer ')) {
                tokenTratado = tokenTratado.split(' ')[1];
            }
            jwt.verify(tokenTratado, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send('Token inválido ou expirado');
                }

                // Retorna alguma informação útil após a validação
                // Por exemplo, podemos retornar os dados decodificados do token
                res.json({ valid: true, data: decoded });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erro no servidor');
        }
    },
    changePasswordAuth: async (req, res) => {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword } = req.body;

            // Verificar a senha antiga
            const user = await repo.getUserById(id)
            if (user.id == null || user.id == undefined) {
                return res.status(404).send('Usuário não encontrado');
            }

            const validPassword = await bcrypt.compare(oldPassword, user.senha);
            if (!validPassword) {
                return res.status(400).send('Senha antiga incorreta');
            }

            // Hash da nova senha e atualização
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await repo.updateUserPassword(id, hashedPassword)

            res.status(200).send('Senha alterada com sucesso');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erro no servidor');
        }
    },
    deleteUserAuth: async (req, res) => {
        try {
            const { id } = req.params;
            const deleteUser = await repo.deleteUserById(id);

            if (deleteUser.rowCount === 0) {
                return res.status(404).send('Usuário não encontrado');
            }

            res.status(200).send('Usuário excluído com sucesso');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erro no servidor');
        }
    },
}

module.exports = authController;