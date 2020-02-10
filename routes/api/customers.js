const router = require('express').Router();
const customerController = require('../../controllers/customerController')

router.get('/', (req, res) => {
    res.send(customerController.getAll());
});

module.exports = router;