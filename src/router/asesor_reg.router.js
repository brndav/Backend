const router= require ("express").Router();
const Asesor_reg = require ("../model/asesor_reg");
const express = require ("express");
const { Sequelize } = require('sequelize');
const { Op } = Sequelize;
const app = express();

router.get("/consulta", async (req, res) => {
    try {
      const consulta = await Asesor_reg.findAll();
      res.status(200).json(consulta);
    } catch (error) {
      console.error("Error al consultar Asesor del registro", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  
  router.post("/crear", async (req, res) => {
    const datos = req.body;
  
    try {
      // Obtener el último ID y sumarle 1
      const ultimoAsesorReg = await Asesor_reg.findOne({
        order: [["id_asesor_reg", "DESC"]],
      });
      
      let nuevoAsesorReg = 1; // Valor inicial si no hay Asesor en la base de datos
  
      if (ultimoAsesorReg) {
        nuevoAsesorReg = ultimoAsesorReg.id_asesor_reg + 1;
      }
      // Crear el nuevo asesor reg con el ID calculado
      const nuevooAsesorReg= await Asesor_reg.create({
        id_asesor_reg: datos.id_asesor_reg,
        id_perfil_datosgen: datos.id_perfil_datosgen,
       id_registros: datos.id_registros,
      });

      
      res.status(201).json({
        ok: true,
        status: 201,
        message: "Asesor Reg creado correctamente",
        body: nuevooAsesorReg,
      });
    } catch (error) {
      console.error("Error al crear ASESOR REG", error);
      res
        .status(500)
        .json({ error: "Error interno del servidor al crear registro" });
    }
  });



router.put('/actualizar/:id_asesor_reg', async (req, res) => {
  const id = req.params.id_asesor_reg;  // Aquí obtenemos el id_registros desde los parámetros de la ruta
  const datos = req.body;

  try {
    const update = await Asesor_reg.update({
        idusuario: datos.idusuario,
        id_registros: datos.id_registros,
    }, {
      where: { 
        id_asesor_reg: id,  // Utilizamos el id recuperado de los parámetros
      }
    });
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'Asesor actualizado correctamente',
      body: update
    });
  } catch (error) {
    console.error('Error al actualizar Asesor', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


router.delete('/eliminar/:id_asesor_reg', async (req, res) => {
    const id = req.params.id_asesor_reg;
    const borrar = await Asesor_reg.destroy({
        where: {
            id_asesor_reg: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});

/* router.get('/consulta/nom/id_usuario', async (req, res) => {
    try {
      const asesor = await Asesor_reg.findAll({
        attributes: ['id_asesor_reg'], // Solo ID y título
        include: [
          {
            model: require('../model/perfil_datosgen.model'),
            as: 'perfil_datosgen',
            attributes: ['idusuario','id_perfil',] 
          }
        ]
      });
  
      console.log(JSON.stringify(asesor, null, 2)); // Para verificar los datos
      res.json(asesor); // Devuelve solo ID 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }); */

 
/////////CONSULTA PARA DETALLES TABLA ADMINISTRADOR muestra todos los registros que le corresponden a cada asesor
router.get('/consulta/todos', async (req, res) => {
  try {
      // Obtenemos los registros con asesores relacionados
      const consulta = await require('../model/registro').findAll({
          attributes: [
              'id_registros', 'titulo', 'resumen'
          ],
          include: [
              {
                  model: require('../model/usuario'),
                  as: 'usuario', // Usuario que creó el registro
                  attributes: ['nombre', 'paterno', 'materno']
              },
              {
                  model: require('../model/asesor_reg'),
                  as: 'asesores', // Relación con asesores
                  where: { // Filtro para solo incluir registros con asesores
                      id_registros: { [Sequelize.Op.ne]: null } // Asegura que haya al menos un asesor
                  },
                  include: [
                      {
                          model: require('../model/perfil_datosgen'),
                          as: 'perfil_datosgen', // Datos generales del perfil
                          include: [
                              {
                                  model: require('../model/usuario'),
                                  as: 'usuario', // Usuario que es asesor
                                  attributes: ['nombre', 'paterno', 'materno']
                              },
                              {
                                  model: require('../model/perfil'),
                                  as: 'perfil', // Datos del perfil
                                  attributes: ['perfiles']
                              }
                          ]
                      }
                  ]
              }
          ]
      });

      // Si encontramos registros, los agrupamos por id_registros
      if (consulta.length > 0) {
          // Agrupamos por id_registros
          const resultado = consulta.map(registro => {
              return {
                  id_registros: registro.id_registros,
                  titulo: registro.titulo,
                  resumen: registro.resumen,
                  usuario: registro.usuario, // Información del usuario que creó el registro
                  asesores: registro.asesores.map(asesor => {
                      return {
                          id_asesor_reg: asesor.id_asesor_reg,
                          id_perfil_datosgen: asesor.id_perfil_datosgen,
                          idusuario: asesor.perfil_datosgen.idusuario,
                          usuario: asesor.perfil_datosgen.usuario,
                          perfil: asesor.perfil_datosgen.perfil.perfiles // Aquí agregamos la información del perfil
                      };
                  })
              };
          });

          res.json(resultado);
      } else {
          res.status(404).json({ message: "No se encontraron registros con asesores." });
      }
  } catch (error) {
      console.error("Error al realizar la consulta:", error);
      res.status(500).json({ message: "Error en la consulta.", error });
  }
});



router.get('/consulta/filtrar', async (req, res) => {
  const { id_asesor } = req.query; // Obtener ID del asesor desde query params
  try {
    const whereAsesor = id_asesor
      ? { '$asesores.perfil_datosgen.usuario.idusuario$': id_asesor } // Filtra por asesor si existe
      : {};

    const consulta = await require('../model/registro').findAll({
      attributes: ['id_registros', 'titulo', 'resumen'],
      include: [
        {
          model: require('../model/usuario'),
          as: 'usuario', // Usuario que creó el registro
          attributes: ['nombre', 'paterno', 'materno'],
        },
        {
          model: require('../model/asesor_reg'),
          as: 'asesores',
          where: {
            id_registros: { [Op.ne]: null }, // Asegura que haya asesores
            ...whereAsesor, // Agrega el filtro por asesor si existe
          },
          include: [
            {
              model: require('../model/perfil_datosgen'),
              as: 'perfil_datosgen',
              include: [
                {
                  model: require('../model/usuario'),
                  as: 'usuario',
                  attributes: ['idusuario', 'nombre', 'paterno', 'materno'],
                },
                {
                  model: require('../model/perfil'),
                  as: 'perfil',
                  attributes: ['perfiles'],
                },
              ],
            },
          ],
        },
      ],
    });

    if (consulta.length > 0) {
      const resultado = consulta.map((registro) => ({
        id_registros: registro.id_registros,
        titulo: registro.titulo,
        resumen: registro.resumen,
        usuario: registro.usuario,
        asesores: registro.asesores.map((asesor) => ({
          id_asesor_reg: asesor.id_asesor_reg,
          id_perfil_datosgen: asesor.id_perfil_datosgen,
          idusuario: asesor.perfil_datosgen.usuario.idusuario,
          usuario: asesor.perfil_datosgen.usuario,
          perfil: asesor.perfil_datosgen.perfil.perfiles,
        })),
      }));

      res.json(resultado);
    } else {
      res.status(404).json({ message: "No se encontraron registros con asesores." });
    }
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ message: "Error en la consulta.", error });
  }
});


  module.exports = router;
