const mongoose = require('mongoose');

const asistenciaSchema = new mongoose.Schema({
  docente: String,
  grupo: String,
  fecha: String,
  nombre_estudiante: String,
  estado: String,
  emocion: String
});

module.exports = mongoose.model('Asistencia', asistenciaSchema);
