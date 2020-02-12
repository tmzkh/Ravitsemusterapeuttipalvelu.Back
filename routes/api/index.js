const router = require('express').Router();
const customerRoutes = require('./customerRoutes');
const expertiseRoutes = require('./expertiseRoutes');

router.use('/customers', customerRoutes);
router.use('/expertises', expertiseRoutes);

module.exports = router;