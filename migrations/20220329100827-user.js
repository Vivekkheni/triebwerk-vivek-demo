'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('User', {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER, },
        password: { type: Sequelize.STRING, defaultValue: null },
        name: { type: Sequelize.STRING, defaultValue: null },
        email: { type: Sequelize.STRING, defaultValue: null },
        status: { type: Sequelize.ENUM("available ", "assign",), defaultValue: "available" },
        createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: false, },
        updatedAt: { type: Sequelize.DATE, allowNull: false, field: 'updated_at', },
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      // we can do this because it is the first migration
      await queryInterface.dropAllTables();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
