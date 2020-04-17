const router = require('express').Router();

const authRoute = require('./authRoutes');
const userRoutes = require('./userRoutes');
const customerRoutes = require('./customerRoutes');
const expertiseRoutes = require('./expertiseRoutes');
const bookingRoutes = require('./bookingRoutes');
const dieticianRoutes = require('./dieticianRoutes');

router.use((req, res, next) => {
    // all api responses are application/json
    res.setHeader('Content-Type', 'application/json');
    next();
});

router.use('/auth', authRoute);
router.use('/users', userRoutes);

router.use('/customers', customerRoutes);
router.use('/expertises', expertiseRoutes);
router.use('/bookings', bookingRoutes);
router.use('/dieticians', dieticianRoutes);

module.exports = router;