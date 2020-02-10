const customer = require('../models/customer');

module.exports = {
    getAll: () => {
        customer.findAll()
        .then((customers) => {
            return customers;
        }).catch((err) => {
            console.error(err);
        });
    }
}