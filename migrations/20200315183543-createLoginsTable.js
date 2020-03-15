'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'bookings', { 
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        customerId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'customers',
              key:'id'
            }
        },
        dieticianId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'dieticians',
              key:'id'
            }
        },
        startsAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endsAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Description is required"
                },
            }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE, 
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bookings');
  }
};
