const sequelize = require('sequelize');
const router = require('express').Router();
const customerController = require('../../controllers/customerController');

router.get('/', async (req, res) => {
    customerController
        .getAll()
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
            res.status(500).send({errors: errorObj});
        });
});

router.post('/', async (req, res) => {
    customerController
        .create(req.body)
        .then((result) => {
            res.status(201).send(result);
        }).catch(err => {
            console.log("asdf");
            console.error(err);
            let errorObj = {};
            if (err.name && (err.name === 'SequelizeValidationError' || 
                err.name === 'SequelizeUniqueConstraintError')) {
                err.errors.forEach(er => {
                    errorObj[er.path] = er.message;
                });
            }
            res.status(500).send({ errors: errorObj });
            res.status(400).send("asd");
        });
});

router.get('/:id', async (req, res) => {
    const exp = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    if (!exp.test(req.params.id))
        return res.status(400).send(JSON.stringify({
            errors: {
                id: "Id must be UUID"
            }
        }));
    customerController
        .getOne(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            console.error(error);
            res.status(500).send();
        });
});

module.exports = router;