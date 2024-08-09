const router = require ("express").Router();
const Ejes = require ( "../model/ejes.model");
const express = require('express');
const Linea_eje = require("../model/linea_eje.model");
const linea_eje = require("../model/linea_eje.model");

const app = express();


router.get('/consulta',async(req,res)=>{
    const consulta = await Ejes.findAll()
    res.json(consulta)
      
    })
    router.get('/consulta/ejes',async(req,res)=>{
        const id = req.body.id_linea
        const consulta = await linea_eje.findAll({
            where: {id_linea:id}
        })
        res.json(consulta)
        })
    

router.get('/consulta/descrip',async(req,res)=>{
    const consulta = await Ejes.findAll({
        attributes: ['id_eje','descripcion_eje']
    });        

    res.json(consulta)
    

});

router.get('/consulta/cate', async(req,res)=>{ 
    const categoria =await Ejes.findAll({
        attributes: ['id_linea', 'descripcion_eje']
    });
    res.json(categoria)
})
router.get('/subcategorias/:id_linea', async (req, res) => {
 
    const subcategorias = await Ejes.findAll({
  
      include: [{
        model: Linea_eje,
        where: {
          id_linea: {
  
            [Op.in]: (sequelize.query(`SELECT id_linea FROM linea WHERE id_linea  = ${id_linea}`))
  
          }
  
        }
  
      }]
  
    });
  
    res.json(subcategorias);
  
  });



  router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimoEje = await Ejes.findOne({
            order: [['id_eje', 'DESC']]
        });

        let nuevoIdEje = 1; // Valor inicial si no hay eje en la base de datos

        if (ultimoEje) {
            nuevoIdEje = ultimoEje.id_eje + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevoEje = await Ejes.create({
            id_eje: nuevoIdEje,
            descripcion_eje: datos.descripcion_eje,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Eje creado correctamente',
            body: nuevoEje
        });
    } catch (error) {
        console.error('Error al crear eje', error);
        res.status(500).json({ error: 'Error interno del servidor al crear eje' });
    }
});

router.put('/actualizar/:id_eje', async (req, res) => {
    const id = req.params.id_eje;
    const datos = req.body;
    try {
        const update = await Ejes.update({
            descripcion_eje: datos.descripcion_eje,
        }, {
            where: {
                id_eje: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Eje actualizado correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar eje', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/eliminar/:id_eje', async (req, res) => {
    const id = req.params.id_eje;
    const borrar = await Ejes.destroy({
        where: {
            id_eje: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;