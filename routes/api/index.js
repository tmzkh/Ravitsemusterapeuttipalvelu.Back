const router = require('express').Router();
const customerRoutes = require('./customerRoutes');
const expertiseRoutes = require('./expertiseRoutes');
const bookingRoutes = require('./bookingRoutes');

router.use('/customers', customerRoutes);
router.use('/expertises', expertiseRoutes);
router.use('/bookings', bookingRoutes);

module.exports = router;