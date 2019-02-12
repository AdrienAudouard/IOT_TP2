const express = require('express');
const LumiereController = require('../controllers/lumiere_controller');
const LedStateController = require('../controllers/led_state_controller');
const router = express.Router();

router.use((req, res, next) => {
    const apiKey =req.header['x-api-key'];

    // No api key in headers
    if (!apiKey) {
        return res.status(401).send({ success: false, message: 'No api key provided.' });
    }

    if (apiKey !== 'test') {
        return res.status(401).send({ success: false, message: 'Wrong api key.' });
    }

    next();
});

router.get('/lumiere', LumiereController.get);
router.get('/lumiere/latest', LumiereController.latest);
router.get('/led_state', LedStateController.get);

module.exports =  router;
