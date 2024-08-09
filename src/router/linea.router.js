const router = require ("express").Router();
const Lineas = require ( "../model/linea.model");
const express = require('express');
const app = express();




router.get('/consulta', async (req, res) => {
    try {
        const consulta = await Lineas.findAll();
        res.status(200).json(consulta);
    } catch (error) {
        console.error('Error al consultar lineas', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimaLinea = await Lineas.findOne({
            order: [['id_linea', 'DESC']]
        });

        let nuevoIdLinea = 1; // Valor inicial si no hay linea en la base de datos

        if (ultimaLinea) {
            nuevoIdLinea = ultimaLinea.id_linea + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevaLinea = await Lineas.create({
            id_linea: nuevoIdLinea,
            descripcion_linea: datos.descripcion_linea,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Linea creada correctamente',
            body: nuevaLinea
        });
    } catch (error) {
        console.error('Error al crear linea', error);
        res.status(500).json({ error: 'Error interno del servidor al crear linea' });
    }
});


router.get('/consulta/descrip',async(req,res)=>{
    const consulta = await Lineas.findAll({
        attributes:['id_linea','descripcion_linea']
    });
    res.json(consulta)
    });



    router.put('/actualizar/:id_linea', async (req, res) => {
        const id = req.params.id_linea;
        const datos = req.body;
        try {
            const update = await Lineas.update({
                descripcion_linea: datos.descripcion_linea,
            }, {
                where: {
                    id_linea: id,
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Linea actualizada correctamente',
                body: update
            });
        } catch (error) {
            console.error('Error al actualizar linea', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

router.delete('/eliminar/:id_linea', async (req, res) => {
    const id = req.params.id_linea;
    const borrar = await Lineas.destroy({
        where: {
            id_linea: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        message: 'linea eliminada correctamente',
        body: borrar
    });
});


module.exports = router;