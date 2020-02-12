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
        validate: {
            notNull: {
                msg: "Start time is required"
            },
            isDate:{
                msg: "Invalid date formatting"
            },
        }
    },
    duration: {
        type: Sequelize.INTEGER,
        validate: {
            notNull: {
                msg: "Duration is required"
            },
            isInt: {
                msg: "Duration must be integer (minutes)"
            },
            min: {
                args: 1,
                msg: "Duration must be atleast 1 minute"
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
            is: {
                args: ["^[a-z]+$",'i'],
                msg: "Name must be string"
            }
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {timestamps: true});

const Dietician = require('./dietician');
const Customer = require('./customer');

Booking.hasOne(Dietician);
Dietician.hasMany(Booking);

Booking.hasOne(Customer);
Customer.hasMany(Booking);

module.exports = Booking;