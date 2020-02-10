const Sequelize = require('sequelize');
// config dotenv
require('dotenv').config();
const db = require('../config/database')({
        dbHost: process.env.DB_HOST, 
        dbName: process.env.DB_NAME, 
        username: process.env.DB_USERNAME, 
        pwd:process.env.DB_PWD
    });

const Dietician = db.define('dieticians', {
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
                args: ["^[a-z]+$",'i'],
                msg: "Name must be string"
            }
        }
    },
    education: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Education is required"
            }
        }
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Place is required"
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
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Phone number is required"
            },
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = Dietician;