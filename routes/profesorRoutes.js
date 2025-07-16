const express = require('express');
const router = express.Router();
const Profesor = require('../models/profesorModel');

// GET /api/profesores
router.get('/', async (req, res) => {
  try {
    const profesores = await Profesor.find();
    res.json(profesores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
