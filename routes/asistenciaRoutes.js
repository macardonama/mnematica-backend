const express = require('express');
const router = express.Router();
const { registrarAsistencia } = require('../controllers/asistenciaController');

// Asegúrate de que esto es una función, no un objeto
router.post('/', registrarAsistencia);

module.exports = router;
