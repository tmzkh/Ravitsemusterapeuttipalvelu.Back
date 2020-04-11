const Sequelize = require('sequelize');

require('dotenv').config();

const Config = require('./config');

const testing = process.env.NODE_ENV == 'test' ? true : false;

module.exports = ({ dbHost, dbName, username, pwd }) => {
    return new Sequelize(
        testing ? Config.test.database : Config.development.database, 
        testing ? Config.test.username : Config.development.username,
        testing ? Config.test.password : Config.development.password,
        {
            host: testing ? Config.test.host : Config.development.host,
            dialect: testing ? Config.test.dialect : Config.development.dialect,
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                timestamps:false,
                charset: 'utf8',
                collate: 'utf8_general_ci'
            },
            logging: testing ? false : true
        },
        
    );
}