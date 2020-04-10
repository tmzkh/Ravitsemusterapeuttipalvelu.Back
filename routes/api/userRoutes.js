const router = require('express').Router();

const AuthenticationController = require('../../controllers/authenticationController');

const AuthenticationMiddleware = require('../../middlewares/authenticationMiddleware');

const validateRegistrationRequest = require('../../helpers/validateRegistrationRequest');


router.route('/')
    .post(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        const { isValid, errors } = validateRegistrationRequest(req.body);

        if (! isValid ) {
            return res.status(400).send(JSON.stringify({ errors: errors }));
        }

        try {
            const result = await AuthenticationController.register(req.body);
            res.status(201).send(JSON.stringify(result));
        } catch (e) {
            let errorObj = {};
            if (e.name && (e.name === 'SequelizeValidationError' || 
                e.name === 'SequelizeUniqueConstraintError')) {
                e.errors.forEach(er => {
                    errorObj[er.path] = er.message;
                });
                return res.status(400)
                        .send(JSON.stringify({errors: errorObj}));
            }
            console.log(e);
            res.sendStatus(500);
        }
    });

module.exports = router;