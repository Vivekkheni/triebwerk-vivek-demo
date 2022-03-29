'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('Report', {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER, },
        userId: { type: Sequelize.INTEGER, references: { model: 'User', key: 'id' }, defaultValue: null },
        first_name: { type: Sequelize.STRING, defaultValue: null },
        last_name: { type: Sequelize.STRING, defaultValue: null },
        message: { type: Sequelize.STRING, defaultValue: null },
        email: { type: Sequelize.STRING, defaultValue: null },
        status: { type: Sequelize.ENUM("pending ", "assign", "completed"), defaultValue: "pending" },
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
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
