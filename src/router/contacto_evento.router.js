const router = require ("express").Router();
const Contacto_evento = require ( "../model/contacto_evento");
const express = require('express');
const app = express();




router.get('/consulta', async (req, res) => {
    try {
        const consulta = await Contacto_evento.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: consulta
        });
    } catch (error) {
        console.error('Error al consultar contacto del evento', error);
        res.status(500).json({
            ok: false,
            status: 500,
            error: 'Error interno del servidor'
        });
    }
});
router.get('/consulta/:nom', async (req, res) => {
    const contactos = await Contacto_evento.findAll({
      attributes: ['id_contacto', 'telefono','facebook'] // solo necesitamos el ID y el nombre
    });
    res.json(contactos);
  });

router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimoContacto = await Contacto_evento.findOne({
            order: [['id_contacto', 'DESC']]
        });

        let nuevoRegistro = 1; // Valor 

        if (ultimoContacto) {
            nuevoRegistro = ultimoContacto.id_contacto + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevoContacto = await Contacto_evento.create({
            id_contacto: nuevoRegistro,
            telefono: datos.telefono,
            facebook: datos.facebook,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'contacto creado correctamente',
            body: nuevoContacto
        });
    } catch (error) {
        console.error('Error al crear contacto', error);
        res.status(500).json({ error: 'Error interno del servidor al crear el evento' });
    }
});

router.put('/actualizar/:id_contacto', async (req, res) => {
    const id = req.params.id_contacto;
    const datos = req.body;
    try {
        const update = await Contacto_evento.update({
            telefono: datos.telefono,
            facebook: datos.facebook,
        }, {
            where: {
                id_contacto: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'contacto actualizado correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar contacto', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.delete('/eliminar/:id_contacto', async (req, res) => {
    const id = req.params.id_contacto;
    const borrar = await Contacto_evento.destroy({
        where: {
            id_contacto: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;