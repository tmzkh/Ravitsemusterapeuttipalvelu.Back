const router = require('express').Router();
const bookingController = require('../../controllers/bookingController');
const customerController = require('../../controllers/customerController');
const validateGetQuery = require('../../helpers/validateGetBookingQuery');
const AuthenticationMiddleware = require('../../middlewares/authenticationMiddleware');
const moment = require('moment');
const sequelize = require('sequelize');

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
            && auth.dieticianId == req.query.dieticianId) {
            includeIdAndCustomerDetails = true;
        }
        // parse request query 
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
                if (result == 400) {
                    return res.sendStatus(400);
                }
                res.send(JSON.stringify(result));
            } catch (err) {
                res.sendStatus(500);
            }
        } else {
            // if parsed query had errors, return errors
            res.status(400).send({errors: errors});
        }

    })
    /**
     * GET /post/bookings
     */
    .post(async (req, res) => {
        try {
            if (req.body.startsAt) {
                const sd = moment.utc(req.body.startsAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true);
                if (sd == 'Invalid date' || moment.utc().isAfter(sd)) {
                    let errorItem = [];
                    errorItem.push(new sequelize.ValidationErrorItem("Invalid date time or date time is before present", null, "startsAt"));
                    throw new sequelize.ValidationError('asdfewqr', errorItem);
                }
            }

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
            return res.status(201).send(JSON.stringify(result));
        } catch (err) {
            //console.log(err);
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
            return res.sendStatus(500);
        }
    });

router.route('/:id')
    /**
     * PUT /api/bookings/{id}
     */
    .put(async (req, res) => {
        // get authentication object from request (inserted in authentication middleware)
        const auth = req.authentication;

        let includeDescription = false;

        // if request is made by dietician, description can be shown
        if (auth && req.query.dieticianId 
            && auth.dieticianId == req.query.dieticianId) {
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
        // get authentication object from request (inserted in authentication middleware)
        const auth = req.authentication;

        try {
            if (auth && auth.dieticianId) {
                const result = 
                    await bookingController.delete({
                        id: req.params.id,
                        dieticianId: auth.dieticianId
                    });
                if (result === 404) {
                    return res.sendStatus(404);
                }
                return res.sendStatus(204);
            } else if (req.query.email) {
                const customer = 
                    await customerController.getOne({
                        email: req.query.email
                    });
                if (customer) {
                    const result = 
                        await bookingController.delete({
                            id: req.params.id,
                            customerId: customer.id
                        });
                    if (result === 404) {
                        return res.sendStatus(404);
                    }
                    return res.sendStatus(204);
                }
            }
            return res.sendStatus(400);
        } catch (err) {
            console.log("booking route catch", err);
            return res.sendStatus(500);
        }
    });

module.exports = router;