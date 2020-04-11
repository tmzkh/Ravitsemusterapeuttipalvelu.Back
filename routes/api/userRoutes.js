const router = require('express').Router();

const AuthenticationController = require('../../controllers/authenticationController');
const UserController = require('../../controllers/userController');

const AuthenticationMiddleware = require('../../middlewares/authenticationMiddleware');

const validateRegistrationRequest = require('../../helpers/validateRegistrationRequest');


router.route('/')
    .post(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        // validate request (kind of pre-validation, only checks if required fields are there)
        const { isValid, errors } = validateRegistrationRequest(req.body);

        if (! isValid ) {
            return res.status(400).send(JSON.stringify({ errors: errors }));
        }

        try {
            // create user
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
            console.log('userRoute post catch', e);
            res.sendStatus(500);
        }
    })
    .put(
        AuthenticationMiddleware,
        async (req, res) => {
            const auth = req.authentication;

            if (! auth) {
                return res.sendStatus(401);
            }

            if (! req.body.password) {
                return res.status(400)
                    .send(
                        JSON.stringify({errors: { password: "Password is required" }})
                    );
            }

            try {
                const result = 
                    await UserController.update({
                        id: auth.userId,
                        username: auth.username,
                        password: req.body.password,
                    });
                if (result == 404) {
                    return res.sendStatus(404);
                }
                res.sendStatus(200);
            } catch (e) {
                console.log('userRoute put catch', e);
                res.sendStatus(500);
            }
        }
    );

module.exports = router;