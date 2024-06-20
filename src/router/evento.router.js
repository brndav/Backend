const router = require ("express").Router();
const Eventos = require ( "../model/evento.model");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
    const consulta = await Eventos.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.get('/consulta/:idevento',async(req,res)=>{
    const id = req.params.idevento;
    const consulta = await Eventos.findOne({
        where: {idevento:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Eventos.sync();
    const crear = await Eventos.create({

        idevento: datos.idevento,
        nombre: datos.nombre
        
       
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:idevento', async(req,res)=>{
    const id= req.params.idevento;
    const datos=req.body;
    const update = await Eventos.update({
        
        idevento: datos.idevento,
        nombre: datos.nombre,
        
        
    },
    {
        where: {
            idevento:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:idevento', async (req, res) => {
    const id = req.params.idevento;
    const borrar = await Eventos.destroy({
        where: {
            idevento: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;