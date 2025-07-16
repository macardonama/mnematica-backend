const Observacion = require('../models/Observacion');

exports.registrarObservacion = async (req, res) => {
  try {
    const { grupo, fecha, docente, observacion_general, observaciones_individuales } = req.body;

    const nueva = new Observacion({
      grupo,
      fecha: new Date(fecha),
      docente,
      observacion_general,
      observaciones_individuales
    });

    await nueva.save();
    res.status(200).json({ message: 'Observación registrada con éxito.' });
  } catch (error) {
    console.error('Error al guardar observación:', error);
    res.status(500).json({ error: 'Error al guardar observación' });
  }
};
