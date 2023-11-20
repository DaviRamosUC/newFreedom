'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      "CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, senha VARCHAR(255) NOT NULL, jwt_token TEXT, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP);"
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query("DROP TABLE users");
  }
};
