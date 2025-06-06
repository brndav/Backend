const router = require ("express").Router();
const Instituciones_evento = require ( "../model/instituciones_evento");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
  const consulta = await Instituciones_evento.findAll()
  res.json(consulta)
})

    router.post("/crear", async (req, res) => {
        const datos = req.body;
      
        try {
          // Obtener el último ID y sumarle 1
          const ultimoInsEvento = await Instituciones_evento.findOne({
            order: [["id_instituciones_evento", "DESC"]],
          });
      
          let nuevoRegistro = 1; // Valor inicial 
      
          if (ultimoInsEvento) {
            nuevoRegistro = ultimoInsEvento.id_instituciones_evento + 1;
          }
      
          // Crear el nuevo perfil con el ID calculado
          const nuevoInsEvento = await Instituciones_evento.create({
            id_instituciones_evento: nuevoRegistro,
            id_institucion: datos.id_institucion,
            id_evento: datos.id_evento,
          });
      
          res.status(201).json({
            ok: true,
            status: 201,
            message: "Institucion Evento creado correctamente",
            body: nuevoInsEvento,
          });
        } catch (error) {
          console.error("Error al crear Institucion Evento", error);
          res
            .status(500)
            .json({ error: "Error interno del servidor al crear dia evento " });
        }
      });

      router.put('/actualizar/:id_instituciones_evento', async (req, res) => {
        const id = req.params.id_instituciones_evento;
        const datos = req.body;
        try {
            const update = await Instituciones_evento.update({
                id_institucion: datos.id_institucion,
            id_evento: datos.id_evento,
            }, {
                where: {
                    id_instituciones_evento: id,
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Instituciones Evento actualizado correctamente',
                body: update
            });
        } catch (error) {
            console.error('Error al actualizar Institucion Evento', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
    

      router.delete("/eliminar/:id_instituciones_evento", async (req, res) => {
        const id = req.params.id_instituciones_evento;
        try {
          // Asegúrate de que la columna primaria sea idusuario
          const borrar = await Instituciones_evento.destroy({
            where: {
                id_instituciones_evento: id, // Usa solo la columna primaria para la búsqueda
            },
          });
      
          if (borrar) {
            res.status(204).json({
              ok: true,
              status: 204,
              message: "Institucion Evento Eliminado correctamente",
              body: borrar,
            });
          } else {
            res.status(404).json({
              ok: false,
              status: 404,
              message: "Institucion Evento no encontrado",
            });
          }
        } catch (error) {
          console.error("Error al eliminar Institucion evento", error);
          res.status(500).json({ error: "Error interno del servidor" });
        }
      });


      router.get('/consulta/eventoins', async (req, res) => {
        try {
            const idEvento = req.query.id_evento; // Obtener el id_perfil de la consulta
    
            // Si no se proporciona id_perfil
            if (!idEvento) {
                return res.status(400).json({ msg: 'ID de evento no proporcionado' });
            }
            // Realiza la consulta en la base de datos con el id_perfil
            const asignaciones = await Instituciones_evento.findAll({
                where: { id_evento: idEvento },  // Filtra por id_evento
                include: [
                    {
                        model: require("../model/evento"),
                        as: 'evento',
                        attributes: ['id_evento', 'nombre'] 
                    },
                    {
                        model: require("../model/institucion"),
                        as: 'institucion',
                        attributes: ['id_institucion'] 
                    },
                ],
            });
    
            res.json(asignaciones); // Retorna las asignaciones encontradas
        } catch (error) {
            console.error("Error al obtener las asignaciones", error);
            res.status(500).json({ msg: "Error del servidor" });
        }
    });
  

/////////////////filtracion de instituciones por evento para el pie de pagina
router.get('/filtrar/instievent/:id_evento', async (req, res) => {
  const { id_evento } = req.params;
  try {
    const InstiEventos = await Instituciones_evento.findAll({
      where: {
        id_evento,
      },
      include: [
        {
          model: require("../model/evento"),
          as: 'evento',
          attributes: ['id_evento', 'nombre'], // Incluye solo los atributos necesarios del evento
        },
        {
          model: require("../model/institucion"), // Ruta correcta al modelo de institución
          as: 'institucion',
          attributes: ['id_institucion', 'nombreinst','logo','link'], // Incluye solo los atributos necesarios de la institución
        },
      ],
    });

    if (InstiEventos && InstiEventos.length > 0) {
      // Reestructuramos la respuesta para agrupar instituciones bajo el evento
      const resultado = {
        id_instituciones_evento: InstiEventos[0].id_instituciones_evento,
        evento: {
          id_evento: InstiEventos[0].evento.id_evento,
          nombre: InstiEventos[0].evento.nombre,
        },
        instituciones: InstiEventos.map((instiEvento) => ({
          id_institucion: instiEvento.institucion.id_institucion,
          nombreinst: instiEvento.institucion.nombreinst,
          logo: instiEvento.institucion.logo,
          link: instiEvento.institucion.link,
        })),
      };

      res.json(resultado);
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener instituciones del evento' });
  }
});


    
module.exports = router;