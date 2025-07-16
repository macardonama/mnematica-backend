const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  nombre_estudiante: { type: String, required: true },
  grado: { type: String, required: true },
  fecha_nacimiento: { type: String, default: "" },
  hito: { type: String, default: "" }
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
