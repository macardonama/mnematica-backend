const express = require('express');
const router = express.Router();
const controller = require('../controllers/observacionController');

router.post('/', controller.registrarObservacion);

module.exports = router;
