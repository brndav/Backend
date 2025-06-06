const router = require ("express").Router();
const Status_registro = require ( "../model/status_registro");
const express = require('express');
const app = express();




router.get('/consulta', async (req, res) => {
    try {
        const consulta = await Status_registro.findAll();
        res.status(200).json(consulta);
    } catch (error) {
        console.error('Error al consultar status', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.get('/consulta/descrip',async(req,res)=>{
    const consulta = await Status_registro.findAll({
        attributes:['id_status','descripcion']
    });
    res.json(consulta)
    });


router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimoStatus = await Status_registro.findOne({
            order: [['id_status', 'DESC']]
        });

        let nuevoIdStatus = 1; // Valor inicial si no hay linea en la base de datos

        if (ultimoStatus) {
            nuevoIdStatus = ultimoStatus.id_status + 1;
        }

        // Crear el nuevo status con el ID calculado
        const nuevoStatus = await Status_registro.create({
            id_status: nuevoIdStatus,
            descripcion: datos.descripcion,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'status creado correctamente',
            body: nuevoStatus
        });
    } catch (error) {
        console.error('Error al crear status', error);
        res.status(500).json({ error: 'Error interno del servidor al crear linea' });
    }
});





    router.put('/actualizar/:id_status', async (req, res) => {
        const id = req.params.id_status;
        const datos = req.body;
        try {
            const update = await Status_registro.update({
                descripcion: datos.descripcion,
            }, {
                where: {
                    id_status: id,
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'status actualizada correctamente',
                body: update
            });
        } catch (error) {
            console.error('Error al actualizar status', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
    
router.delete('/eliminar/:id_status', async (req, res) => {
    const id = req.params.id_status;
    const borrar = await Status_registro.destroy({
        where: {
            id_status: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        message: 'status eliminada correctamente',
        body: borrar
    });
});


module.exports = router;