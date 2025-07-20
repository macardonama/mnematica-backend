const Observacion = require('../models/Observacion');

exports.registrarObservacion = async (req, res) => {
  try {
    const { grupo, fecha, docente, observacion_general, observaciones_individuales } = req.body;
    const fechaObj = new Date(fecha);

    // Buscar si ya existe una observación para ese grupo, fecha y docente
    let existente = await Observacion.findOne({ grupo, fecha: fechaObj, docente });

    if (existente) {
      // Actualizar o insertar observaciones individuales
      observaciones_individuales.forEach(obsNueva => {
        const index = existente.observaciones_individuales.findIndex(
          obs => obs.nombre_estudiante === obsNueva.nombre_estudiante
        );

        if (index !== -1) {
          // Si ya existe, actualizar
          existente.observaciones_individuales[index] = obsNueva;
        } else {
          // Si no existe, agregar
          existente.observaciones_individuales.push(obsNueva);
        }
      });

      // Opcional: actualizar la observación general si se envía una nueva
      if (observacion_general) {
        existente.observacion_general = observacion_general;
      }

      await existente.save();
      res.status(200).json({ message: 'Observación actualizada con éxito.' });
    } else {
      // Crear una nueva si no existe
      const nueva = new Observacion({
        grupo,
        fecha: fechaObj,
        docente,
        observacion_general,
        observaciones_individuales
      });

      await nueva.save();
      res.status(200).json({ message: 'Observación registrada con éxito.' });
    }

  } catch (error) {
    console.error('Error al guardar observación:', error);
    res.status(500).json({ error: 'Error al guardar observación' });
  }
};

// Obtener todas las observaciones de un estudiante
exports.getObservacionesPorEstudiante = async (req, res) => {
  try {
    const nombre_estudiante = req.params.nombre_estudiante;

    const observaciones = await Observacion.find({
      'observaciones_individuales.nombre_estudiante': nombre_estudiante
    });

    const resultados = observaciones.map(obs => {
      const individual = obs.observaciones_individuales.find(o => o.nombre_estudiante === nombre_estudiante);
      return {
        fecha: obs.fecha,
        docente: obs.docente,
        grupo: obs.grupo,
        nota: individual?.nota ?? null,
        observacion: individual?.observacion ?? ''
      };
    });

    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener observaciones del estudiante.' });
  }
};

// Obtener plantilla de notas por docente, grupo y rango de fechas
exports.getPlantillaNotas = async (req, res) => {
  try {
    const { docente, grupo, desde, hasta } = req.query;

    const observaciones = await Observacion.find({
      docente,
      grupo,
      fecha: { $gte: new Date(desde), $lte: new Date(hasta) }
    });

    // Extraer todas las fechas únicas
    const fechas = [...new Set(observaciones.map(o => o.fecha.toISOString().split('T')[0]))];

    // Extraer estudiantes y organizar por nombre
    const estudiantesMap = {};

    observaciones.forEach(obs => {
      const fechaStr = obs.fecha.toISOString().split('T')[0];
      obs.observaciones_individuales.forEach(ind => {
        if (!estudiantesMap[ind.nombre_estudiante]) {
          estudiantesMap[ind.nombre_estudiante] = {};
        }
        estudiantesMap[ind.nombre_estudiante][fechaStr] = ind.nota ?? null;
      });
    });

    const estudiantes = Object.entries(estudiantesMap).map(([nombre, notas]) => ({
      nombre,
      notas
    }));

    res.json({ fechas, estudiantes });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la plantilla de notas.' });
  }
};
