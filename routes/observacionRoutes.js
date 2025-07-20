const express = require('express');
const router = express.Router();
const controller = require('../controllers/observacionController');

router.post('/', controller.registrarObservacion);
router.get('/estudiante/:nombre_estudiante', controller.getObservacionesPorEstudiante);
router.get('/plantilla', controller.getPlantillaNotas);

module.exports = router;
