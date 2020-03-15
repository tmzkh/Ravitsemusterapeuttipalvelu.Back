const Sequelize = require('sequelize');

const Role = require('./role');

// config dotenv
require('dotenv').config();
const db = require('../config/database')({
        dbHost: process.env.DB_HOST, 
        dbName: process.env.DB_NAME, 
        username: process.env.DB_USERNAME, 
        pwd:process.env.DB_PWD
    });

const User = db.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        validate: {
            isUUID: 4,
        }
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Username is required"
            },
            isEmail: {
                msg: "Username must be an email"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required"
            },
        }
    },
    roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Role is required"
            },
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {timestamps: true});

User.hasOne(Role, {foreignKey: 'roleId'});

module.exports = User;