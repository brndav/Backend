const router= require ("express").Router();
const Autor = require ("../model/autores");
const Usuarios = require ("../model/usuario")
const express = require ("express");
require('../model/asociacion');
const app = express();
const Registro = require("../model/registro");
require('../model/asociacionre-au');

 

router.post('/crear', async (req, res) => {
  const { idusuario, id_registros } = req.body;

  if (!idusuario || !id_registros) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  try {
  
    const nuevoAutor = await Autor.create({ idusuario, id_registros });

    res.status(201).json({
      ok: true,
      message: 'Autor creado correctamente',
      data: nuevoAutor
    });
  } catch (error) {
    console.error('Error al crear autor:', error);
    res.status(500).json({ message: 'Error al crear autor' });
  }
});
  
  
  router.get("/detalles/:id_registros", async (req, res) => {
    const { id_registros } = req.params;
    
    try {
      const autores = await Autor.findAll({
        where: { id_registros }, 
        include: [
          {
            model: Usuarios,
            attributes: ['nombre', 'paterno', 'materno']  
          }
        ]
      });
  
      res.json({
        ok: true,
        data: autores
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Error al obtener los autores',
        error: error.message
      });
    }
  });
  
 

  router.delete('/eliminar/:id_autores', async (req, res) => {
    const { id_autores } = req.params;
  
    try {
      const resultado = await Autor.destroy({
        where: { id_autores }
      });
  
      if (resultado) {
        res.json({
          ok: true,
          message: 'Autor eliminado correctamente'
        });
      } else {
        res.status(404).json({
          ok: false,
          message: 'Autor no encontrado'
        });
      }
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Error al eliminar autor',
        error: error.message
      });
    }
  });




/////////CONSULTA PARA DETALLES TABLA ADMINISTRADOR MUESTRA SOLO LOS REGISTROS CON AUTORES
router.get('/consulta/todos', async (req, res) => {
  try {
      const consulta = await require('../model/registro').findAll({
          attributes: [
              'id_registros','titulo', 'resumen', 
              
          ],
          include: [
              {
                  model: require('../model/usuario'),
                  as: 'usuario', // Usuario que creó el registro
                  attributes: ['nombre', 'paterno', 'materno']
              },
              {
                  model: require('../model/perfil'),
                  as: 'perfil', // Perfil del registro
                  attributes: ['perfiles']
              },
              {
                  model: require('../model/linea_eje'),
                  as: 'linea_eje', // Línea de eje del registro
                  attributes: ['id_eje', 'id_linea']
              },
              {
                  model: require('../model/mod_expo'),
                  as: 'modalidad', // Modalidad del registro
                  attributes: ['descripcion'],
              },
              // Aquí incluimos el modelo autores para traer todos los autores relacionados al registro
              {
                  model: require('../model/autores'),
                  as: 'autores',
                  attributes: ['id_autores', 'idusuario'],
                  required: true, // Solo trae registros que tengan autores
                  include: [
                      {
                          model: require('../model/usuario'),
                          as: 'usuario', // Usuario que es autor del registro
                          attributes: ['nombre', 'paterno', 'materno']
                      }
                  ]
              }
          ]
      });

      if (consulta.length > 0) {
          res.json(consulta);
      } else {
          res.status(404).json({ message: "No se encontraron registros con autores." });
      }
  } catch (error) {
      console.error("Error al realizar la consulta:", error);
      res.status(500).json({ message: "Error en la consulta.", error });
  }
});


module.exports = router;
