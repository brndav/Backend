const router = require ("express").Router();
const moment = require('moment');
const Registros = require ( "../model/registro");
const express = require('express');
const app = express();
const Autor = require ( "../model/autores");
const { Op } = require('sequelize');

router.get("/consulta/admin", async (req, res) => {
    try {
      const consulta = await Registros.findAll();
      res.status(200).json(consulta);
    } catch (error) {
      console.error("Error al consultar RegistroUsuario", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

//////////////consulta registros agrupados por evento /////
router.get('/consulta/todos', async (req, res) => {
  try {
    const registros = await Registros.findAll({
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
        },
        {
          model: require('../model/evento'),
          as: 'evento',
          attributes: ['id_evento', 'nombre']
        }
      ],
      attributes: [
        'id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto',
        'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad', 'id_evento'
      ]
    });

    if (!registros || registros.length === 0) {
      return res.status(404).json({ message: "No se encontraron registros." });
    }

    // Agrupar por evento y dentro de cada evento por perfil
    const eventosAgrupados = {};

    registros.forEach(registro => {
      const evento = registro.evento;
      const perfil = registro.perfil;

      if (!evento || !perfil) return; // Si no hay evento o perfil, ignorar el registro

      const idEvento = evento.id_evento;
      const nombreEvento = evento.nombre;
      const idPerfil = registro.id_perfil;
      const nombrePerfil = perfil.perfiles;

      if (!eventosAgrupados[idEvento]) {
        eventosAgrupados[idEvento] = {
          id_evento: idEvento,
          nombre: nombreEvento,
          perfiles: {} // Agrupar por perfiles dentro de cada evento
        };
      }

      if (!eventosAgrupados[idEvento].perfiles[idPerfil]) {
        eventosAgrupados[idEvento].perfiles[idPerfil] = {
          id_perfil: idPerfil,
          nombre_perfil: nombrePerfil,
          registros: [] // Aquí guardamos los registros para cada perfil
        };
      }

      eventosAgrupados[idEvento].perfiles[idPerfil].registros.push(registro);
    });

    // Transformamos para que la respuesta sea un array en lugar de un objeto
    const eventosTransformados = Object.values(eventosAgrupados).map(evento => ({
      ...evento,
      perfiles: Object.values(evento.perfiles)
    }));

    res.json(eventosTransformados);

  } catch (error) {
    console.error('Error al consultar registros agrupados por evento y perfil:', error);
    res.status(500).json({ message: 'Error en la consulta.', error });
  }
});


////////////////// consulta para filtrar registros dependiendo del evento y perfil
router.get('/registro/evento-perfil', async (req, res) => {
  const idPerfil = req.query.perfiles; // Perfil seleccionado
  const idEvento = req.query.evento;  // Evento seleccionado

  try {
      const registros = await Registros.findAll({
          include: [
              {
                  model: require('../model/usuario'),
                  as: 'usuario',
                  attributes: ['nombre', 'paterno', 'materno'] // Atributos que quieres mostrar
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
              },
              {
                  model: require('../model/evento'),
                  as: 'evento',
                  attributes: ['id_evento', 'nombre']
              }
          ],
          attributes: [
              'id_registros',
              'titulo',
              'resumen',
              'abstract',
              'resena_curricular',
              'foto',
              'idusuario',
              'id_perfil',
              'id_linea_eje',
              'id_forma',
              'id_modalidad',
              'id_evento',
          ],
          where: {
              id_perfil: idPerfil, // Filtro por perfil
              id_evento: idEvento  // Filtro por evento
          }
      });

      res.json(registros);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

////////////// consulta para extraer los datos del registro de un usuario especifico 

  router.get('/consulta/usuarioreg/:idusuario', async (req, res) => {
    const { idusuario } = req.params; // Obtenemos el idusuario de los parámetros de la URL
  
    try {
      const registros = await Registros.findAll({
        where: { idusuario: idusuario }, // Filtra por idusuario
        include: [
          {
            model: require('../model/usuario'),
            as: 'usuario',
            attributes: ['nombre', 'paterno', 'materno'] // Atributos que quieres mostrar
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
          },
          {
            model: require('../model/evento'),
            as: 'evento',
            attributes: ['id_evento','nombre']
          }
        ],
        attributes: [
          'id_registros', 
          'titulo', 
          'resumen', 
          'abstract', 
          'resena_curricular', 
          'foto', 
          'idusuario', 
          'id_perfil', 
          'id_linea_eje', 
          'id_forma', 
          'id_modalidad',
          'id_evento',
        ]
      });
  
      // Verificar si se encontraron registros
      if (registros.length > 0) {
        res.status(200).json(registros);
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });
  

  router.get('/consulta/:nom', async (req, res) => {
    try {
        const registros = await Registros.findAll({
            include: [
                {
                    model: require('../model/usuario'),
                    as: 'usuario', // Asegúrate de usar el mismo alias
                    attributes: ['nombre', 'paterno', 'materno']
                },
                {
                    model: require('../model/perfil'),
                    as: 'perfil', // Asegúrate de usar el mismo alias
                    attributes: ['perfiles']
                },
                {
                    model: require('../model/linea_eje'),
                    as: 'linea_eje', // Asegúrate de usar el mismo alias
                    attributes: ['id_eje', 'id_linea']
                },
                {
                    model: require('../model/forma_presentacion'),
                    as: 'forma_presentacion', // Asegúrate de usar el mismo alias
                    attributes: ['descripcion']
                },
                {
                    model: require('../model/mod_expo'),
                    as: 'modalidad', // Asegúrate de usar el mismo alias
                    attributes: ['descripcion']
                },
                {
                  model: require('../model/evento'),
                  as: 'evento',
                  attributes: ['nombre']
                }
            ],
            attributes: ['id_registros', 'titulo', 'resumen', 'abstract', 'resena_curricular', 'foto', 
                'idusuario', 'id_perfil', 'id_linea_eje', 'id_forma', 'id_modalidad','id_evento']
        });

        res.json(registros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/consulta/tarjeta/nom', async (req, res) => {
  try {
    const registros = await Registros.findAll({
      attributes: ['id_registros', 'titulo'], // Solo ID y título
      include: [
        {
          model: require('../model/usuario'),
          as: 'usuario',
          attributes: ['nombre', 'paterno', 'materno'] // Solo trae el nombre del usuario
        }
      ]
    });

    console.log(JSON.stringify(registros, null, 2)); // Para verificar los datos
    res.json(registros); // Devuelve solo ID y título junto con el nombre del usuario
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get('/consulta/:id_registros',async(req,res)=>{
    const id = req.params.id_registros;
    const consulta = await Registros.findOne({
        where: {id_registros:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})


router.put('/actualizar/admin/:id_registros', async (req, res) => {
  const id = req.params.id_registros;  // Aquí obtenemos el id_registros desde los parámetros de la ruta
  const datos = req.body;

  try {
    const update = await Registros.update({
      titulo: datos.titulo,
      resumen: datos.resumen,
      abstract: datos.abstract,
      resena_curricular: datos.resena_curricular,
      foto: datos.foto,
      idusuario: datos.idusuario,
      id_perfil: datos.id_perfil,
      id_linea_eje: datos.id_linea_eje,
      id_forma: datos.id_forma,
      id_modalidad: datos.id_modalidad,
      id_evento: datos.id_evento,
      fecha_registro: moment().format('YYYY-MM-DD HH:mm:ss') 
    }, {
      where: { 
        id_registros: id,  // Utilizamos el id recuperado de los parámetros
      }
    });
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'Registro actualizado correctamente',
      body: update
    });
  } catch (error) {
    console.error('Error al actualizar registro', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


router.delete('/eliminar/:id_registros', async (req, res) => {
    const id = req.params.id_registros;
    const borrar = await Registros.destroy({
        where: {
            id_registros: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});





//////////////////////Registro Ponenciaa//////////////////////////////////
router.get('/consulta', async (req, res) => {
  try {
    const registros = await Registros.findAll({
      include: [{ model: Autor, as: 'autores' }] // Incluye autores asociados
    });
    res.status(200).json({
      ok: true,
      status: 200,
      body: registros
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id_registros',async(req,res)=>{
  const id = req.params.id_registros;
  const consulta = await Registros.findOne({
      where: {id_registros:id}
  })
  res.status(200).json({
      ok:true,
      status:200,
      body:consulta
  })
})

router.get('/usuario/:idusuario', async (req, res) => {
  const idusuario = parseInt(req.params.idusuario, 10);

  if (isNaN(idusuario)) {
    return res.status(400).json({
      msg: 'ID de usuario no válido'
    });
  }

  try {
    const registros = await Registros.findAll({
      where: { idusuario }
    });

    if (registros.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron registros para este usuario'
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      body: registros
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error del servidor'
    });
  }
})

router.post('/crear', async (req, res) => {
  const datos = req.body;
  try {
    // Crear el registro
    const nuevoRegistro = await Registros.create({
      titulo: datos.titulo,
      resumen: datos.resumen,
      abstract: datos.abstract,
      resena_curricular: datos.resena_curricular,
      foto: datos.foto,
      idusuario: datos.id_usuario,
      id_linea_eje: datos.id_linea_eje,
      id_forma: datos.id_forma,
      id_modalidad: datos.id_modalidad,
      id_perfil: datos.id_perfil,
      id_evento:datos.id_evento,
      fecha_registro: moment().format('YYYY-MM-DD HH:mm:ss')  // Capturar la fecha actual
    });

    // Responder con el id_registro generado
    res.status(201).json({
      ok: true,
      message: "Registro creado correctamente",
      id_registro: nuevoRegistro.id_registros  // Enviar el id_registro
    });
  } catch (error) {
    console.error('Error al crear registro:', error);
    
  }
});




module.exports = router;