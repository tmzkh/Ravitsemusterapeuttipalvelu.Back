const router = require('express').Router();
const AuthenticationController = require('../../controllers/authenticationController');

router.route('/')
    .post(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        if (! req.body.username || ! req.body.password)
            return res.sendStatus(400);

        await AuthenticationController.login({
            username: req.body.username,
            password: req.body.password
        }).then((result) => {
            return res.status(200).send(result);
        }).catch((err) => {
            return res.status(401).send(err);
        });
    });

module.exports = router;
