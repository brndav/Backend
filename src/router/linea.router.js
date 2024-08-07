const router = require ("express").Router();
const Lineas = require ( "../model/linea.model");
const express = require('express');
const app = express();




router.get('/consulta',async(req,res)=>{
    const consulta = await Lineas.findAll()
    res.json(consulta)
      
    })


router.get('/consulta/descrip',async(req,res)=>{
    const consulta = await Lineas.findAll({
        attributes:['id_linea','descripcion_linea']
    });
    res.json(consulta)
    });




router.put ('/actualizar/:id_linea', async(req,res)=>{
    const id= req.params.id_linea;
    const datos=req.body;
    const update = await Lineas.update({
        
        id_linea: datos.id_linea,
        descripcion_linea: datos. descripcion_linea
    },
    {
        where: {
            id_linea:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
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
        body: borrar
    });
});


module.exports = router;