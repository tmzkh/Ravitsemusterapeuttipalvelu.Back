const Sequelize = require('sequelize');

const Dietician = require('./dietician');
const Role = require('./role');

const db = require('../config/database')();

const User = db.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        validate: {
            isUUID: 4,
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Username already taken"
        },
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
    dieticianId: {
        type: Sequelize.UUID,
        allowNull: true,
        isUUID: {
            args: 4,
            msg: "Id must be in UUID4 fromat"
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {timestamps: true});

User.belongsTo(Role, {foreignKey: 'roleId'});
User.belongsTo(Dietician, {foreignKey: 'dieticianId'});

module.exports = User;