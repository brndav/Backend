const router = require ("express").Router();
const Membresias = require ("../model/membresia");
const express =require ("express");
const app =express();

router.get('/consulta', async (req, res) => {
    const consulta = await Membresias.findAll()
    res.json(consulta)
})

router.get('/consulta/:id_tipo_membresia', async (req, res)=>{
    const id = req.params.id_tipo_membresia;
    const consulta = await Membresias.findOne({
        where: {id_tipo_membresia:id}
    })
    res.json(consulta)
})


router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimaMembresia = await Membresias.findOne({
            order: [['id_tipo_membresia', 'DESC']]
        });

        let nuevoIdMembresia = 1; // Valor inicial si no hay linea en la base de datos

        if (ultimaMembresia) {
            nuevoIdMembresia = ultimaMembresia.id_membresia + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevaMembresia = await Membresias.create({
            id_tipo_membresia: nuevoIdMembresia,
            opciones: datos.opciones,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Membresia creada correctamente',
            body: nuevaMembresia
        });
    } catch (error) {
        console.error('Error al crear forma', error);
        res.status(500).json({ error: 'Error interno del servidor al crear linea' });
    }
});

router.put('/actualizar/:id_tipo_membresia', async (req, res) => {
    const id = req.params.id_tipo_membresia;
    const datos = req.body;
    try {
        const update = await Membresias.update({
            opciones: datos.opciones,
        }, {
            where: {
                id_tipo_membresia: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Membresia actualizada correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar membresia', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.delete('/eliminar/:id_tipo_membresia', async (req, res) => {
    const id = req.params.id_tipo_membresia;
    const borrar = await Membresias.destroy({
        where: {
            id_tipo_membresia: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;
