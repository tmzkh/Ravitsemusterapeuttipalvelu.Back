const router = require('express').Router();
const bookingController = require('../../controllers/bookingController');
const knownEntities = require('../../seeders/helpers/knownEntities');
const validateRequest = require('../../helpers/validateBookingQuery');

/**
 * GET /api/bookings
 */
router.route('/')
    .get(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const { errors, isValid } = validateRequest(req.query);
        if (isValid) {
            try {
                const result = await bookingController.get({
                    dieticianId: req.query.dieticianId,
                    customerId: req.query.customerId,
                    startDate: req.query.startDate, 
                    endDate: req.query.endDate,
                    includeCustomer: true,
                    includeDescription: true
                });
                res.send(JSON.stringify(result));
            } catch (err) {
                res.send(JSON.stringify(err));
            }
        } else {
            res.status(400).send({errors: errors});
        }

    })
    .post(async (req, res) => {

        res.setHeader('Content-Type', 'application/json');
        try {
            //console.log(req.body);
            const result = await bookingController.create(req.body);
            res.status(201).send(result);
        } catch (err) {
            if (err.name && (err.name === 'SequelizeValidationError' || 
                err.name === 'SequelizeUniqueConstraintError')) {
                let errorObj = {};
                err.errors.forEach(er => {
                    errorObj[er.path] = er.message;
                });
                return res.status(400)
                        .send(JSON.stringify({errors: errorObj}));
            }
            res.sendStatus(500);
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