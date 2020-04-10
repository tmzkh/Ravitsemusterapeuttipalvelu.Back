const router = require('express').Router();
const AuthenticationController = require('../../controllers/authenticationController');

router.route('/')
    .post(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (! req.body.username || ! req.body.password)
            return res.sendStatus(400);
        try {
            const result = 
                await AuthenticationController.login({
                    username: req.body.username,
                    password: req.body.password
                });
            return res.status(200).send(JSON.stringify(result));
        } catch (error) {
            return res.sendStatus(401);
        }
    });

module.exports = router;
