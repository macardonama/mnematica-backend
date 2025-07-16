const mongoose = require('mongoose');

const observacionIndividualSchema = new mongoose.Schema({
  nombre_estudiante: { type: String, required: true },
  observacion: { type: String, required: false, default: ''},
  nota: { type: Number, required: false }
});

const observacionSchema = new mongoose.Schema({
  grupo: { type: String, required: true },
  fecha: { type: Date, required: true },
  docente: { type: String, required: true },
  observacion_general: { type: String },
  observaciones_individuales: [observacionIndividualSchema]
});

module.exports = mongoose.model('Observacion', observacionSchema);
