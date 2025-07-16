const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const asistenciaRoutes = require('./routes/asistenciaRoutes');
const profesorRoutes = require('./routes/profesorRoutes');
const estudianteRoutes = require ('./routes/estudianteRoutes');
const observacionRoutes = require('./routes/observacionRoutes');
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/profesores', profesorRoutes);
app.use('/api/asistencias', asistenciaRoutes);
app.use('/api/observaciones', observacionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
