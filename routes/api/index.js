const router = require('express').Router();
const customerRoutes = require('./customers');

router.use('/customers', customerRoutes);

module.exports = router;