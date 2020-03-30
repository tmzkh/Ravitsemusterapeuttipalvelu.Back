const router = require('express').Router();

const loginRoute = require('./loginRoute');
const customerRoutes = require('./customerRoutes');
const expertiseRoutes = require('./expertiseRoutes');
const bookingRoutes = require('./bookingRoutes');
const dieticianRoutes = require('./dieticianRoutes');

router.use('/login', loginRoute);

router.use('/customers', customerRoutes);
router.use('/expertises', expertiseRoutes);
router.use('/bookings', bookingRoutes);
router.use('/dieticians', dieticianRoutes);

module.exports = router;