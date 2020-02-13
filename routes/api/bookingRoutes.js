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
                includeDietician: true,
                includeDescription: true
            });
            res.send(result);
        } catch (err) {
            res.send(JSON.stringify(err));
        }
    })
    .post(async (req, res) => {

        res.setHeader('Content-Type', 'application/json');
        try {
            //console.log(req.body);
            const result = bookingController.create(req.body);
            res.status(201).send(result);
        } catch (err) {
            //console.log(err);
            res.send(JSON.stringify(err));
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        try {
            const result = await bookingController.getOne({
                id: req.params.id,
                includeCustomer: true,
                includeDietician: true,
                includeDescription: true
            });
            res.send(result);
        } catch (err) {
            res.send(JSON.stringify(err));
        }
    });

module.exports = router;