const router = require('express').Router();
const dieticianController = require('../../controllers/dieticianController');
const dieticianExpertiseController = require('../../controllers/dieticianExpertiseController');
const AuthenticationMiddleware = require('../../middlewares/authenticationMiddleware');
const getDieticiansQueryParser = require('../../helpers/getDieticiansQueryParser');
const updateRequestFormatter = require('../../helpers/validateAndFormatUpdateDieticianRequest');

router.use(AuthenticationMiddleware);

router.route('/')   
    .get(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        // get authentication object from request (inserted in authentication middleware)
        const auth = req.authentication;

        if (! req.query.expertises && ! req.query.query && ! req.query.isPending) {
            return res.send(400);
        } else {

            // const auth = req.authentication;

            const { 
                error, 
                searchQuery, 
                expertiseIds, 
                showPending
            } = getDieticiansQueryParser(req.query);

            if (error)
                return res.status(400)
                    .send(JSON.stringify({errors: { error }}));

            dieticianController
                .getFiltered({
                    query: searchQuery,
                    expertiseIds: expertiseIds,
                    showPending: (auth && auth.role == 'admin') ? (true && showPending) : false,
                    showPendingValue: (auth && auth.role == 'admin') ? true : false
                }).then((result) => {
                    res.send(JSON.stringify(result));
                }).catch((err) => {
                    res.send(JSON.stringify(err));
                });
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        const auth = req.authentication;
        let includeIsPending = false;

        if (auth && auth.role) {
            if (auth.role == 'admin') {
                includeIsPending = true;
            } else if (auth.dieticianId == req.params.id) {
                includeIsPending = true;
            }
        }

        dieticianController
            .getOne({
                id: req.params.id,
                includeIsPending: includeIsPending
            })
            .then((result) => {
                if (result === 404) {
                    return res.sendStatus(404);
                }
                res.status(200)
                    .send(JSON.stringify(result));
            }).catch((err) => {
                //console.error(err);
                res.status(500)
                    .send();
            });
    })
    .put(async (req, res) => {

        res.setHeader('Content-Type', 'application/json');

        // get authentication object from request (inserted in authentication middleware)
        const auth = req.authentication;

        if (! auth || ! auth.role) {
            return res.sendStatus(401);
        }

        // move id to body object
        req.body.id = req.params.id;

        let { error, updateObj } = updateRequestFormatter({ auth: auth, body: req.body });
        let expertises;

        if (error) {
            if (error == 'unauthorized') {
                return res.sendStatus(401);
            } else {
                return res.status(400).send(JSON.stringify(error));
            }
        }

        if (updateObj.expertises) {
            expertises = updateObj.expertises;
            delete updateObj.expertises;
        }

        try {
            // update dietician entity
            let result = 
                await dieticianController.update({
                    id: req.params.id, 
                    updateObj: updateObj
                });

            if (result === 404) {
                return res.sendStatus(404);
            }

            // if request contains expertises array
            if (expertises) {
                // first clear old ones
                let exResult = 
                    await dieticianExpertiseController.clearAll(req.params.id);
                
                // then add new array of expertises
                exResult = 
                    await dieticianExpertiseController.addArr({
                        dieticianId: req.params.id,
                        expertisesArr: expertises
                    });
                
                if (exResult === 404) {
                    return res.sendStatus(404);
                }
                // fetch final updated entity (with updated expertises)
                result = await dieticianController.getOne({id: req.params.id});
            }

            res.status(200).send(JSON.stringify(result));
        } catch (err) {
            let errorObj = {};
            if (err.name && (err.name === 'SequelizeValidationError' || 
                err.name === 'SequelizeUniqueConstraintError')) {
                err.errors.forEach(er => {
                    errorObj[er.path] = er.message;
                });
                return res.status(400)
                        .send(JSON.stringify({errors: errorObj}));
            }
            res.status(500).send();
        }
    })
    .delete(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        const auth = req.authentication;

        if (auth && (auth.role == 'admin' || auth.dieticianId == req.params.id)) {
            dieticianController
            .delete(req.params.id)
            .then((result) => {
                if (result === 404) {
                    return res.sendStatus(404);
                }
                res.status(204).send("deleted");
            }).catch((err) => {
                return res.status(400).send();
            });
        }

        return res.sendStatus(401);

    });

module.exports = router;