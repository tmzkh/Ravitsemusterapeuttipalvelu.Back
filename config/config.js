// config dotenv
require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    operatorsAliases: 0,
  },
  "test": {
    "username": process.env.TEST_DB_USERNAME,
    "password": process.env.TEST_DB_PWD,
    "database": process.env.TEST_DB_NAME,
    "host": process.env.TEST_DB_HOST,
    "dialect": "mysql",
    operatorsAliases: 0,
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    operatorsAliases: 0,
  }
}
