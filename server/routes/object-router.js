const express = require('express');
const LumiereController = require('../controllers/lumiere_controller');
const LedStateController = require('../controllers/led_state_controller');
const ApiKey = require('../models/api-key');
const resources = require('../utils/resources');

const router = express.Router();

router.use((req, res, next) => {
    const apiKey = req.headers['Authorization'];

    // No api key in headers
    if (!apiKey) {
        return res.status(401).send({ success: false, message: 'No api key provided.' });
    }

    if (apiKey === resources.objectKey) {
        next();
        return;
    }

    res.status(401).send({ success: false, message: 'Wrong api key.' });
});

router.get('/lumiere', LumiereController.get);
router.get('/lumiere/latest', LumiereController.latest);
router.get('/led_state', LedStateController.get);
router.post('/lumiere', LumiereController.put);
router.post('/led_state', LedStateController.put);
router.put('/led_state', LedStateController.put);

module.exports =  router;
