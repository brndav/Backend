const router = require ("express").Router();
const Horarios = require ( "../model/horario");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
    const consulta = await Horarios.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})


router.get('/consulta/:nom', async (req, res) => {
    const horarios = await Horarios.findAll({
      attributes: ['id_horario', 'horario_inicio','horario_fin'] // solo necesitamos el ID y el nombre
    });
    res.json(horarios);
  });

router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimoHorario = await Horarios.findOne({
            order: [['id_horario', 'DESC']]
        });

        let nuevoIdHorario = 1; // Valor inicial si no hay linea en la base de datos

        if (ultimoHorario) {
            nuevoIdHorario = ultimoHorario.id_horario + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevoHorario = await Horarios.create({
        horario_inicio: datos.horario_inicio,
        horario_fin: datos.horario_fin
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Horario creada correctamente',
            body: nuevoHorario
        });
    } catch (error) {
        console.error('Error al crear horario', error);
        res.status(500).json({ error: 'Error interno del servidor al crear horario' });
    }
});

router.put('/actualizar/:id_horario', async (req, res) => {
    const id = req.params.id_horario;
    const datos = req.body;
    try {
        const update = await Horarios.update({
            horario_inicio: datos.horario_inicio,
            horario_fin: datos.horario_fin
        }, {
            where: {
                id_horario: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Horario actualizado correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar horario', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.delete('/eliminar/:id_horario', async (req, res) => {
    const id = req.params.id_horario;
    const borrar = await Horarios.destroy({
        where: {
            id_horario: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;