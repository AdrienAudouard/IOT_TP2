const express = require('express');
const LumiereController = require('../controllers/lumiere_controller');

const router = express.Router();

router.post('/lumiere', LumiereController.latest);
router.get('/lumiere', LumiereController.latest);
router.get('/lumiere/latest', LumiereController.latest);

module.exports =  router;
