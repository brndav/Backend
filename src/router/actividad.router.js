const router = require ("express").Router();
const Actividades = require ( "../model/actividad.model");
const express = require('express');
const app = express();




router.get('/consulta',async(req,res)=>{
    const consulta = await Actividades.findAll()
    res.json(consulta)
})

router.get('/filtrar',async(req,res)=>{
    const actividad = await Actividades.findAll({
        attributes: ['id_actividad', 'opciones'] // solo necesitamos el ID y el nombre
      });
      res.json(actividad);
    });

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Actividades.sync();
    const crear = await Actividades.create({

        id_actividad: datos.id_actividad,
        opciones: datos.opciones
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_actividad', async(req,res)=>{
    const id= req.params.id_actividad;
    const datos=req.body;
    const update = await Actividades.update({
        
        id_actividad: datos.id_actividad,
        opciones: datos.opciones
    },
    {
        where: {
            id_actividad:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_actividad', async (req, res) => {
    const id = req.params.id_actividad;
    const borrar = await Actividades.destroy({
        where: {
            id_actividad: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;