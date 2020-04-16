const router = require('express').Router();

router.use('/', (req, res) => {
    res.sendStatus(403);
});

module.exports = router;