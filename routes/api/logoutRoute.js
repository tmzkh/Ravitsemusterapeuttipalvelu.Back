const router = require('express').Router();
const AuthenticationController = require('../../controllers/authenticationController');
const AuthenticationMiddleware = require('../../middlewares/authenticationMiddleware');

router.use(AuthenticationMiddleware);

router.route('/')
    .post(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        const auth = req.authentication;

        if (! auth)
            return res.sendStatus(200);

        try {
            await AuthenticationController.logout(req.authentication.accesstoken);
        } catch (err) {}

        return res.sendStatus(200);
    });

module.exports = router;
