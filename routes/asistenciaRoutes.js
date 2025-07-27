const express = require('express');
const router = express.Router();
const { registrarAsistencia, obtenerAsistenciasPorDocente, obtenerAsistenciasPorEstudiante } = require('../controllers/asistenciaController');

// Asegúrate de que esto es una función, no un objeto
router.post('/', registrarAsistencia);
router.get('/estudiante/:nombre', obtenerAsistenciasPorEstudiante);
router.get('/docente', obtenerAsistenciasPorDocente);
module.exports = router;
