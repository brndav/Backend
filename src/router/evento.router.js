const router = require ("express").Router();
const Eventos = require ( "../model/evento");
const express = require('express');
const app = express();




router.get('/consulta', async (req, res) => {
    try {
        const consulta = await Eventos.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: consulta
        });
    } catch (error) {
        console.error('Error al consultar evento', error);
        res.status(500).json({
            ok: false,
            status: 500,
            error: 'Error interno del servidor'
        });
    }
});


router.get('/consulta/:nom', async (req, res) => {
    const eventos = await Eventos.findAll({
      attributes: ['id_evento', 'nombre'] // solo necesitamos el ID y el nombre
    });
    res.json(eventos);
  });

  
///////////consulta registros ponencia
  router.get('/con/:id', async (req, res) => {
    const { id } = req.params;  // Obtener el id_evento desde los parámetros
    const evento = await Eventos.findOne({
      where: {
        id_evento: id  // Buscar el evento por su id_evento
      },
      attributes: ['id_evento', 'nombre']  // Solo obtenemos id_evento y nombre
    });
    
    if (evento) {
      res.json(evento);  // Devuelve el evento encontrado
    } else {
      res.status(404).json({ message: 'Evento no encontrado' });
    }
  });

  
router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimoEvento = await Eventos.findOne({
            order: [['id_evento', 'DESC']]
        });

        let nuevoIdEvento = 1; // Valor inicial si no hay perfiles en la base de datos

        if (ultimoEvento) {
            nuevoIdEvento = ultimoEvento.id_evento + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevoEvento = await Eventos.create({
            id_evento: nuevoIdEvento,
            nombre: datos.nombre,
            id_direccion_evento: datos.id_direccion_evento,
            id_contacto: datos.id_contacto,
            status: datos.status,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Evento creado correctamente',
            body: nuevoEvento
        });
    } catch (error) {
        console.error('Error al crear evento', error);
        res.status(500).json({ error: 'Error interno del servidor al crear el evento' });
    }
});

router.put('/actualizar/:id_evento', async (req, res) => {
    const id = req.params.id_evento;
    const datos = req.body;
    try {
        const update = await Eventos.update({
            nombre: datos.nombre,
            id_direccion_evento: datos.id_direccion_evento,
            id_contacto: datos.id_contacto,
            status: datos.status,
        }, {
            where: {
                id_evento: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Evento actualizado correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar evento', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.delete('/eliminar/:id_evento', async (req, res) => {
    const id = req.params.id_evento;
    const borrar = await Eventos.destroy({
        where: {
            id_evento: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});

  
router.get('/consulta/instieven/:id_evento', async (req, res) => {
    const { id_evento } = req.params;

    try {
        const evento = await Eventos.findOne({
            where: { id_evento },
            include: [
                {
                    model: require('../model/direccion_evento'),  // Incluir la dirección relacionada
                    as: 'direccion',  // Asegúrate de que el alias 'direccion' coincida con el que definiste en el modelo
                    attributes: ['id_direccion_evento', 'direccion', 'liga']  // Campos específicos que quieres traer
                },
                {
                    model: require('../model/contacto_evento'),  // Incluir el contacto relacionado
                    as: 'contacto',  // Asegúrate de que el alias 'contacto' coincida con el que definiste en el modelo
                    attributes: ['id_contacto', 'telefono', 'facebook']  // Campos específicos que quieres traer
                }
            ]
        });

        if (!evento) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Evento no encontrado'
            });
        }

        // Devuelve el evento con los datos relacionados
        res.status(200).json({
            body: {
                evento: evento.nombre,
                direccion: evento.direccion,  // Sequelize carga automáticamente los datos relacionados
                contacto: evento.contacto  // Sequelize carga automáticamente los datos relacionados
            }
        });
    } catch (error) {
        console.error('Error al consultar evento', error);
        res.status(500).json({
            ok: false,
            status: 500,
            error: 'Error interno del servidor'
        });
    }
});

module.exports = router;