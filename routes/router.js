const router = require('express').Router();
const apiRoutes = require('./api/index');

router.use('/api', apiRoutes);

// for invalid routes send 404
router.use('/*', (req, res) => {
    res.status(404).send();
});

module.exports = router;