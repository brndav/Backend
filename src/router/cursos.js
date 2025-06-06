const express = require('express');
const router = express.Router();
const Curso = require('../model/cursos');

// Obtener todos los cursos (GET)
router.get('/consulta', async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.json(cursos);
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crear un nuevo curso (POST)
router.post('/crear', async (req, res) => {
  try {
    const { titulo, imagen, fecha_inicio, link } = req.body;
    const nuevoCurso = await Curso.create({
      titulo,
      imagen,
      fecha_inicio,
      link
    });
    res.status(201).json(nuevoCurso);
  } catch (error) {
    console.error('Error al crear curso:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar un curso (PUT)
router.put('/actualizar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, imagen, fecha_inicio, link } = req.body;

    const curso = await Curso.findByPk(id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    curso.titulo = titulo || curso.titulo;
    curso.imagen = imagen || curso.imagen;
    curso.fecha_inicio = fecha_inicio || curso.fecha_inicio;
    curso.link = link || curso.link;

    await curso.save();
    res.json(curso);
  } catch (error) {
    console.error('Error al actualizar curso:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar un curso (DELETE)
router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
        const resultado = await Curso.destroy({ where: { id_curso: id } });
  
        if (resultado === 0) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
  
        res.status(200).json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar registro', error);
        res.status(500).json({ error: 'Error al eliminar el registro' });
    }
  });

module.exports = router;