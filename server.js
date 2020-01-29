const app = require('express')();

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOST || 'localhost';


app.use('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running AT http://${HOSTNAME}:${PORT}/`);
});