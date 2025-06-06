const router = require ("express").Router();
const MesaDirectiva = require ( "../model/mesa_directiva");
const Usuarios = require ( '../model/usuario.model');
const express = require('express');
const app = express();

// Obtener todos los registros de mesa directiva con datos del usuario
router.get('/consulta', async (req, res) => {
    try {
      const registros = await MesaDirectiva.findAll({
        include: [
          {
            model: Usuarios,
            attributes: ['nombre', 'paterno', 'materno', 'correo']
          }
        ]
      });
      res.json(registros);
    } catch (error) {
      console.error('Error al obtener la mesa directiva:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Crear un nuevo registro en mesa directiva
  router.post('/crear', async (req, res) => {
    try {
      const { idusuario, puesto,foto } = req.body;
  
      // Verificar que el usuario exista
      const usuario = await Usuarios.findByPk(idusuario);
      if (!usuario) {
        return res.status(400).json({ error: 'El usuario no existe' });
      }
  
      const nuevo = await MesaDirectiva.create({
        idusuario,
        puesto,
        foto
      });
  
      res.status(201).json(nuevo);
    } catch (error) {
      console.error('Error al crear registro en mesa directiva:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Actualizar un registro de mesa directiva (por ID de la tabla mesa_directiva)
  router.put('/actualizar/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { idusuario, puesto, foto } = req.body;
  
      const registro = await MesaDirectiva.findByPk(id);
      if (!registro) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
  
      // Si mandas un nuevo idusuario, verificas que exista
      if (idusuario) {
        const usuario = await Usuarios.findByPk(idusuario);
        if (!usuario) {
          return res.status(400).json({ error: 'El usuario no existe' });
        }
        registro.idusuario = idusuario;
      }
  
      if (puesto !== undefined) {
        registro.puesto = puesto;
      }
      // Actualiza la foto si viene en el body
      if (foto !== undefined) {
        registro.foto = foto;
      }
  
      await registro.save();
      res.json(registro);
    } catch (error) {
      console.error('Error al actualizar registro en mesa directiva:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Eliminar un registro de mesa directiva
  router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
        const resultado = await MesaDirectiva.destroy({ where: { id_mesadir: id } });
  
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