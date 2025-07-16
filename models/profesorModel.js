const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
  nombre_docente: { type: String, required: true },
  materia: { type: String }
});

module.exports = mongoose.model('Profesor', profesorSchema,'profesores');
