const router = require('express').Router();
const bookingController = require('../../controllers/bookingController');
const validateBookingDates = require('../../helpers/validateBookingDates');
const validateGetQuery = require('../../helpers/validateGetBookingQuery');

/**
 * GET /api/bookings
 */
router.route('/')
    .get(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const { errors, isValid } = validateGetQuery(req.query);
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
    .put(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        try {
            req.body.id = req.params.id;
            const result = await bookingController.update(req.body);
            res.sendStatus(200);
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
    })
    .delete(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        bookingController
            .delete(req.params.id)
            .then((result) => {
                if (result === 404) {
                    return res.sendStatus(404);
                }
                res.status(204).send("deleted");
            }).catch((err) => {
                res.status(400).send();
            });
    });

module.exports = router;