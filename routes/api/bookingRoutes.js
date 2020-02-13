const router = require('express').Router();
const bookingController = require('../../controllers/bookingController');
const knownEntities = require('../../seeders/helpers/knownEntities');

/**
 * GET /api/bookings
 */
router.route('/')
    .get(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        try {
            const result = await bookingController.get({
                dieticianId: knownEntities.diet1.id,
                customerId: knownEntities.cust1.id,
                includeCustomer: true,
                includeDietician: true
            });
            res.send(result);
        } catch (err) {
            res.send(JSON.stringify(err));
        }
    });

module.exports = router;