const express = require('express');
const LumiereController = require('../controllers/lumiere_controller');
const LedStateController = require('../controllers/led_state_controller');
const router = express.Router();

router.post('/lumiere', LumiereController.put);
router.get('/lumiere', LumiereController.get);
router.get('/lumiere/latest', LumiereController.latest);

router.get('/led_state', LedStateController.get);
router.post('/led_state', LedStateController.put);
router.put('/led_state', LedStateController.put);

module.exports =  router;
