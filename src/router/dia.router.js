const router = require ("express").Router();
const Dias = require ( "../model/dia.model");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
    const consulta = await Dias.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.get('/consulta/:id_dia',async(req,res)=>{
    const id = req.params.id_dia;
    const consulta = await Dias.findOne({
        where: {id_dia:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Dias.sync();
    const crear = await Dias.create({

        id_dia: datos.id_dia,
        descripcion: datos.descripcion,
        id_evento: datos.id_evento
       
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_dia', async(req,res)=>{
    const id= req.params.id_dia;
    const datos=req.body;
    const update = await Dias.update({
        
        id_dia: datos.id_dia,
        descripcion: datos.descripcion,
        id_evento: datos.id_evento
        
    },
    {
        where: {
            id_dia:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_dia', async (req, res) => {
    const id = req.params.id_dia;
    const borrar = await Dias.destroy({
        where: {
            id_dia: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;