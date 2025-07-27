const Asistencia = require('../models/Asistencia');

const registrarAsistencia = async (req, res) => {
  try {
    const { docente, grupo, fecha, asistencias } = req.body;

    if (!docente || !grupo || !fecha || !Array.isArray(asistencias)) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios o asistencias no es un array' });
    }

    const asistenciasGuardadas = await Promise.all(
      asistencias.map(async (a) => {
        const nuevaAsistencia = new Asistencia({
          docente,
          grupo,
          fecha,
          nombre_estudiante: a.nombre_estudiante,
          estado: a.estado,
          emocion: a.emocion || null
        });
        return await nuevaAsistencia.save();
      })
    );

    res.status(201).json({ mensaje: 'Asistencias registradas correctamente', asistencias: asistenciasGuardadas });
  } catch (error) {
    console.error('Error al registrar asistencias:', error);
    res.status(500).json({ mensaje: 'Error al registrar asistencias' });
  }
};

const obtenerAsistenciasPorEstudiante = async (req, res) => {
  const nombre = decodeURIComponent(req.params.nombre);
  try {
    const asistencias = await Asistencia.find({ nombre_estudiante: nombre }).sort({ fecha: 1 });
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener asistencias del estudiante', error });
  }
};

// NUEVO 2: Obtener asistencias por nombre de docente (con filtro por fechas)
const obtenerAsistenciasPorDocente = async (req, res) => {
  const nombre = decodeURIComponent(req.query.docente);
  const fechaInicio = req.query.fechaInicio ? new Date(req.query.fechaInicio) : null;
  const fechaFin = req.query.fechaFin ? new Date(req.query.fechaFin) : null;

  const filtro = { docente: nombre };
  if (fechaInicio && fechaFin) {
  filtro.fecha = { $gte: req.query.fechaInicio, $lte: req.query.fechaFin };
}

  try {
    const asistencias = await Asistencia.find(filtro).sort({ fecha: 1 });
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener asistencias del docente', error });
  }
};


module.exports = {
  registrarAsistencia,
  obtenerAsistenciasPorEstudiante,
  obtenerAsistenciasPorDocente
};
