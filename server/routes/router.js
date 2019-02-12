const express = require('express');
const LumiereController = require('../controllers/lumiere_controller');
const LedStateController = require('../controllers/led_state_controller');
const ApiKeyController = require('./../controllers/api-key-controller');

const router = express.Router();

router.post('/api_key', ApiKeyController.create);
router.delete('/api_key', ApiKeyController.delete);

module.exports =  router;
