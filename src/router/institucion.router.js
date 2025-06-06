const router = require ("express").Router();
const Instituciones = require ( "../model/institucion");
const express = require('express');
const app = express();




router.get('/consulta',async(req,res)=>{
    const consulta = await Instituciones.findAll()
    res.json(consulta)
})

router.get('/consulta/:nom', async (req, res) => {
    const instituciones = await Instituciones.findAll({
      attributes: ['id_institucion', 'nombreinst'] // solo necesitamos el ID y el nombre
    });
    res.json(instituciones);
  });


  router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimaInstitucion = await Instituciones.findOne({
            order: [['id_institucion', 'DESC']]
        });

        let nuevoIdInstitucion = 1; // Valor inicial si no hay perfiles en la base de datos

        if (ultimaInstitucion) {
            nuevoIdInstitucion = ultimaInstitucion.id_institucion + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevaInstitucion = await Instituciones.create({
            id_institucion: nuevoIdInstitucion,
            nombreinst: datos.nombreinst,
            logo: datos.logo,
            link: datos.link
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Institución creada correctamente',
            body: nuevaInstitucion
        });
    } catch (error) {
        console.error('Error al crear Institución', error);
        res.status(500).json({ error: 'Error interno del servidor al crear perfil' });
    }
});

router.put('/actualizar/:id_institucion', async (req, res) => {
    const id = req.params.id_institucion;
    const datos = req.body;
    try {
        const update = await Instituciones.update({
            nombreinst: datos.nombreinst,
            logo: datos.logo,
            link: datos.link
        }, {
            where: {
                id_institucion: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Institucion actualizada correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar institucion', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.delete('/eliminar/:id_instituciones', async (req, res) => {
    const id = req.params.id_instituciones;
    const borrar = await Instituciones.destroy({
        where: {
            id_institucion: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;
