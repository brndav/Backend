const router = require ("express").Router();
const Imagenes = require ( "../model/imagenes");
const express = require('express');
const app = express();
const { Op } = require('sequelize');


router.get('/consulta',async(req,res)=>{
  const consulta = await Imagenes.findAll()
  res.json(consulta)
})

router.get('/consulta/:nom', async (req, res) => {
  const imagenes = await Imagenes.findAll({
    attributes: ['id_imagen', 'titulo'], // solo necesitamos el ID y el nombre
  });
  res.json(imagenes);
});

 router.post("/crear", async (req, res) => {
        const datos = req.body;
      
        try {
          // Obtener el último ID y sumarle 1
          const ultimoImagen = await Imagenes.findOne({
            order: [["id_imagen", "DESC"]],
          });
      
          let nuevoRegistro = 1; // Valor inicial si no hay RegistroUsuario en la base de datos
      
          if (ultimoImagen) {
            nuevoRegistro = ultimoImagen.id_imagen + 1;
          }
      
          // Crear el nuevo perfil con el ID calculado
          const nuevoImagen= await Imagenes.create({
            id_imagen: nuevoRegistro,
            titulo: datos.titulo,
            imagen: datos.imagen,
            id_evento: datos.id_evento,
          });
      
          res.status(201).json({
            ok: true,
            status: 201,
            message: "Imagen creado correctamente",
            body: nuevoImagen,
          });
        } catch (error) {
          console.error("Error al crear Imagen", error);
          res
            .status(500)
            .json({ error: "Error interno del servidor al crear dia evento " });
        }
      });

      router.put('/actualizar/:id_imagen', async (req, res) => {
        const id = req.params.id_imagen;
        const datos = req.body;
        try {
            const update = await Imagenes.update({
              id_evento: datos.id_evento,
              titulo: datos.titulo,  
              imagen: datos.imagen,
           
            }, {
                where: {
                    id_imagen: id,
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Imagen evento actualizado correctamente',
                body: update
            });
        } catch (error) {
            console.error('Error al actualizar Imagen', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
    

      router.delete("/eliminar/:id_imagen", async (req, res) => {
        const id = req.params.id_imagen;
        try {
          // Asegúrate de que la columna primaria
          const borrar = await Imagenes.destroy({
            where: {
              id_imagen: id, // Usa solo la columna primaria para la búsqueda
            },
          });
      
          if (borrar) {
            res.status(204).json({
              ok: true,
              status: 204,
              message: "Imagen Eliminado correctamente",
              body: borrar,
            });
          } else {
            res.status(404).json({
              ok: false,
              status: 404,
              message: "Imagen no encontrado",
            });
          }
        } catch (error) {
          console.error("Error al eliminar imagen", error);
          res.status(500).json({ error: "Error interno del servidor" });
        }
      });


      //////////filtracion por evento vista admin
      router.get('/consulta/imagens', async (req, res) => {
        try {
            const idEvento = req.query.id_evento; // Obtener el id_perfil de la consulta
    
            // Si no se proporciona id_perfil
            if (!idEvento) {
                return res.status(400).json({ msg: 'ID de evento no proporcionado' });
            }
            // Realiza la consulta en la base de datos con el id_perfil
            const asignaciones = await Imagenes.findAll({
                where: { id_evento: idEvento },  // Filtra por id_evento
                atributes:['id_imagen','titulo','imagen'],
                include: [
                    {
                        model: require("../model/evento"),
                        as: 'evento',
                        attributes: ['id_evento', 'nombre'] 
                    },
                ],
            });
    
            res.json(asignaciones); 
        } catch (error) {
            console.error("Error al obtener las asignaciones", error);
            res.status(500).json({ msg: "Error del servidor" });
        }
    });
    

    //////////filtraccion de imagenes por evento para la vista admin de detallesevento
    router.get('/filtrar/imagens/:id_evento', async (req, res) => {
      const { id_evento } = req.params;
      try {
        const imagenes = await Imagenes.findAll({
          where: { id_evento },
        });
        res.json(imagenes);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener imágenes' });
      }
    });
    

/////////////////filtracion de imagen de slider oficial de cada evento para el encabezado 
router.get('/filtrar/slider/:id_evento', async (req, res) => {
  const { id_evento } = req.params;

  try {
    // Buscar imágenes del slider asociadas al evento e incluir datos del evento
    const imagenSlider = await Imagenes.findAll({
      where: {
        id_evento,
        titulo: {
          [Op.like]: 'slider%'  
        }
      },
      include: [
        {
          model: require("../model/evento"),
          as: 'evento',
          attributes: ['id_evento', 'nombre']
        }
      ]
    });

    // Si hay imágenes, extraer el evento de la primera imagen y enviar la respuesta
    if (imagenSlider.length > 0) {
      const respuesta = {
        evento: {
          id_evento: imagenSlider[0].evento.id_evento,
          nombre: imagenSlider[0].evento.nombre
        },
        imagenes: imagenSlider.map(imagen => ({
          id_imagen: imagen.id_imagen,
          imagen: imagen.imagen,
          titulo: imagen.titulo.replace(/\s/g, '') // Elimina espacios en el título
        }))
      };
      return res.json(respuesta);
    }

    // Si no hay imágenes, buscar el evento para devolver su nombre
    const Evento = require("../model/evento");
    const evento = await Evento.findByPk(id_evento, {
      attributes: ['id_evento', 'nombre']
    });

    if (!evento) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }

    // Responder con el evento y un array vacío de imágenes
    res.json({
      evento: {
        id_evento: evento.id_evento,
        nombre: evento.nombre
      },
      imagenes: []
    });

  } catch (error) {
    console.error("Error al obtener slider del evento:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});





    module.exports = router;