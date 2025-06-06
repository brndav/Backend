const router = require ("express").Router();
const Info_pago = require ( "../model/info_pago");
const express = require('express');
const app = express();




router.get('/consulta', async (req, res) => {
    try {
        const consulta = await Info_pago.findAll();
        res.status(200).json(consulta);
    } catch (error) {
        console.error('Error al consultar el tipo de pago', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});



router.get('/consulta/descrip',async(req,res)=>{
    const consulta = await Info_pago.findAll({
        attributes:['idinfo_pago','id_status','id_pagos']
    });
    res.json(consulta)
    });


router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimoInfoPago = await Info_pago.findOne({
            order: [['idinfo_pago', 'DESC']]
        });

        let nuevoIdInfoPago = 1; // Valor inicial si no hay linea en la base de datos

        if (ultimoInfoPago) {
            nuevoIdInfoPago = ultimoInfoPago.idinfo_pago + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevoInfoPago = await Info_pago.create({
            idinfo_pago: nuevoIdInfoPago,
            id_status: datos.id_status,
            id_pagos:datos.id_pagos
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Info Pago creada correctamente',
            body: nuevoInfoPago
        });
    } catch (error) {
        console.error('Error al crear Info Pago', error);
        res.status(500).json({ error: 'Error interno del servidor al crear linea' });
    }
});


    router.put('/actualizar/:idinfo_pago', async (req, res) => {
        const id = req.params.idinfo_pago;
        const datos = req.body;
        try {
            const update = await Info_pago.update({
                id_status: datos.id_status,
                id_pagos:datos.id_pagos
            }, {
                where: {
                    idinfo_pago: id,
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Info Pago actualizada correctamente',
                body: update
            });
        } catch (error) {
            console.error('Error al actualizar info pago', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

router.delete('/eliminar/:idinfo_pago', async (req, res) => {
    const id = req.params.idinfo_pago;
    const borrar = await Info_pago.destroy({
        where: {
            idinfo_pago: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        message: 'info pago eliminada correctamente',
        body: borrar
    });
});





router.get('/consulta/descrip/infopago', async (req, res) => {
    try {
        const consulta = await Info_pago.findAll({
            attributes: ['idinfo_pago'],
            include: [
                {
                    model: require('../model/pagos'),
                    as: 'pagos',
                    attributes: ['num_referencia'],
                    include: [
                        {
                            model: require('../model/usuario'),
                            as: 'usuario',
                            attributes: ['nombre', 'paterno', 'materno']
                        }
                    ]
                },
                {
                    model: require('../model/status_registro'),
                    as: 'status',
                    attributes: ['descripcion']
                }
            ]
        });
        res.json(consulta);
    } catch (error) {
        console.error('Error al obtener infopagos:', error);
        res.status(500).json({ message: 'Error al obtener infopagos', error });
    }
});




////////////////////Vista del usuario logueado sobre sus pagos

router.get('/consulta/pagousu/:idusuario', async (req, res) => {
    const { idusuario } = req.params; // Obtenemos el idusuario de los parámetros de la URL

    try {
        const pagos = await Info_pago.findAll({
            include: [
                {
                    model: require('../model/pagos'),
                    as: 'pagos',
                    attributes: ['id_pagos', 'num_referencia', 'fecha_hora'],
                    where: { idusuario }, // Filtramos por idusuario dentro de pagos
                    include: [
                        {
                            model: require('../model/usuario'),
                            as: 'usuario',
                            attributes: ['nombre', 'paterno', 'materno']
                        },
                        {
                            model: require('../model/tipo_pago'),
                            as: 'tipo_pago',
                            attributes: ['idtipo_pago', 'opciones']
                        }
                    ]
                },
                {
                    model: require('../model/status_registro'),
                    as: 'status',
                    attributes: ['id_status', 'descripcion']
                }
            ]
        });

        if (pagos.length > 0) {
            res.status(200).json(pagos);
        } else {
            res.status(404).json({ mensaje: "No se encontraron pagos para este usuario" });
        }

    } catch (error) {
        console.error("Error al obtener los pagos del usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});




////////////clasific la informacion de los pagos para el tipo de pago que pertenece
router.get('/consultainfocongre', async (req, res) => {
    try {
        const consulta = await Info_pago.findAll({
            include: [
                {
                    model: require('../model/pagos'),
                    as: 'pagos',
                    where: { idtipo_pago: 2 }, 
                    attributes: ['num_referencia'], 
                    include: [
                        {
                            model: require('../model/usuario'),
                            as: 'usuario',
                            attributes: ['nombre', 'paterno', 'materno']
                        },
                        {
                            model: require('../model/tipo_pago'),
                            as: 'tipo_pago',
                            attributes: ['idtipo_pago', 'opciones']
                        }
                    ]
                },
                {
                    model: require('../model/status_registro'),
                    as: 'status',
                    attributes: ['id_status', 'descripcion']
                }
            ]
        });

        res.status(200).json(consulta);
    } catch (error) {
        console.error('Error al consultar información de pago', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.get('/consultainfosociedad', async (req, res) => {
    try {
        const consulta = await Info_pago.findAll({
            include: [
                {
                    model: require('../model/pagos'),
                    as: 'pagos',
                    where: { idtipo_pago: 1 }, 
                    attributes: ['num_referencia'], 
                    include: [
                        {
                            model: require('../model/usuario'),
                            as: 'usuario',
                            attributes: ['nombre', 'paterno', 'materno']
                        },
                        {
                            model: require('../model/tipo_pago'),
                            as: 'tipo_pago',
                            attributes: ['idtipo_pago', 'opciones']
                        }
                    ]
                },
                {
                    model: require('../model/status_registro'),
                    as: 'status',
                    attributes: ['id_status', 'descripcion']
                }
            ]
        });

        res.status(200).json(consulta);
    } catch (error) {
        console.error('Error al consultar información de pago', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});




module.exports = router;