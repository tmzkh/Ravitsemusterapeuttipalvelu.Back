const router = require('express').Router();
const bookingController = require('../../controllers/bookingController');
const customerController = require('../../controllers/customerController');
const validateGetQuery = require('../../helpers/validateGetBookingQuery');
const AuthenticationMiddleware = require('../../middlewares/authenticationMiddleware');

router.use(AuthenticationMiddleware);

router.route('/')
/**
 * GET /api/bookings
 */
    .get(async (req, res) => {

        // get authentication object from request (inserted in authentication middleware)
        const auth = req.authentication;

        let includeIdAndCustomerDetails = false;

        // if request is made by dietician, description can be shown
        if (auth && req.query.dieticianId 
            && auth.dieticianId == req.query.dieticianId) 
        {
            includeIdAndCustomerDetails = true;
        }

        res.setHeader('Content-Type', 'application/json');
        const { errors, isValid } = validateGetQuery(req.query);
        if (isValid) {
            try {
                const result = await bookingController.get({
                    dieticianId: req.query.dieticianId,
                    customerId: req.query.customerId,
                    startDate: req.query.startDate, 
                    endDate: req.query.endDate,
                    includeIdAndCustomerDetails: includeIdAndCustomerDetails
                });
                res.send(JSON.stringify(result));
            } catch (err) {
                res.send(JSON.stringify(err));
            }
        } else {
            res.status(400).send({errors: errors});
        }

    })
/**
 * GET /post/bookings
 */
    .post(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        try {
            if (! req.body.customerId) {
                let customer = 
                    await customerController
                        .getOne({
                            id: null,
                            name: null,
                            email: req.body.customer.email
                        }).catch(() => {customer = null});

                if (customer == 404) {
                    customer =
                        await customerController
                            .create(req.body.customer);
                }

                req.body.customerId = customer.id;
            }
            const result = 
                await bookingController.create(req.body);
            res.status(201).send(JSON.stringify(result));
        } catch (err) {
            if (err.name && (err.name === 'SequelizeValidationError' || 
                err.name === 'SequelizeUniqueConstraintError')) {
                let errorObj = {};
                err.errors.forEach(er => {
                    errorObj[er.path] = er.message;
                });
                return res.status(400)
                        .send(JSON.stringify({errors: errorObj}));
            } else if (err.errors) {
                return res.status(400).send(JSON.stringify(err.errors));
            }
            res.sendStatus(500);
        }
    });

router.route('/:id')
/**
 * PUT /api/bookings/{id}
 */
    .put(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        // get authentication object from request (inserted in authentication middleware)
        const auth = req.authentication;

        let includeDescription = false;

        // if request is made by dietician, description can be shown
        if (auth && req.query.dieticianId 
            && auth.dieticianId == req.query.dieticianId) 
        {
            includeDescription = true;
        }

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
/**
 * DELETE /api/bookings/{id}
 */
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