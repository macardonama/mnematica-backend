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

module.exports = {
  registrarAsistencia
};
