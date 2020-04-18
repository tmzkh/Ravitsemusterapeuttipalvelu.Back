const Sequelize = require('sequelize');
// config dotenv
//require('dotenv').config();
const db = require('../config/database')();

const Customer = db.define('customers', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        validate: {
            isUUID: 4,
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Name is required"
            },
            is: {
                args: ["^([a-z]|å|ä|ö| )+$",'i'],
                msg: "Name must be string"
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Email is required"
            },
            isEmail: {
                msg: "Invalid email formatting"
            }
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {timestamps: true});

module.exports = Customer;