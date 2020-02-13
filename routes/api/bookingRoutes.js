const router = require('express').Router();
const bookingController = require('../../controllers/bookingController');

router.route('/')
    .get(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        try {
            const result = await bookingController.get({
                dieticianId: 'b5e2692c-82c9-45e1-8ea5-c44f378ccba3',

            });
            res.send(result);
        } catch (err) {
            res.send(JSON.stringify(err));
        }
    });