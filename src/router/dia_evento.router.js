const router = require ("express").Router();
const Dia_evento = require ( "../model/dia_evento");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
  const consulta = await Dia_evento.findAll()
  res.json(consulta)
})



    router.post("/crear", async (req, res) => {
        const datos = req.body;
      
        try {
          // Obtener el último ID y sumarle 1
          const ultimoDiaEvento = await Dia_evento.findOne({
            order: [["id_dia_evento", "DESC"]],
          });
      
          let nuevoRegistro = 1; // Valor inicial si no hay RegistroUsuario en la base de datos
      
          if (ultimoDiaEvento) {
            nuevoRegistro = ultimoDiaEvento.id_dia_evento + 1;
          }
      
          // Crear el nuevo perfil con el ID calculado
          const nuevoDiaEvento = await Dia_evento.create({
            id_dia_evento: nuevoRegistro,
            id_dia: datos.id_dia,
            id_evento: datos.id_evento,
          });
      
          res.status(201).json({
            ok: true,
            status: 201,
            message: "Dia Evento creado correctamente",
            body: nuevoDiaEvento,
          });
        } catch (error) {
          console.error("Error al crear dia Evento", error);
          res
            .status(500)
            .json({ error: "Error interno del servidor al crear dia evento " });
        }
      });

      router.put('/actualizar/:id_dia_evento', async (req, res) => {
        const id = req.params.id_dia_evento;
        const datos = req.body;
        try {
            const update = await Dia_evento.update({
                id_dia: datos.id_dia,
            id_evento: datos.id_evento,
            }, {
                where: {
                    id_dia_evento: id,
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Día  evento actualizado correctamente',
                body: update
            });
        } catch (error) {
            console.error('Error al actualizar día evento', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
    

      router.delete("/eliminar/:id_dia_evento", async (req, res) => {
        const id = req.params.id_dia_evento;
        try {
          // Asegúrate de que la columna primaria sea idusuario
          const borrar = await Dia_evento.destroy({
            where: {
              id_dia_evento: id, // Usa solo la columna primaria para la búsqueda
            },
          });
      
          if (borrar) {
            res.status(204).json({
              ok: true,
              status: 204,
              message: "Dia Eliminado correctamente",
              body: borrar,
            });
          } else {
            res.status(404).json({
              ok: false,
              status: 404,
              message: "Dia Evento no encontrado",
            });
          }
        } catch (error) {
          console.error("Error al eliminar dia evento", error);
          res.status(500).json({ error: "Error interno del servidor" });
        }
      });

       //////////filtracion por evento vista admin programa
       router.get('/consulta/diaseventos', async (req, res) => {
        try {
            const idEvento = req.query.id_evento; // Obtener el id_perfil de la consulta
    
            // Si no se proporciona 
            if (!idEvento) {
                return res.status(400).json({ msg: 'ID de evento no proporcionado' });
            }
            // Realiza la consulta en la base de datos con el id_perfil
            const asignaciones = await Dia_evento.findAll({
                where: { id_evento: idEvento },  // Filtra por id_evento
                include: [
                    {
                        model: require("../model/evento"),
                        as: 'evento',
                        attributes: ['id_evento', 'nombre'] 
                    },
                    {
                      model: require("../model/dia"),
                      as: 'dia',
                      attributes: ['id_dia', 'descripcion'] 
                  },
                ],
            });
    
            res.json(asignaciones); 
        } catch (error) {
            console.error("Error al obtener los dias", error);
            res.status(500).json({ msg: "Error del servidor" });
        }
    });
    

    //////////filtraccion de imagenes por evento para la vista admin de detallesevento
    router.get('/filtrar/:id_evento', async (req, res) => {
      const { id_evento } = req.params;
      try {
        const dias = await Dia_evento.findAll({
          where: { id_evento },
        });
        res.json(dias);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener dias' });
      }
    });
    

    /////////////// tarjetas de eventos principal
    router.get('/consulta/:nom', async (req, res) => {
      try {
          const diaseven = await Dia_evento.findAll({
              include: [
                  {
                      model: require('../model/dia'),
                      as: 'dia',
                      attributes: ['id_dia', 'descripcion'],
                  },
                  {
                      model: require('../model/evento'),
                      as: 'evento',
                      attributes: ['id_evento', 'nombre', 'status'],
                      where: { status: 1 }, // Filtra por eventos con status 1
                  },
              ],
          });
  
          // Agrupar días por eventos
          const eventosAgrupados = diaseven.reduce((result, item) => {
              const { evento, dia } = item;
  
              // Verifica si el evento ya está en el resultado
              let eventoExistente = result.find(e => e.evento.id_evento === evento.id_evento);
  
              if (!eventoExistente) {
                  // Si no existe, crea una nueva entrada para el evento
                  eventoExistente = {
                      evento: {
                          id_evento: evento.id_evento,
                          nombre: evento.nombre,
                          status: evento.status,
                      },
                      dias: [],
                  };
                  result.push(eventoExistente);
              }
  
              // Agrega el día al evento correspondiente
              eventoExistente.dias.push({
                  id_dia: dia.id_dia,
                  descripcion: dia.descripcion,
              });
  
              return result;
          }, []);
  
          res.json(eventosAgrupados);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  });
  
  


  router.get('/consulta/descrip', async (req, res) => {
    try {
        const diaseventos = await Dia_evento.findAll({
            include: [
                {
                    model: Evento,
                    as: 'evento',
                    attributes: ['id_evento', 'nombre'] 
                },
                {
                    model: Dia,
                    as: 'dia',
                    attributes: ['id_dia', 'descripcion'] 
                },
            ],
        });

        res.json(diaseventos); 
    } catch (error) {
        console.error("Error al obtener los días", error);
        res.status(500).json({ msg: "Error del servidor" });
    }
});




module.exports = router;