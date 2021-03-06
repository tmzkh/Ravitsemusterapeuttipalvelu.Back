const router = require('express').Router();
const dieticianController = require('../../controllers/dieticianController');
const dieticianExpertiseController = require('../../controllers/dieticianExpertiseController');
const AuthenticationMiddleware = require('../../middlewares/authenticationMiddleware');
const getDieticiansQueryParser = require('../../helpers/getDieticiansQueryParser');
const updateRequestFormatter = require('../../helpers/validateAndFormatUpdateDieticianRequest');

router.use(AuthenticationMiddleware);

router.route('/')   
    .get(async (req, res) => {
        // get authentication object from request (inserted in authentication middleware)
        const auth = req.authentication;

        if (! req.query.expertises && ! req.query.query && ! req.query.isPending) {
            return res.sendStatus(400);
        } else {
            // parse query
            const { 
                error, 
                searchQuery, 
                expertiseIds, 
                showPending
            } = getDieticiansQueryParser(req.query);

            // if parser returns errors, send them to front end
            if (error)
                return res.status(400)
                    .send(JSON.stringify({ errors: { error } }));

            try {
                // fetch array of dieticians with filters
                const result = 
                    await dieticianController.getFiltered({
                        query: searchQuery,
                        expertiseIds: expertiseIds,
                        showPending: (auth && auth.role == 'admin') ? (true && showPending) : false,
                        showPendingValue: (auth && auth.role == 'admin') ? true : false
                    });
                return res.send(JSON.stringify(result));
            } catch (err) {
                return res.sendStatus(500);
            }
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        const auth = req.authentication;

        let includeIsPending = false;

        // admin and dietician itself get to know if status is pending
        if (auth && auth.role) {
            if (auth.role == 'admin') {
                includeIsPending = true;
            } else if (auth.dieticianId == req.params.id) {
                includeIsPending = true;
            }
        }

        try {
            const result = 
                await dieticianController.getOne({
                    id: req.params.id,
                    includeIsPending: includeIsPending
                });
            if (result === 404) {
                return res.sendStatus(404);
            }
            res.status(200)
                .send(JSON.stringify(result));
        } catch (error) {
            return res.sendStatus(500);
        }
    })
    .put(async (req, res) => {
        // get authentication object from request (inserted in authentication middleware)
        const auth = req.authentication;

        // if there are no auth object (no accesstoken passed)
        if (! auth || ! auth.role) {
            return res.sendStatus(401);
        }

        // move id to body object
        req.body.id = req.params.id;

        // parse request body, and extract object for updating
        let { error, updateObj } 
            = updateRequestFormatter({ auth: auth, body: req.body });

        // if parser returns error, return errors
        if (error) {
            if (error == 'unauthorized') {
                return res.sendStatus(401);
            } else {
                return res.status(400).send(JSON.stringify(error));
            }
        }

        // extract expertises array from update object and delete property
        let expertises;
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

            // if result is 404, there is no dietician with given id and return 404
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

            return res.status(200).send(JSON.stringify(result));
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
            return res.sendStatus(500);
        }
    })
    .delete(async (req, res) => {
        const auth = req.authentication;
        // only admin or dietician itself can ask deleting
        if (auth && (auth.role == 'admin' || auth.dieticianId == req.params.id)) {
            try {
                const result = await dieticianController.delete(req.params.id);
                if (result === 404) {
                    return res.sendStatus(404);
                }
                return res.sendStatus(204);
            } catch (err) {
                return res.sendStatus(400);
            }
        }
        // if there are no auth object (no accesstoken passed)
        return res.sendStatus(401);
    });

module.exports = router;