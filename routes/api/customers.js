const router = require('express').Router();
const customer = require('../../models/customer');

router.get('/', (req, res) => {
    customer.findAll()
    .then((customers) => {
        console.log(customers);
    }).catch((err) => {
        console.error(err);
    });
});

module.exports = router;