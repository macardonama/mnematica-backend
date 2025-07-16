const Estudiante = require('../models/Estudiante');

exports.obtenerEstudiantes = async (req, res) => {
  const estudiantes = await Estudiante.find();
  res.json(estudiantes);
};

exports.crearEstudiante = async (req, res) => {
  const nuevo = new Estudiante(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
};

exports.actualizarEstudiante = async (req, res) => {
  const actualizado = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
};

exports.eliminarEstudiante = async (req, res) => {
  await Estudiante.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Estudiante eliminado' });
};
