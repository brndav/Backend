const router = require ("express").Router();
const Detalles_evento = require ( "../model/detalles_evento");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
  const consulta = await Detalles_evento.findAll()
  res.json(consulta)
})



    router.post("/crear", async (req, res) => {
        const datos = req.body;
      
        try {
          // Obtener el último ID y sumarle 1
          const ultimoDetalleEvento = await Detalles_evento.findOne({
            order: [["id_detalles_evento", "DESC"]],
          });
      
          let nuevoRegistro = 1; // Valor inicial si no hay RegistroUsuario en la base de datos
      
          if (ultimoDetalleEvento) {
            nuevoRegistro = ultimoDetalleEvento.id_detalles_evento + 1;
          }
      
          // Crear el nuevo perfil con el ID calculado
          const nuevoDetalleEvento = await Detalles_evento.create({
            id_detalles_evento: nuevoRegistro,
            id_evento: datos.id_evento,
            id_imagen: datos.id_imagen,
            titulo: datos.titulo,
            descripcion: datos.descripcion,
          });
      
          res.status(201).json({
            ok: true,
            status: 201,
            message: "Detalles del evento creado correctamente",
            body: nuevoDetalleEvento,
          });
        } catch (error) {
          console.error("Error al crear dia Evento", error);
          res
            .status(500)
            .json({ error: "Error interno del servidor al crear dia evento " });
        }
      });

      router.put('/actualizar/:id_detalles_evento', async (req, res) => {
        const id = req.params.id_detalles_evento;
        const datos = req.body;
        try {
            const update = await Detalles_evento.update({
                id_imagen: datos.id_imagen,
                titulo: datos.titulo,
                descripcion: datos.descripcion
            }, {
                where: {
                    id_detalles_evento: id,
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Detalles evento actualizado correctamente',
                body: update
            });
        } catch (error) {
            console.error('Error al actualizar detalle evento', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
    

      router.delete("/eliminar/:id_detalles_evento", async (req, res) => {
        const id = req.params.id_detalles_evento;
        try {
          // Asegúrate de que la columna primaria sea idusuario
          const borrar = await Detalles_evento.destroy({
            where: {
              id_detalles_evento: id, // Usa solo la columna primaria para la búsqueda
            },
          });
      
          if (borrar) {
            res.status(204).json({
              ok: true,
              status: 204,
              message: "Detalle Eliminado correctamente",
              body: borrar,
            });
          } else {
            res.status(404).json({
              ok: false,
              status: 404,
              message: "Detalle Evento no encontrado",
            });
          }
        } catch (error) {
          console.error("Error al eliminar detalle evento", error);
          res.status(500).json({ error: "Error interno del servidor" });
        }
      });

       //////////filtracion por evento vista admin
       router.get('/consulta/detalleseven', async (req, res) => {
        try {
            const idEvento = req.query.id_evento; // Obtener el id_perfil de la consulta
    
            // Si no se proporciona id_perfil
            if (!idEvento) {
                return res.status(400).json({ msg: 'ID de evento no proporcionado' });
            }
            // Realiza la consulta en la base de datos con el id_perfil
            const asignaciones = await Detalles_evento.findAll({
                where: { id_evento: idEvento },  // Filtra por id_evento
                atributes:['id_detalles_evento','titulo','descripcion'],
                include: [
                    {
                        model: require("../model/evento"),
                        as: 'evento',
                        attributes: ['id_evento', 'nombre'] 
                    },
                ],
                include: [
                  {
                      model: require("../model/imagenes"),
                      as: 'imagen',
                      attributes: ['id_imagen', 'titulo'] 
                  },
              ],
            });
    
            res.json(asignaciones); 
        } catch (error) {
            console.error("Error al obtener los detalles", error);
            res.status(500).json({ msg: "Error del servidor" });
        }
    });
    


    ///////////////////home de cada evento
    router.get('/consulta/detalleevento/:id_evento', async (req, res) => {
      try {
          const idEvento = req.params.id_evento;
    
          // Consultamos los detalles del evento
          const eventoDetalles = await Detalles_evento.findAll({
              attributes: ['id_detalles_evento', 'titulo', 'descripcion'], // Seleccionamos solo los campos necesarios
              where: {
                  '$evento.id_evento$': idEvento,  // Filtramos por id_evento
              },
              include: [
                  {
                      model: require('../model/evento'), // Asegúrate de que la ruta sea correcta
                      as: 'evento', // Alias utilizado en la relación
                      attributes: ['id_evento', 'nombre'],  // Solo los campos necesarios del evento
                  },
                  {
                      model: require('../model/imagenes'), // Asegúrate de que la ruta sea correcta
                      as: 'imagen',  // El alias debe coincidir con la relación definida
                      attributes: ['id_imagen', 'imagen', 'titulo'], // Campos de la imagen
                  },
              ],
          });
    
          // Si no se encuentra el evento
          if (!eventoDetalles || eventoDetalles.length === 0) {
              return res.status(404).json({ message: 'Evento no encontrado' });
          }
    
          // Agrupar los detalles bajo un único objeto de evento
          const respuesta = {
              evento: {
                  id_evento: eventoDetalles[0].evento.id_evento,
                  nombre: eventoDetalles[0].evento.nombre,
              },
              detalles: eventoDetalles.map(detalle => ({
                  id_detalles_evento: detalle.id_detalles_evento,
                  id_imagen: detalle.imagen ? detalle.imagen.id_imagen : null, // Aquí se obtiene el id_imagen correctamente
                  imagen: detalle.imagen ? detalle.imagen.imagen : null, // Imagen si existe
                  titulo: detalle.titulo,
                  descripcion: detalle.descripcion,
              })),
          };
    
          // Enviamos la respuesta con los datos agrupados
          res.json(respuesta);
    
      } catch (error) {
          console.error(error); // Añadido para depuración
          res.status(500).json({ error: error.message });
      }
    });
    
  

  
module.exports = router;