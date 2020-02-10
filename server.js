// create express app
const express = require('express');
const app = express();
app.use(express.json());
const router = require('./routes/router');

// config dotenv
require('dotenv').config();

// get port and hostname from process env
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOST || 'localhost';

app.use('/', router);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running AT http://${HOSTNAME}:${PORT}/`);
});