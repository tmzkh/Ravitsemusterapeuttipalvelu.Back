'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dieticianId: {
        type: Sequelize.UUID,
        allowNull: true,
        unique: true,
        references: {
          model: 'dieticians',
          key:'id'
        },
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key:'id'
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
