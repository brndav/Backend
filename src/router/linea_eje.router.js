const router = require ("express").Router();
const Linea_eje = require ( "../model/linea_eje");
const Ejes= require ( "../model/ejes");
const Linea = require ( "../model/linea");
const express = require('express');
const app = express();
const { Op } = require('sequelize');



router.get('/consulta',async(req,res)=>{
    const consulta = await Linea_eje.findAll()
    res.json(consulta)
      
    })
   router.get('/consulta/:nom', async (req, res) => {
    try {
        const consulta = await Linea_eje.findAll({
            include: [
                { model: Linea, attributes: ['descripcion_linea'] },
                { model: Ejes, attributes: ['descripcion_eje'] }
            ]
        });
        res.json(consulta);
    } catch (error) {
        console.error('Error al consultar Linea Eje', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } 
      });


router.get('/consulta/:id_linea_eje',async(req,res)=>{
    const id = req.params.id_linea_eje;
    const consulta = await Linea_eje.findOne({
        where: {id_linea_eje:id}
    })
    res.json(consulta)
       /*  ok:true,
        status:200,
        body:consulta */
    })
l=[]
router.get('/ejes/filtrar/:id_linea', async (req, res) => {
  const idLinea = req.params.id_linea;
  try {
      // Obtener todos los registros de `linea_eje` con el `id_linea` seleccionado
      const ejesIds = await Linea_eje.findAll({
          attributes: ['id_eje'], // Solo obtener los IDs de ejes
          where: { id_linea: idLinea },
          raw: true
      });

      // Extraer los IDs de ejes de los resultados
      const ejesIdsArray = ejesIds.map(eje => eje.id_eje);

      // Obtener los ejes que tienen esos IDs
      const ejesFiltrados = await Ejes.findAll({
          where: {
              id_eje: {
                  [Op.in]: ejesIdsArray
              }
          }
      });

      res.json(ejesFiltrados);
  } catch (error) {
      console.error('Error al filtrar ejes por línea', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

    router.post("/crear", async (req, res) => {
        const datos = req.body;
      
        try {
          // Obtener el último ID y sumarle 1
          const ultimoLineaEje = await Linea_eje.findOne({
            order: [["id_linea_eje", "DESC"]],
          });
      
          let nuevoRegistro = 1; // Valor inicial si no hay RegistroUsuario en la base de datos
      
          if (ultimoLineaEje) {
            nuevoRegistro = ultimoLineaEje.id_linea_eje + 1;
          }
          // Crear el nuevo perfil con el ID calculado
          const nuevoLineaEje = await Linea_eje.create({
            id_linea_eje: nuevoRegistro,
            id_linea: datos.id_linea,
            id_eje: datos.id_eje,
          });
      
          res.status(201).json({
            ok: true,
            status: 201,
            message: "Linea Eje creado correctamente",
            body: nuevoLineaEje,
          });
        } catch (error) {
          console.error("Error al crear Linea Eje", error);
          res
            .status(500)
            .json({ error: "Error interno del servidor al crear Linea Eje" });
        }
      });


      router.put('/actualizar/:id_linea_eje', async (req, res) => {
        const id = req.params.id_linea_eje;
        const datos = req.body;
        try {
            const update = await Linea_eje.update({
                id_eje: datos.id_eje,
                id_linea: datos.id_linea,
            }, {
                where: {
                    id_linea_eje: id,
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Linea Eje actualizado correctamente',
                body: update
            });
        } catch (error) {
            console.error('Error al actualizar Linea Eje', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

router.delete('/eliminar/:id_linea_eje', async (req, res) => {
    const id = req.params.id_linea_eje;
    const borrar = await Linea_eje.destroy({
        where: {
            id_linea_eje: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});






///////////////////filtracion brenda////////////////////
router.get('/filtrar/:id_linea', async (req, res) => {
    const idLinea = req.params.id_linea;
  
    try {
      const lineasEjes = await Linea_eje.findAll({
        where: {
          id_linea: idLinea
        },
        include: [
          {
            model: Ejes,
            as: 'eje',
            attributes: ['id_eje', 'descripcion_eje']
          }
        ]
      });
  
      res.json(lineasEjes);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching data' });
    }
  });





module.exports = router;