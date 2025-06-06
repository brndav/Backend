const router = require ("express").Router();
const Salas = require ( "../model/sala");
const express = require('express');
const app = express();



router.get('/consulta',async(req,res)=>{
    const consulta = await Salas.findAll()
    res.json(consulta)
    /* res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    }) */
})

/* router.get('/consulta/:id_sala',async(req,res)=>{
    const id = req.params.id_sala;
    const consulta = await Salas.findOne({
        where: {id_sala:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
}) */

    router.get('/consulta/:nom', async (req, res) => {
        const salas = await Salas.findAll({
          attributes: ['id_sala', 'descripcion'] // solo necesitamos el ID y el nombre
        });
        res.json(salas);
      });


router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimaSala = await Salas.findOne({
            order: [['id_sala', 'DESC']]
        });

        let nuevoIdSala = 1; // Valor inicial si no hay eje en la base de datos

        if (ultimaSala) {
            nuevoIdSala = ultimaSala.id_sala + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevaSala = await Salas.create({
            id_sala: nuevoIdSala,
            descripcion: datos.descripcion,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Sala creado correctamente',
            body: nuevaSala
        });
    } catch (error) {
        console.error('Error al crear sala', error);
        res.status(500).json({ error: 'Error interno del servidor al crear sala' });
    }
});

router.put('/actualizar/:id_sala', async (req, res) => {
    const id = req.params.id_sala;
    const datos = req.body;
    try {
        const update = await Salas.update({
            descripcion: datos.descripcion,
        }, {
            where: {
                id_sala: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Sala actualizado correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar sala', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/eliminar/:id_sala', async (req, res) => {
    const id = req.params.id_sala;
    const borrar = await Salas.destroy({
        where: {
            id_sala: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;