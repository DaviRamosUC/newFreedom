const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  email: DataTypes.STRING,
  senha: DataTypes.STRING,
  jwt_token: DataTypes.TEXT,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  timestamps: false,
  tableName: 'users'
});

const repo = {
  saveUserToken: async (email, token) => {
    const user = await User.findOne({ where: { email } });
    if (user) {
      user.jwt_token = token;
      await user.save();
    }
  },

  createUser: async (email, senha, createdAt) => {
    const user = await User.create({ email, senha, created_at: createdAt });
    return user;
  },

  getUserCredentials: async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
  },

  getUserById: async (id) => {
    const user = await User.findByPk(id);
    return user;
  },

  updateUserPassword: async (id, hashedPassword) => {
    const user = await User.findByPk(id);
    if (user) {
      user.senha = hashedPassword;
      user.updated_at = new Date();
      await user.save();
    }
  },

  deleteUserById: async (id) => {
    const deleted = await User.destroy({ where: { id } });
    return deleted;
  },

  updateUserToken: async (userId, newToken) => {
    const user = await User.findByPk(userId);
    if (user) {
      user.jwt_token = newToken;
      await user.save();
    }
  }
};

module.exports = repo;
