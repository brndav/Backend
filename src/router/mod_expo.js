const router = require ("express").Router();
const Modexpo = require ("../model/mod_expo");
const express = require ('express');
const app = express();

router.get('/consulta',async(req,res)=>{
    const consulta = await Modexpo.findAll()
    res.json(consulta)
})
router.get('/consulta/descrip', async (req, res) => {
    const exposicion = await Modexpo.findAll({
      attributes: ['id_modalidad', 'descripcion'] // solo necesitamos el ID y el nombre
    });
    res.json(exposicion);
  });
  
  router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimaModalidad = await Modexpo.findOne({
            order: [['id_modalidad', 'DESC']]
        });

        let nuevoIdModalidad = 1; // Valor inicial si no hay linea en la base de datos

        if (ultimaModalidad) {
            nuevoIdModalidad = ultimaModalidad.id_modalidad + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevaModalidad= await Modexpo.create({
            id_modalidad: nuevoIdModalidad,
            descripcion: datos.descripcion,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Modalidad creada correctamente',
            body: nuevaModalidad
        });
    } catch (error) {
        console.error('Error al crear forma', error);
        res.status(500).json({ error: 'Error interno del servidor al crear modalidad' });
    }
});


router.put('/actualizar/:id_modalidad', async (req, res) => {
    const id = req.params.id_modalidad;
    const datos = req.body;
    try {
        const update = await Modexpo.update({
            descripcion: datos.descripcion,
        }, {
            where: {
                id_modalidad: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Modalidad actualizada correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar Modalidad', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/eliminar/:id_modalidad', async (req, res) => {
    const id = req.params.id_modalidad;
    const borrar = await Modexpo.destroy({
        where: {
            id_modalidad: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;

