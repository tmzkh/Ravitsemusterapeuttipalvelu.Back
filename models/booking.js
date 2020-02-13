const Sequelize = require('sequelize');
// config dotenv
require('dotenv').config();
const db = require('../config/database')({
        dbHost: process.env.DB_HOST, 
        dbName: process.env.DB_NAME, 
        username: process.env.DB_USERNAME, 
        pwd:process.env.DB_PWD
    });

const Booking = db.define('booking', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        validate: {
            isUUID: {
                args: 4,
                msg: "Id must be in UUID4 fromat"
            }
        }
    },
    customerId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Customer id is required"
            }, 
            isUUID: {
                args: 4,
                msg: "Id must be in UUID4 fromat"
            }
        }
    },
    dieticianId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Dietician id is required"
            }, 
            isUUID: {
                args: 4,
                msg: "Id must be in UUID4 fromat"
            }
        }
    },
    startsAt: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Start date is required"
            },
            isDate:{
                msg: "Invalid date formatting"
            },
        }
    },
    endsAt: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "End date is required"
            },
            isDate:{
                msg: "Invalid date formatting"
            },
            isAfter: {
                args: this.startsAt
            }
        }
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
}, {timestamps: true});

const Dietician = require('./dietician');
const Customer = require('./customer');

Booking.belongsTo(Dietician);
Dietician.hasMany(Booking);

Booking.belongsTo(Customer);
Customer.hasMany(Booking);

module.exports = Booking;