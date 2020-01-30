// create express app
const app = require('express')();

// config dotenv
require('dotenv').config();

// get port and hostname from process env
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOST || 'localhost';

const db = require('./config/database')(
    {
        dbHost: process.env.DB_HOST, 
        dbName: process.env.DB_NAME, 
        username: process.env.DB_USERNAME, 
        pwd:process.env.DB_PWD
    });

db.authenticate()
    .then(() => console.log('Db connected'))
    .catch(err => console.log(err))

app.use('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running AT http://${HOSTNAME}:${PORT}/`);
});