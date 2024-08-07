const router = require ("express").Router();
const  Programas= require ( "../model/programa.model");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
    const consulta = await Programas.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.get('/consulta/:idprograma_registro',async(req,res)=>{
    const id = req.params.idprograma_registro;
    const consulta = await Programas.findOne({
        where: {idprograma_registro:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Programas.sync();
    const crear = await Programas.create({

        idprograma_registro: datos.idprograma_registro,
        id_horario_dia: datos.id_horario_dia,
        id_registro: datos.id_registro
       
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:idprograma_registro', async(req,res)=>{
    const id= req.params.idprograma_registro;
    const datos=req.body;
    const update = await Programas.update({
        
        idprograma_registro: datos.idprograma_registro,
        id_horario_dia: datos.id_horario_dia,
        id_registro: datos.id_registro
        
    },
    {
        where: {
            idprograma_registro:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:idprograma_registro', async (req, res) => {
    const id = req.params.idprograma_registro;
    const borrar = await Programas.destroy({
        where: {
            idprograma_registro: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;