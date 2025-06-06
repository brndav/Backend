const router = require ("express").Router();
const  Programas= require ( "../model/programa");
const express = require('express');
const app = express();
const Eventos = require ( "../model/evento");



router.get('/consulta',async(req,res)=>{
    const consulta = await Programas.findAll()
    res.json(consulta)
  })
  
 

router.post("/crear", async (req, res) => {
    const datos = req.body;
  
    try {
      // Obtener el último ID y sumarle 1
      const ultimoPrograma = await Programas.findOne({
        order: [["id_programa_registro", "DESC"]],
      });
  
      let nuevoRegistro = 1; // Valor inicial si no hay HorarioDia en la base de datos
  
      if (ultimoPrograma) {
        nuevoRegistro = ultimoPrograma.id_programa_registro + 1;
      }
  
      // Crear el nuevo horarioDia con el ID calculado
      const nuevoPrograma = await Programas.create({
        id_programa_registro: datos.id_programa_registro,
        id_horario: datos.id_horario,
        id_dia_evento: datos.id_dia_evento,
        id_sala: datos.id_sala,
        id_evaluador: datos.id_evaluador,
        Liga: datos.Liga
      });
  
      res.status(201).json({
        ok: true,
        status: 201,
        message: "Programa creado correctamente",
        body: nuevoPrograma,
      });
    } catch (error) {
      console.error("Error al crear Programa", error);
      res
        .status(500)
        .json({ error: "Error interno del servidor al crear Programa" });
    }
  });
  

router.put('/actualizar/:id_programa_registro', async (req, res) => {
    const id = req.params.id_programa_registro;
    const datos = req.body;

    try {
        const update = await Programas.update({
            id_horario: datos.id_horario,
            id_dia_evento: datos.id_dia_evento,
            id_sala: datos.id_sala,
            id_evaluador: datos.id_evaluador,
            Liga: datos.Liga
        }, {
            where: { id_programa_registro: id }
        });

        if (update) {
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Programa actualizado correctamente'
            });
        } else {
            res.status(404).json({ error: 'Programa no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar Programa', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/eliminar/:id_programa_registro', async (req, res) => {
    const id = req.params.id_programa_registro;

    try {
        const borrar = await Programas.destroy({
            where: { id_programa_registro: id }
        });

        if (borrar) {
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Programa eliminado correctamente'
            });
        } else {
            res.status(404).json({ error: 'Programa no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar Programa', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});



////////////////////// CONSULTA
router.get('/programa/evento/:nombreEvento', async (req, res) => {
    try {
        const { nombreEvento } = req.params;

        // Buscar los registros de horario_dia donde el evento tiene el nombre especificado
        const resultados = await Programas.findAll({
            include: [
                {
                    model: Dias,
                    as: 'dia',
                    required: true,  // Esto asegurará que solo se incluyan los registros con una relación válida en "dia"
                    include: [
                        {
                            model: Eventos,
                            where: { nombre: nombreEvento }, // Filtro por nombre del evento
                            required: true  // Asegura que se filtren solo los eventos que coincidan con el nombre
                        }
                    ]
                }
            ]
        });

        // Si no se encuentran registros
        if (!resultados.length) {
            return res.status(404).json({ mensaje: 'No se encontraron registros para el evento seleccionado' });
        }

        res.status(200).json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
});


///////////////consulta programa muestra programa clasificado por eventos 
router.get('/consulta/todos', async (req, res) => {
    try {
        const consulta = await require('../model/programa').findAll({
            include: [ 
                {
                    model: require('../model/horario'),
                    as: 'horario', 
                    attributes: ['id_horario', 'horario_inicio', 'horario_fin']
                },
                {
                    model: require('../model/dia_evento'),
                    as: 'dia_evento', 
                    attributes: ['id_dia_evento'], 
                    include: [
                        {
                            model: require('../model/evento'),
                            as: 'evento',
                            attributes: ['id_evento', 'nombre']
                        },
                        {
                            model: require('../model/dia'),
                            as: 'dia',
                            attributes: ['id_dia', 'descripcion']
                        }
                    ]
                },
                {
                    model: require('../model/sala'),
                    as: 'sala', 
                    attributes: ['id_sala', 'descripcion']
                },
                {
                    model: require('../model/evaluador'),
                    as: 'evaluador',
                    attributes: ['id_evaluador'],
                   include:[ 
                    {
                        model: require('../model/status_registro'),
                        as: 'status',
                        attributes: ['descripcion'],
                    } ,
                        {
                            model: require('../model/info_pago'),
                            as: 'info_pago',
                            attributes: ['idinfo_pago'],
                            include: [
                                {
                                    model: require('../model/status_registro'),
                                    as: 'status',
                                    attributes: ['descripcion'],
                                }
                            ]
                        },
                        {
                            model: require('../model/registro'),
                            as: 'registro',
                            attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                                         'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'],
                            include: [
                                {
                                    model: require('../model/usuario'),
                                    as: 'usuario', 
                                    attributes: ['nombre', 'paterno', 'materno']
                                },
                                {
                                    model: require('../model/perfil'),
                                    as: 'perfil', 
                                    attributes: ['perfiles']
                                },
                                {
                                    model: require('../model/linea_eje'),
                                    as: 'linea_eje', 
                                    attributes: ['id_eje', 'id_linea']
                                },
                                {
                                    model: require('../model/forma_presentacion'),
                                    as: 'forma_presentacion', 
                                    attributes: ['descripcion']
                                },
                                {
                                    model: require('../model/mod_expo'),
                                    as: 'modalidad', 
                                    attributes: ['descripcion']
                                }
                            ]
                        }
                    ]
                }
            ],
           
        });

        if (!consulta || consulta.length === 0) {
            return res.status(404).json({ message: "No se encontraron registros." });
        }

        // Agrupar por evento
        const eventosAgrupados = {};

        consulta.forEach(programa => {
            const evento = programa.dia_evento?.evento;
            if (!evento) return; // Si no hay evento, ignorar el registro

            const idEvento = evento.id_evento;
            const nombreEvento = evento.nombre;

            if (!eventosAgrupados[idEvento]) {
                eventosAgrupados[idEvento] = {
                    id_evento: idEvento,
                    nombre: nombreEvento,
                    programas: []
                };
            }

            eventosAgrupados[idEvento].programas.push(programa);
        });

        res.json(Object.values(eventosAgrupados));

    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error en la consulta.", error });
    }
});


/////////CONSULTA PARA DETALLES DE CADA TARJETA
router.get('/consulta/:id_programa_registro', async (req, res) => {
    const id = req.params.id_programa_registro;
    try {
        const consulta = await require('../model/programa').findOne({
            where: { id_programa_registro: id },
            include: [ 
                {
                    model: require('../model/horario'),
                    as: 'horario', 
                    attributes: ['id_horario', 'horario_inicio', 'horario_fin']
                },
                {
                    model: require('../model/dia_evento'),
                    as: 'dia_evento', 
                    attributes: ['id_dia_evento', 'id_dia', 'id_evento'], // Corregido el nombre 'decripcion' a 'descripcion'
                    include: [
                        {
                            model: require('../model/evento'),
                            as: 'evento',
                            attributes: ['id_evento', 'nombre']
                        },
                        {
                            model: require('../model/dia'),
                            as: 'dia',
                            attributes: ['id_dia', 'descripcion']
                        }
                    ]
                },
                {
                    model: require('../model/sala'),
                    as: 'sala', 
                    attributes: ['id_sala', 'descripcion']
                },
                {
                    model: require('../model/evaluador'),
                    as: 'evaluador',
                    attributes: ['id_evaluador', 'idusuario', 'id_registros'], // Corregido el espacio extra en 'idusuario'
                    include: [
                        {
                            model: require('../model/registro'),
                            as: 'registro',
                            attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                                         'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'],
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
                                    model: require('../model/linea_eje'),
                                    as: 'linea_eje', // Línea de eje del registro
                                    attributes: ['id_eje', 'id_linea']
                                },
                                {
                                    model: require('../model/forma_presentacion'),
                                    as: 'forma_presentacion', // Forma de presentación
                                    attributes: ['descripcion']
                                },
                                {
                                    model: require('../model/mod_expo'),
                                    as: 'modalidad', // Modalidad del registro
                                    attributes: ['descripcion']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        
        if (consulta) {
            res.json(consulta);
        } else {
            res.status(404).json({ message: "Programa de registro no encontrado." });
        }
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error en la consulta.", error });
    }
});

////////////muestra conferencias virtuales dependiendo del evento seleccionado y agrupado por dias 
router.get('/cons/todos/confvir', async (req, res) => {
    try {
        const { idEvento } = req.query;

        if (!idEvento) {
            return res.status(400).json({ message: "El parámetro 'idEvento' es requerido." });
        }

        const consulta = await require('../model/programa').findAll({
            include: [
                {
                    model: require('../model/horario'),
                    as: 'horario',
                    attributes: ['id_horario', 'horario_inicio', 'horario_fin']
                },
                {
                    model: require('../model/dia_evento'),
                    as: 'dia_evento',
                    attributes: ['id_dia_evento', 'id_dia', 'id_evento'],
                    where: { id_evento: idEvento },
                    include: [
                        {
                            model: require('../model/evento'),
                            as: 'evento',
                            attributes: ['id_evento', 'nombre']
                        },
                        {
                            model: require('../model/dia'),
                            as: 'dia',
                            attributes: ['id_dia', 'descripcion']
                        }
                    ]
                },
                {
                    model: require('../model/sala'),
                    as: 'sala',
                    attributes: ['id_sala', 'descripcion']
                },
                {
                    model: require('../model/evaluador'),
                    as: 'evaluador',
                    required: true,
                    attributes: ['id_evaluador', 'idusuario', 'id_registros', 'id_status'],
                    include: [
                        {
                            model: require('../model/status_registro'),
                            as: 'status',
                            attributes: ['id_status', 'descripcion'],
                            where: { descripcion: 'Aprobado' }
                        },
                        {
                            model: require('../model/registro'),
                            as: 'registro',
                            required: true,
                            attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                                         'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'],
                            include: [
                                {
                                    model: require('../model/usuario'),
                                    as: 'usuario',
                                    attributes: ['nombre', 'paterno', 'materno']
                                },
                                {
                                    model: require('../model/perfil'),
                                    as: 'perfil',
                                    attributes: ['perfiles'],
                                    where: { perfiles: 'Conferencia' }
                                },
                                {
                                    model: require('../model/linea_eje'),
                                    as: 'linea_eje',
                                    attributes: ['id_eje', 'id_linea']
                                },
                                {
                                    model: require('../model/forma_presentacion'),
                                    as: 'forma_presentacion',
                                    attributes: ['descripcion']
                                },
                                {
                                    model: require('../model/mod_expo'),
                                    as: 'modalidad',
                                    attributes: ['descripcion'],
                                    where: { descripcion: 'Virtual' }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        // Si no hay resultados, responder con un mensaje
        if (consulta.length === 0) {
            return res.status(404).json({ message: "Este evento no tiene conferencias virtuales." });
        }

        // 🔹 Agrupar los resultados por día
        const programasAgrupados = consulta.reduce((acc, programa) => {
            const diaEvento = programa.dia_evento?.dia?.descripcion || "Sin día asignado";

            if (!acc[diaEvento]) {
                acc[diaEvento] = {
                    id_dia: programa.dia_evento?.dia?.id_dia,
                    descripcion: diaEvento,
                    programas: []
                };
            }

            acc[diaEvento].programas.push(programa);
            return acc;
        }, {});

        // Convertir el objeto en un array
        const resultadoFinal = Object.values(programasAgrupados);

        res.json(resultadoFinal);
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error en la consulta.", error });
    }
});

/////////// consulta para obtener todos los programas conferencias presenciales
    router.get('/cons/todos/confpresen', async (req, res) => {
        try {
            const { idEvento } = req.query;
    
            if (!idEvento) {
                return res.status(400).json({ message: "El parámetro 'idEvento' es requerido." });
            }
    
            const consulta = await require('../model/programa').findAll({
                include: [
                    {
                        model: require('../model/horario'),
                        as: 'horario',
                        attributes: ['id_horario', 'horario_inicio', 'horario_fin']
                    },
                    {
                        model: require('../model/dia_evento'),
                        as: 'dia_evento',
                        attributes: ['id_dia_evento', 'id_dia', 'id_evento'],
                        where: { id_evento: idEvento },
                        include: [
                            {
                                model: require('../model/evento'),
                                as: 'evento',
                                attributes: ['id_evento', 'nombre']
                            },
                            {
                                model: require('../model/dia'),
                                as: 'dia',
                                attributes: ['id_dia', 'descripcion']
                            }
                        ]
                    },
                    {
                        model: require('../model/sala'),
                        as: 'sala',
                        attributes: ['id_sala', 'descripcion']
                    },
                    {
                        model: require('../model/evaluador'),
                        as: 'evaluador',
                        required: true,
                        attributes: ['id_evaluador', 'idusuario', 'id_registros', 'id_status'],
                        include: [
                            {
                                model: require('../model/status_registro'),
                                as: 'status',
                                attributes: ['id_status', 'descripcion'],
                                where: { descripcion: 'Aprobado' }
                            },
                            {
                                model: require('../model/registro'),
                                as: 'registro',
                                required: true,
                                attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                                             'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'],
                                include: [
                                    {
                                        model: require('../model/usuario'),
                                        as: 'usuario',
                                        attributes: ['nombre', 'paterno', 'materno']
                                    },
                                    {
                                        model: require('../model/perfil'),
                                        as: 'perfil',
                                        attributes: ['perfiles'],
                                        where: { perfiles: 'Conferencia' }
                                    },
                                    {
                                        model: require('../model/linea_eje'),
                                        as: 'linea_eje',
                                        attributes: ['id_eje', 'id_linea']
                                    },
                                    {
                                        model: require('../model/forma_presentacion'),
                                        as: 'forma_presentacion',
                                        attributes: ['descripcion']
                                    },
                                    {
                                        model: require('../model/mod_expo'),
                                        as: 'modalidad',
                                        attributes: ['descripcion'],
                                        where: { descripcion: 'Presencial' }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
    
            // Si no hay resultados, responder con un mensaje
            if (consulta.length === 0) {
                return res.status(404).json({ message: "Este evento no tiene conferencias presenciales." });
            }
    
            // 🔹 Agrupar los resultados por día
            const programasAgrupados = consulta.reduce((acc, programa) => {
                const diaEvento = programa.dia_evento?.dia?.descripcion || "Sin día asignado";
    
                if (!acc[diaEvento]) {
                    acc[diaEvento] = {
                        id_dia: programa.dia_evento?.dia?.id_dia,
                        descripcion: diaEvento,
                        programas: []
                    };
                }
    
                acc[diaEvento].programas.push(programa);
                return acc;
            }, {});
    
            // Convertir el objeto en un array
            const resultadoFinal = Object.values(programasAgrupados);
    
            res.json(resultadoFinal);
        } catch (error) {
            console.error("Error al realizar la consulta:", error);
            res.status(500).json({ message: "Error en la consulta.", error });
        }
    });
    

/////////// consulta para obtener todos los programas Taller presencial
    router.get('/cons/todos/tallerpresen', async (req, res) => {
        try {
            const { idEvento } = req.query;
    
            if (!idEvento) {
                return res.status(400).json({ message: "El parámetro 'idEvento' es requerido." });
            }
    
            const consulta = await require('../model/programa').findAll({
                include: [
                    {
                        model: require('../model/horario'),
                        as: 'horario',
                        attributes: ['id_horario', 'horario_inicio', 'horario_fin']
                    },
                    {
                        model: require('../model/dia_evento'),
                        as: 'dia_evento',
                        attributes: ['id_dia_evento', 'id_dia', 'id_evento'],
                        where: { id_evento: idEvento },
                        include: [
                            {
                                model: require('../model/evento'),
                                as: 'evento',
                                attributes: ['id_evento', 'nombre']
                            },
                            {
                                model: require('../model/dia'),
                                as: 'dia',
                                attributes: ['id_dia', 'descripcion']
                            }
                        ]
                    },
                    {
                        model: require('../model/sala'),
                        as: 'sala',
                        attributes: ['id_sala', 'descripcion']
                    },
                    {
                        model: require('../model/evaluador'),
                        as: 'evaluador',
                        required: true,
                        attributes: ['id_evaluador', 'idusuario', 'id_registros', 'id_status'],
                        include: [
                            {
                                model: require('../model/status_registro'),
                                as: 'status',
                                attributes: ['id_status', 'descripcion'],
                                where: { descripcion: 'Aprobado' }
                            },
                            {
                                model: require('../model/registro'),
                                as: 'registro',
                                required: true,
                                attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                                             'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'],
                                include: [
                                    {
                                        model: require('../model/usuario'),
                                        as: 'usuario',
                                        attributes: ['nombre', 'paterno', 'materno']
                                    },
                                    {
                                        model: require('../model/perfil'),
                                        as: 'perfil',
                                        attributes: ['perfiles'],
                                        where: { perfiles: 'Taller' }
                                    },
                                    {
                                        model: require('../model/linea_eje'),
                                        as: 'linea_eje',
                                        attributes: ['id_eje', 'id_linea']
                                    },
                                    {
                                        model: require('../model/forma_presentacion'),
                                        as: 'forma_presentacion',
                                        attributes: ['descripcion']
                                    },
                                    {
                                        model: require('../model/mod_expo'),
                                        as: 'modalidad',
                                        attributes: ['descripcion'],
                                        where: { descripcion: 'Presencial' }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
    
            // Si no hay resultados, responder con un mensaje
            if (consulta.length === 0) {
                return res.status(404).json({ message: "Este evento no tiene talleres presenciales." });
            }
    
            // 🔹 Agrupar los resultados por día
            const programasAgrupados = consulta.reduce((acc, programa) => {
                const diaEvento = programa.dia_evento?.dia?.descripcion || "Sin día asignado";
    
                if (!acc[diaEvento]) {
                    acc[diaEvento] = {
                        id_dia: programa.dia_evento?.dia?.id_dia,
                        descripcion: diaEvento,
                        programas: []
                    };
                }
    
                acc[diaEvento].programas.push(programa);
                return acc;
            }, {});
    
            // Convertir el objeto en un array
            const resultadoFinal = Object.values(programasAgrupados);
    
            res.json(resultadoFinal);
        } catch (error) {
            console.error("Error al realizar la consulta:", error);
            res.status(500).json({ message: "Error en la consulta.", error });
        }
    });
    
/////////// consulta para obtener todos los programas Taller virtual
    router.get('/cons/todos/tallervir', async (req, res) => {
        try {
            const { idEvento } = req.query;
    
            if (!idEvento) {
                return res.status(400).json({ message: "El parámetro 'idEvento' es requerido." });
            }
    
            const consulta = await require('../model/programa').findAll({
                include: [
                    {
                        model: require('../model/horario'),
                        as: 'horario',
                        attributes: ['id_horario', 'horario_inicio', 'horario_fin']
                    },
                    {
                        model: require('../model/dia_evento'),
                        as: 'dia_evento',
                        attributes: ['id_dia_evento', 'id_dia', 'id_evento'],
                        where: { id_evento: idEvento },
                        include: [
                            {
                                model: require('../model/evento'),
                                as: 'evento',
                                attributes: ['id_evento', 'nombre']
                            },
                            {
                                model: require('../model/dia'),
                                as: 'dia',
                                attributes: ['id_dia', 'descripcion']
                            }
                        ]
                    },
                    {
                        model: require('../model/sala'),
                        as: 'sala',
                        attributes: ['id_sala', 'descripcion']
                    },
                    {
                        model: require('../model/evaluador'),
                        as: 'evaluador',
                        required: true,
                        attributes: ['id_evaluador', 'idusuario', 'id_registros', 'id_status'],
                        include: [
                            {
                                model: require('../model/status_registro'),
                                as: 'status',
                                attributes: ['id_status', 'descripcion'],
                                where: { descripcion: 'Aprobado' }
                            },
                            {
                                model: require('../model/registro'),
                                as: 'registro',
                                required: true,
                                attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                                             'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'],
                                include: [
                                    {
                                        model: require('../model/usuario'),
                                        as: 'usuario',
                                        attributes: ['nombre', 'paterno', 'materno']
                                    },
                                    {
                                        model: require('../model/perfil'),
                                        as: 'perfil',
                                        attributes: ['perfiles'],
                                        where: { perfiles: 'Taller' }
                                    },
                                    {
                                        model: require('../model/linea_eje'),
                                        as: 'linea_eje',
                                        attributes: ['id_eje', 'id_linea']
                                    },
                                    {
                                        model: require('../model/forma_presentacion'),
                                        as: 'forma_presentacion',
                                        attributes: ['descripcion']
                                    },
                                    {
                                        model: require('../model/mod_expo'),
                                        as: 'modalidad',
                                        attributes: ['descripcion'],
                                        where: { descripcion: 'Virtual' }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
    
            // Si no hay resultados, responder con un mensaje
            if (consulta.length === 0) {
                return res.status(404).json({ message: "Este evento no tiene talleres virtuales." });
            }
    
            // 🔹 Agrupar los resultados por día
            const programasAgrupados = consulta.reduce((acc, programa) => {
                const diaEvento = programa.dia_evento?.dia?.descripcion || "Sin día asignado";
    
                if (!acc[diaEvento]) {
                    acc[diaEvento] = {
                        id_dia: programa.dia_evento?.dia?.id_dia,
                        descripcion: diaEvento,
                        programas: []
                    };
                }
    
                acc[diaEvento].programas.push(programa);
                return acc;
            }, {});
    
            // Convertir el objeto en un array
            const resultadoFinal = Object.values(programasAgrupados);
    
            res.json(resultadoFinal);
        } catch (error) {
            console.error("Error al realizar la consulta:", error);
            res.status(500).json({ message: "Error en la consulta.", error });
        }
    });

/////////// consulta para obtener todos los programas Ponencia virtual
    router.get('/cons/todos/ponvir', async (req, res) => {
        try {
            const { idEvento } = req.query;
    
            if (!idEvento) {
                return res.status(400).json({ message: "El parámetro 'idEvento' es requerido." });
            }
    
            const consulta = await require('../model/programa').findAll({
                include: [
                    {
                        model: require('../model/horario'),
                        as: 'horario',
                        attributes: ['id_horario', 'horario_inicio', 'horario_fin']
                    },
                    {
                        model: require('../model/dia_evento'),
                        as: 'dia_evento',
                        attributes: ['id_dia_evento', 'id_dia', 'id_evento'],
                        where: { id_evento: idEvento },
                        include: [
                            {
                                model: require('../model/evento'),
                                as: 'evento',
                                attributes: ['id_evento', 'nombre']
                            },
                            {
                                model: require('../model/dia'),
                                as: 'dia',
                                attributes: ['id_dia', 'descripcion']
                            }
                        ]
                    },
                    {
                        model: require('../model/sala'),
                        as: 'sala',
                        attributes: ['id_sala', 'descripcion']
                    },
                    {
                        model: require('../model/evaluador'),
                        as: 'evaluador',
                        required: true,
                        attributes: ['id_evaluador', 'idusuario', 'id_registros', 'id_status'],
                        include: [
                            {
                                model: require('../model/status_registro'),
                                as: 'status',
                                attributes: ['id_status', 'descripcion'],
                                where: { descripcion: 'Aprobado' }
                            },
                            {
                                model: require('../model/registro'),
                                as: 'registro',
                                required: true,
                                attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                                             'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'],
                                include: [
                                    {
                                        model: require('../model/usuario'),
                                        as: 'usuario',
                                        attributes: ['nombre', 'paterno', 'materno']
                                    },
                                    {
                                        model: require('../model/perfil'),
                                        as: 'perfil',
                                        attributes: ['perfiles'],
                                        where: { perfiles: 'Ponencia' }
                                    },
                                    {
                                        model: require('../model/linea_eje'),
                                        as: 'linea_eje',
                                        attributes: ['id_eje', 'id_linea']
                                    },
                                    {
                                        model: require('../model/forma_presentacion'),
                                        as: 'forma_presentacion',
                                        attributes: ['descripcion']
                                    },
                                    {
                                        model: require('../model/mod_expo'),
                                        as: 'modalidad',
                                        attributes: ['descripcion'],
                                        where: { descripcion: 'Virtual' }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
    
            // Si no hay resultados, responder con un mensaje
            if (consulta.length === 0) {
                return res.status(404).json({ message: "Este evento no tiene ponencias virtuales." });
            }
    
            // 🔹 Agrupar los resultados por día
            const programasAgrupados = consulta.reduce((acc, programa) => {
                const diaEvento = programa.dia_evento?.dia?.descripcion || "Sin día asignado";
    
                if (!acc[diaEvento]) {
                    acc[diaEvento] = {
                        id_dia: programa.dia_evento?.dia?.id_dia,
                        descripcion: diaEvento,
                        programas: []
                    };
                }
    
                acc[diaEvento].programas.push(programa);
                return acc;
            }, {});
    
            // Convertir el objeto en un array
            const resultadoFinal = Object.values(programasAgrupados);
    
            res.json(resultadoFinal);
        } catch (error) {
            console.error("Error al realizar la consulta:", error);
            res.status(500).json({ message: "Error en la consulta.", error });
        }
    });

/////////// consulta para obtener todos los programas Ponencia presencial
    router.get('/cons/todos/ponpresen', async (req, res) => {
        try {
            const { idEvento } = req.query;
    
            if (!idEvento) {
                return res.status(400).json({ message: "El parámetro 'idEvento' es requerido." });
            }
    
            const consulta = await require('../model/programa').findAll({
                include: [
                    {
                        model: require('../model/horario'),
                        as: 'horario',
                        attributes: ['id_horario', 'horario_inicio', 'horario_fin']
                    },
                    {
                        model: require('../model/dia_evento'),
                        as: 'dia_evento',
                        attributes: ['id_dia_evento', 'id_dia', 'id_evento'],
                        where: { id_evento: idEvento },
                        include: [
                            {
                                model: require('../model/evento'),
                                as: 'evento',
                                attributes: ['id_evento', 'nombre']
                            },
                            {
                                model: require('../model/dia'),
                                as: 'dia',
                                attributes: ['id_dia', 'descripcion']
                            }
                        ]
                    },
                    {
                        model: require('../model/sala'),
                        as: 'sala',
                        attributes: ['id_sala', 'descripcion']
                    },
                    {
                        model: require('../model/evaluador'),
                        as: 'evaluador',
                        required: true,
                        attributes: ['id_evaluador', 'idusuario', 'id_registros', 'id_status'],
                        include: [
                            {
                                model: require('../model/status_registro'),
                                as: 'status',
                                attributes: ['id_status', 'descripcion'],
                                where: { descripcion: 'Aprobado' }
                            },
                            {
                                model: require('../model/registro'),
                                as: 'registro',
                                required: true,
                                attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                                             'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'],
                                include: [
                                    {
                                        model: require('../model/usuario'),
                                        as: 'usuario',
                                        attributes: ['nombre', 'paterno', 'materno']
                                    },
                                    {
                                        model: require('../model/perfil'),
                                        as: 'perfil',
                                        attributes: ['perfiles'],
                                        where: { perfiles: 'Ponencia' }
                                    },
                                    {
                                        model: require('../model/linea_eje'),
                                        as: 'linea_eje',
                                        attributes: ['id_eje', 'id_linea']
                                    },
                                    {
                                        model: require('../model/forma_presentacion'),
                                        as: 'forma_presentacion',
                                        attributes: ['descripcion']
                                    },
                                    {
                                        model: require('../model/mod_expo'),
                                        as: 'modalidad',
                                        attributes: ['descripcion'],
                                        where: { descripcion: 'Presencial' }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
    
            // Si no hay resultados, responder con un mensaje
            if (consulta.length === 0) {
                return res.status(404).json({ message: "Este evento no tiene Ponencia presencial." });
            }
    
            // 🔹 Agrupar los resultados por día
            const programasAgrupados = consulta.reduce((acc, programa) => {
                const diaEvento = programa.dia_evento?.dia?.descripcion || "Sin día asignado";
    
                if (!acc[diaEvento]) {
                    acc[diaEvento] = {
                        id_dia: programa.dia_evento?.dia?.id_dia,
                        descripcion: diaEvento,
                        programas: []
                    };
                }
    
                acc[diaEvento].programas.push(programa);
                return acc;
            }, {});
    
            // Convertir el objeto en un array
            const resultadoFinal = Object.values(programasAgrupados);
    
            res.json(resultadoFinal);
        } catch (error) {
            console.error("Error al realizar la consulta:", error);
            res.status(500).json({ message: "Error en la consulta.", error });
        }
    });

/////////// consulta para obtener todos los programas Cartel presencial
    router.get('/cons/todos/carpresen', async (req, res) => {
        try {
            const { idEvento } = req.query;
    
            if (!idEvento) {
                return res.status(400).json({ message: "El parámetro 'idEvento' es requerido." });
            }
    
            const consulta = await require('../model/programa').findAll({
                include: [
                    {
                        model: require('../model/horario'),
                        as: 'horario',
                        attributes: ['id_horario', 'horario_inicio', 'horario_fin']
                    },
                    {
                        model: require('../model/dia_evento'),
                        as: 'dia_evento',
                        attributes: ['id_dia_evento', 'id_dia', 'id_evento'],
                        where: { id_evento: idEvento },
                        include: [
                            {
                                model: require('../model/evento'),
                                as: 'evento',
                                attributes: ['id_evento', 'nombre']
                            },
                            {
                                model: require('../model/dia'),
                                as: 'dia',
                                attributes: ['id_dia', 'descripcion']
                            }
                        ]
                    },
                    {
                        model: require('../model/sala'),
                        as: 'sala',
                        attributes: ['id_sala', 'descripcion']
                    },
                    {
                        model: require('../model/evaluador'),
                        as: 'evaluador',
                        required: true,
                        attributes: ['id_evaluador', 'idusuario', 'id_registros', 'id_status'],
                        include: [
                            {
                                model: require('../model/status_registro'),
                                as: 'status',
                                attributes: ['id_status', 'descripcion'],
                                where: { descripcion: 'Aprobado' }
                            },
                            {
                                model: require('../model/registro'),
                                as: 'registro',
                                required: true,
                                attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                                             'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'],
                                include: [
                                    {
                                        model: require('../model/usuario'),
                                        as: 'usuario',
                                        attributes: ['nombre', 'paterno', 'materno']
                                    },
                                    {
                                        model: require('../model/perfil'),
                                        as: 'perfil',
                                        attributes: ['perfiles'],
                                        where: { perfiles: 'Carteles' }
                                    },
                                    {
                                        model: require('../model/linea_eje'),
                                        as: 'linea_eje',
                                        attributes: ['id_eje', 'id_linea']
                                    },
                                    {
                                        model: require('../model/forma_presentacion'),
                                        as: 'forma_presentacion',
                                        attributes: ['descripcion']
                                    },
                                    {
                                        model: require('../model/mod_expo'),
                                        as: 'modalidad',
                                        attributes: ['descripcion'],
                                        where: { descripcion: 'Presencial' }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
    
            // Si no hay resultados, responder con un mensaje
            if (consulta.length === 0) {
                return res.status(404).json({ message: "Este evento no tiene Cartel presencial." });
            }
    
            // 🔹 Agrupar los resultados por día
            const programasAgrupados = consulta.reduce((acc, programa) => {
                const diaEvento = programa.dia_evento?.dia?.descripcion || "Sin día asignado";
    
                if (!acc[diaEvento]) {
                    acc[diaEvento] = {
                        id_dia: programa.dia_evento?.dia?.id_dia,
                        descripcion: diaEvento,
                        programas: []
                    };
                }
    
                acc[diaEvento].programas.push(programa);
                return acc;
            }, {});
    
            // Convertir el objeto en un array
            const resultadoFinal = Object.values(programasAgrupados);
    
            res.json(resultadoFinal);
        } catch (error) {
            console.error("Error al realizar la consulta:", error);
            res.status(500).json({ message: "Error en la consulta.", error });
        }
    });

/////////// consulta para obtener todos los programas Cartel virtual
    router.get('/cons/todos/carvir', async (req, res) => {
        try {
            const { idEvento } = req.query;
    
            if (!idEvento) {
                return res.status(400).json({ message: "El parámetro 'idEvento' es requerido." });
            }
    
            const consulta = await require('../model/programa').findAll({
                include: [
                    {
                        model: require('../model/horario'),
                        as: 'horario',
                        attributes: ['id_horario', 'horario_inicio', 'horario_fin']
                    },
                    {
                        model: require('../model/dia_evento'),
                        as: 'dia_evento',
                        attributes: ['id_dia_evento', 'id_dia', 'id_evento'],
                        where: { id_evento: idEvento },
                        include: [
                            {
                                model: require('../model/evento'),
                                as: 'evento',
                                attributes: ['id_evento', 'nombre']
                            },
                            {
                                model: require('../model/dia'),
                                as: 'dia',
                                attributes: ['id_dia', 'descripcion']
                            }
                        ]
                    },
                    {
                        model: require('../model/sala'),
                        as: 'sala',
                        attributes: ['id_sala', 'descripcion']
                    },
                    {
                        model: require('../model/evaluador'),
                        as: 'evaluador',
                        required: true,
                        attributes: ['id_evaluador', 'idusuario', 'id_registros', 'id_status'],
                        include: [
                            {
                                model: require('../model/status_registro'),
                                as: 'status',
                                attributes: ['id_status', 'descripcion'],
                                where: { descripcion: 'Aprobado' }
                            },
                            {
                                model: require('../model/registro'),
                                as: 'registro',
                                required: true,
                                attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                                             'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad'],
                                include: [
                                    {
                                        model: require('../model/usuario'),
                                        as: 'usuario',
                                        attributes: ['nombre', 'paterno', 'materno']
                                    },
                                    {
                                        model: require('../model/perfil'),
                                        as: 'perfil',
                                        attributes: ['perfiles'],
                                        where: { perfiles: 'Carteles' }
                                    },
                                    {
                                        model: require('../model/linea_eje'),
                                        as: 'linea_eje',
                                        attributes: ['id_eje', 'id_linea']
                                    },
                                    {
                                        model: require('../model/forma_presentacion'),
                                        as: 'forma_presentacion',
                                        attributes: ['descripcion']
                                    },
                                    {
                                        model: require('../model/mod_expo'),
                                        as: 'modalidad',
                                        attributes: ['descripcion'],
                                        where: { descripcion: 'Virtual' }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
    
            // Si no hay resultados, responder con un mensaje
            if (consulta.length === 0) {
                return res.status(404).json({ message: "Este evento no tiene Cartel presencial." });
            }
    
            // 🔹 Agrupar los resultados por día
            const programasAgrupados = consulta.reduce((acc, programa) => {
                const diaEvento = programa.dia_evento?.dia?.descripcion || "Sin día asignado";
    
                if (!acc[diaEvento]) {
                    acc[diaEvento] = {
                        id_dia: programa.dia_evento?.dia?.id_dia,
                        descripcion: diaEvento,
                        programas: []
                    };
                }
    
                acc[diaEvento].programas.push(programa);
                return acc;
            }, {});
    
            // Convertir el objeto en un array
            const resultadoFinal = Object.values(programasAgrupados);
    
            res.json(resultadoFinal);
        } catch (error) {
            console.error("Error al realizar la consulta:", error);
            res.status(500).json({ message: "Error en la consulta.", error });
        }
    });
module.exports = router; 