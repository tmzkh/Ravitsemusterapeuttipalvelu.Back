const Sequelize = require('sequelize');

module.exports = ({ dbHost, dbName, username, pwd }) => {
    return new Sequelize(
        dbName, 
        username,
        pwd,
        {
            host: dbHost,
            dialect: 'mysql',
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
            }
        },
    );
}