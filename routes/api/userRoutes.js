const router = require('express').Router();

const UserController = require('../../controllers/userController');
const DieticianController = require('../../controllers/dieticianController');

const AuthenticationMiddleware = require('../../middlewares/authenticationMiddleware');

router.route('/')
    .post(async (req, res) => {
        try {
            const dietician = await DieticianController.create(req.body);
            const user = 
                await UserController.create({
                    username: dietician.email,
                    password: req.body.password,
                    dieticianId: dietician.id,
                    roleId: 2
                });

        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    });

module.exports = router;