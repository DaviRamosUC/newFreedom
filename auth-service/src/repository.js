const pool = require('./db');

const repo = {
  saveUserToken: async (username, token) => {
    const client = await pool.connect();
    try {
      await client.query('UPDATE users SET jwt_token = $1 WHERE email = $2', [token, username]);
    } finally {
      client.release();
    }
  },

  createUser: async (email, senha, createdAt) => {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      'INSERT INTO users (email, senha, created_at) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedSenha, createdAt]
    );
    return result.rows[0];
  },

  getUserCredentials: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },
  
  getUserById: async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },
  
  updateUserPassword: async (id, hashedPassword) => {
    await pool.query('UPDATE users SET senha = $1, updated_at = NOW() WHERE id = $2', [hashedPassword, id]);
  },
  
  deleteUserById: async (id) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rowCount;
  },

  updateUserToken: async (userId, newToken) => {
    await pool.query('UPDATE users SET jwt_token = $1 WHERE id = $2', [newToken, userId]);
  },
}

module.exports = repo;
