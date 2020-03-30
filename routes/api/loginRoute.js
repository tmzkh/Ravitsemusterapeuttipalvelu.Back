const router = require('express').Router();
const AuthenticationController = require('../../controllers/authenticationController');

router.route('/')
    .post(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        if (! req.body.username || ! req.body.password)
            return res.sendStatus(400);

        const success = await AuthenticationController.login({
            username: req.body.username,
            password: req.body.password
        });
        if (success)
            return res.sendStatus(200);

        return res.sendStatus(401);
    });

module.exports = router;
