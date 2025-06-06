const router = require ("express").Router();
const Direccion_evento = require ( "../model/direccion_evento");
const express = require('express');
const app = express();




router.get('/consulta', async (req, res) => {
    try {
        const consulta = await Direccion_evento.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: consulta
        });
    } catch (error) {
        console.error('Error al consultar direccion del evento', error);
        res.status(500).json({
            ok: false,
            status: 500,
            error: 'Error interno del servidor'
        });
    }
});
router.get('/consulta/:nom', async (req, res) => {
    const eventos = await Direccion_evento.findAll({
      attributes: ['id_direccion_evento', 'direccion','liga'] // solo necesitamos el ID y el nombre
    });
    res.json(eventos);
  });

router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimoDireccion = await Direccion_evento.findOne({
            order: [['id_direccion_evento', 'DESC']]
        });

        let nuevoRegistro = 1; // Valor inicial si no hay perfiles en la base de datos

        if (ultimoDireccion) {
            nuevoRegistro = ultimoDireccion.id_direccion_evento + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevoDireccion = await Direccion_evento.create({
            id_direccion_evento: nuevoRegistro,
            direccion: datos.direccion,
            liga: datos.liga,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Direccion creado correctamente',
            body: nuevoDireccion
        });
    } catch (error) {
        console.error('Error al crear direccion', error);
        res.status(500).json({ error: 'Error interno del servidor al crear el evento' });
    }
});

router.put('/actualizar/:id_direccion_evento', async (req, res) => {
    const id = req.params.id_direccion_evento;
    const datos = req.body;
    try {
        const update = await Direccion_evento.update({
            direccion: datos.direccion,
            liga: datos.liga,
        }, {
            where: {
                id_direccion_evento: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'direccion actualizado correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar direccion', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.delete('/eliminar/:id_direccion_evento', async (req, res) => {
    const id = req.params.id_direccion_evento;
    const borrar = await Direccion_evento.destroy({
        where: {
            id_direccion_evento: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});




  

module.exports = router;