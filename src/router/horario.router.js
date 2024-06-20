const router = require ("express").Router();
const Horarios = require ( "../model/horario.model");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
    const consulta = await Horarios.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.get('/consulta/:id_horario',async(req,res)=>{
    const id = req.params.id_horario;
    const consulta = await Horarios.findOne({
        where: {id_horario:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Horarios.sync();
    const crear = await Horarios.create({

        id_horario: datos.id_horario,
        horario_inicio: datos.horario_inicio,
        horario_fin: datos.horario_fin
        
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_horario', async(req,res)=>{
    const id= req.params.id_horario;
    const datos=req.body;
    const update = await Horarios.update({
        
        id_horario: datos.id_horario,
        horario_inicio: datos.horario_inicio,
        horario_fin: datos.horario_fin
        
    },
    {
        where: {
            id_horario:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_horario', async (req, res) => {
    const id = req.params.id_horario;
    const borrar = await Horarios.destroy({
        where: {
            id_horario: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;