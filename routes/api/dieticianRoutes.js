const router = require('express').Router();
const dieticianController = require('../../controllers/dieticianController');
const authMiddleware = require('../../middlewares/auth');

router.route('/')   
    .get(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (!req.body.searchparams) {
            dieticianController
            .getAll()
            .then((result) => {
                res.send(result);
            }).catch((err) => {
                //console.error(err);
                let errorObj = {};
                if (err.errors) {
                    err.errors.forEach(er => {
                        errorObj[er.path] = er.message;
                    });
                }
                res.status(500)
                    .send(JSON.stringify({errors: errorObj}));
            });
        } else {
            const searchquery = 
                req.body.searchparams.query != null
                ? req.body.searchparams.query
                : "";

            const expertiseIds = 
                req.body.searchparams.expertises
                ? req.body.searchparams.expertises
                : [];

            dieticianController
                .getFiltered({
                    query: searchquery,
                    expertiseIds: expertiseIds
                }).then((result) => {
                    res.send(result);
                }).catch((err) => {
                    res.send(JSON.stringify(err));
                });
        }
    })
    .post(async (req, res) => {
        dieticianController
            .create(req.body)
            //console.log(req.body)
            .then((result) => {
                res.setHeader('Content-Type', 'application/json');
                res
                .status(201)
                .send(result);
            }).catch(err => {
                let errorObj = {};
                res.setHeader('Content-Type', 'application/json');
                if (err.name && (err.name === 'SequelizeValidationError' || 
                    err.name === 'SequelizeUniqueConstraintError')) {
                    err.errors.forEach(er => {
                        errorObj[er.path] = er.message;
                    });
                    return res.status(400)
                            .send(JSON.stringify({errors: errorObj}));
                }
                res.status(500).send("asd");
            });
    });

router.route('/:id', )
    .get(async (req, res) => {
        if (!checkIfIdIsUuid(req, res)) return;
        res.setHeader('Content-Type', 'application/json');
        dieticianController
            .getOne({id: req.params.id})
            .then((result) => {
                if (result === 404) {
                    return res.sendStatus(404);
                }
                res.status(200)
                    .send(result);
            }).catch((err) => {
                //console.error(err);
                res.status(500)
                    .send();
            });
    })
    .put(async (req, res) => {
        if (!checkIfIdIsUuid(req, res)) return;
        res.setHeader('Content-Type', 'application/json');
        dieticianController
            .update({
                id: req.params.id,
                name: req.body.name,
                email: req.body.email
            }).then((result) => {
                if (result === 404) {
                    return res.sendStatus(404);
                }
                res.status(200)
                    .send(result);
            }).catch((err) => {
                console.log("tulee routen catchiin");
                //console.error(err);
                let errorObj = {};
                if (err.name && (err.name === 'SequelizeValidationError' || 
                    err.name === 'SequelizeUniqueConstraintError')) {
                    err.errors.forEach(er => {
                        errorObj[er.path] = er.message;
                    });
                    return res.status(400)
                            .send(JSON.stringify({errors: errorObj}));
                }
                res.status(500)
                    .send();
            });
    })
    .delete(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (!checkIfIdIsUuid(req, res)) return;
        dieticianController
            .delete(req.params.id)
            .then((result) => {
                if (result === 404) {
                    return res.sendStatus(404);
                }
                res.status(204).send("deleted");
            }).catch((err) => {
                res.status(400).send();
            });
    });

checkIfIdIsUuid = (req, res) => {
    const exp = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    if (!exp.test(req.params.id)) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400)
            .send(JSON.stringify({
                errors: {
                    id: "Id must be UUID"
                }
            }));
        return false;
    }
    return true;
}

module.exports = router;