const router = require('express').Router();
const expertiseController = require('../../controllers/expertiseController');

router.route('/')
    .get(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        expertiseController.getAll()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.error(err);
            let errorObj = {};
            if (err.errors) {
                err.errors.forEach(er => {
                    errorObj[er.path] = er.message;
                });
            }
            res.status(500)
                .send(JSON.stringify({errors: errorObj}));
        });
    });

module.exports = router;