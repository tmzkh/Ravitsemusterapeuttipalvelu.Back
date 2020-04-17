const router = require('express').Router();
const AuthenticationController = require('../../controllers/authenticationController');
const AuthenticationMiddleware = require('../../middlewares/authenticationMiddleware');

router.route('/')
    .post(async (req, res) => {
        if (! req.body.username || ! req.body.password)
            return res.sendStatus(400);
        try {
            const result = 
                await AuthenticationController.login({
                    username: req.body.username,
                    password: req.body.password
                });
            if (result == 401) {
                return res.sendStatus(401);
            }
            return res.status(200).send(JSON.stringify(result));
        } catch (error) {
            return res.sendStatus(500);
        }
    })
    .delete(AuthenticationMiddleware, async (req, res) => {
        const auth = req.authentication;
        if (! auth) {return res.sendStatus(200); }
        try {
            await AuthenticationController.logout(req.authentication.accesstoken);
        } catch (err) { console.log(err); }
        return res.sendStatus(200);
    });

router.route('/token')
    .post(AuthenticationMiddleware , async (req, res) => {
        const auth = req.authentication;
        if (! auth) { return res.sendStatus(401); }
        res.sendStatus(200);
    });

module.exports = router;
