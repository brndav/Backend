const router = require ("express").Router();
const Evaluadors = require ( "../model/evaluador");
const express = require('express');
const app = express();
const { Op } = require('sequelize');



const Evento = require('../model/evento');


router.get('/consulta', async (req, res) => {
    try {
        const consulta = await Evaluadors.findAll();
        res.status(200).json(consulta);
    } catch (error) {
        console.error('Error al consultar evaluador', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimoEvaluador = await Evaluadors.findOne({
            order: [['id_evaluador', 'DESC']]
        });

        let nuevoIdEvaluador = 1; // Valor inicial si no hay linea en la base de datos

        if (ultimoEvaluador) {
            nuevoIdEvaluador = ultimoEvaluador.id_evaluador + 1;
        }

        // Crear el nuevo status con el ID calculado
        const nuevoEvaluador = await Evaluadors.create({
            id_evaluador: nuevoIdEvaluador,
            idusuario: datos.idusuario,
            id_registros: datos.id_registros,
            id_status: datos.id_status,
            idinfo_pago: datos. idinfo_pago,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'evaluador creado correctamente',
            body: nuevoEvaluador
        });
    } catch (error) {
        console.error('Error al crear status', error);
        res.status(500).json({ error: 'Error interno del servidor al crear linea' });
    }
});


    router.put('/actualizar/:id_evaluador', async (req, res) => {
        const id = req.params.id_evaluador;
        const datos = req.body;
        try {
            const update = await Evaluadors.update({
            idusuario: datos.idusuario,
            id_registros: datos.id_registros,
            id_status: datos.id_status,
            idinfo_pago: datos. idinfo_pago,
            }, {
                where: {
                    id_evaluador: id,
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'evaluador actualizada correctamente',
                body: update
            });
        } catch (error) {
            console.error('Error al actualizar evaluador', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

router.delete('/eliminar/:id_evaluador', async (req, res) => {
    const id = req.params.id_evaluador;
    const borrar = await Evaluadors.destroy({
        where: {
            id_evaluador: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        message: 'status eliminada correctamente',
        body: borrar
    });
});

/////////// vista administrador  programa_registro que llama los registros desde la tabla evaluadores////
router.get('/consulta/nom', async (req, res) => {
    try {
        const { id_evento, id_perfil } = req.query; // Obtenemos id_evento e id_perfil de la consulta

        const whereCondition = {}; // Creamos un objeto de condiciones dinámicas

        if (id_evento) {
            whereCondition.id_evento = id_evento; // Filtrar por id_evento si está presente
        }

        if (id_perfil) {
            whereCondition.id_perfil = id_perfil; // Filtrar por id_perfil si está presente
        }

        const evaluadores = await Evaluadors.findAll({
            include: [
                {
                    model: require('../model/registro'),
                    as: 'registro',
                    attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                                 'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'],
                    required: true, // Asegura que solo traiga registros con evento y perfil
                    where: whereCondition, // Aplicamos las condiciones dinámicas
                    include: [
                        {
                            model: require('../model/usuario'),
                            as: 'usuario',
                            attributes: ['nombre', 'paterno', 'materno']
                        },
                        {
                            model: require('../model/perfil'),
                            as: 'perfil',
                            attributes: ['id_perfil', 'perfiles']
                        },
                        {
                            model: require('../model/evento'),
                            as: 'evento',
                            attributes: ['id_evento', 'nombre']
                        },
                        {
                            model: require('../model/mod_expo'),
                            as: 'modalidad',
                            attributes: ['descripcion']
                        }
                    ]
                },
                {
                    model: require('../model/status_registro'),
                    as: 'status',
                    attributes: ['descripcion'],
                    where: { descripcion: 'aprobado' }
                },
                {
                    model: require('../model/info_pago'),
                    as: 'info_pago',
                    attributes: ['idinfo_pago', 'id_status', 'id_pagos'],
                    required: true,
                    include: [
                        {
                            model: require('../model/status_registro'),
                            as: 'status',
                            attributes: ['descripcion'],
                            where: { descripcion: 'aprobado' }
                        },
                        {
                            model: require('../model/pagos'),
                            as: 'pagos', 
                            attributes: ['id_pagos', 'num_referencia']
                        }
                    ]
                }
            ]
        });

        res.json(evaluadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/consulta/regevaluador/evento/:id_evento', async (req, res) => {
    try {
        const { id_evento } = req.params; // Obtener el id_evento desde los parámetros

        // Buscar evaluadores filtrados por id_evento a través de las relaciones
        const evaluadores = await Evaluadors.findAll({
            include: [
                {
                    model: require('../model/usuario'),
                    as: 'usuario', // Usuario evaluador
                    attributes: ['nombre', 'paterno', 'materno']
                },
                {
                    model: require('../model/registro'),
                    as: 'registro',
                    attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto',
                        'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'
                    ],
                    include: [
                        {
                            model: require('../model/usuario'),
                            as: 'usuario', // Usuario que creó el registro
                            attributes: ['nombre', 'paterno', 'materno']
                        },
                        {
                            model: require('../model/perfil'),
                            as: 'perfil', // Perfil del registro
                            attributes: ['perfiles']
                        },
                        {
                            model: require('../model/evento'),
                            as: 'evento', // Este alias debe coincidir con el definido en la relación
                            attributes: ['id_evento', 'nombre'],
                            where: { id_evento } // Filtro por id_evento en la tabla evento
                        }
                    ]
                },
                {
                    model: require('../model/status_registro'),
                    as: 'status', // Estatus del registro
                    attributes: ['descripcion']
                }
            ],
            where: {
                '$registro.evento.id_evento$': id_evento // Asegurar que solo se incluyan evaluadores con registros relacionados al id_evento
            }
        });

        if (evaluadores.length > 0) {
            // Obtener información del evento desde el primer registro
            const evento = evaluadores[0].registro?.evento;

            // Construir la respuesta
            const respuesta = {
                evento,
                datos: evaluadores
            };

            res.status(200).json(respuesta);
        } else {
            res.status(404).json({ message: 'No se encontraron evaluadores para este evento.' });
        }
    } catch (error) {
        console.error('Error al obtener evaluadores por evento:', error);
        res.status(500).json({ error: error.message });
    }
});



////////////filtración de evaluacion de registros para evaluador iniciada sesión 

router.get('/consulta/regevaluador/usuario/:idusuario', async (req, res) => {
    try {
        const { idusuario } = req.params; // Obtener el idusuario desde los parámetros de la URL

        // Buscar evaluadores filtrados por el usuario autenticado
        const evaluadores = await Evaluadors.findAll({
            include: [
                {
                    model: require('../model/usuario'),
                    as: 'usuario', // Usuario evaluador
                    attributes: ['nombre', 'paterno', 'materno'],
                    where: { idusuario } // Filtrar por el usuario evaluador
                },
                {
                    model: require('../model/registro'),
                    as: 'registro',
                    attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto',
                        'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'
                    ],
                    include: [
                        {
                            model: require('../model/usuario'),
                            as: 'usuario', // Usuario que creó el registro
                            attributes: ['nombre', 'paterno', 'materno']
                        },
                        {
                            model: require('../model/perfil'),
                            as: 'perfil', // Perfil del registro
                            attributes: ['perfiles']
                        },
                        {
                            model: require('../model/evento'),
                            as: 'evento', // Evento asociado
                            attributes: ['id_evento', 'nombre']
                        }
                    ]
                },
                {
                    model: require('../model/status_registro'),
                    as: 'status', // Estado del registro
                    attributes: ['descripcion']
                }
            ]
        });

        if (evaluadores.length > 0) {
            res.status(200).json({ datos: evaluadores });
        } else {
            res.status(404).json({ message: 'No se encontraron evaluadores para este usuario.' });
        }
    } catch (error) {
        console.error('Error al obtener evaluadores por usuario:', error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;