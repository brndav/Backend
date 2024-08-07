const router = require ("express").Router();
const Horadias = require ( "../model/horadia.model");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
    const consulta = await Horadias.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.get('/consulta/:id_horario_dia',async(req,res)=>{
    const id = req.params.id_horario_dia;
    const consulta = await Horadias.findOne({
        where: {id_horario_dia:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Horadias.sync();
    const crear = await Horadias.create({

        id_horario_dia: datos.id_horario_dia,
        id_horario: datos.id_horario,
        id_dia: datos.id_dia,
        id_sala: datos.id_sala,
        actividad: datos.actividad
        
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_horario_dia', async(req,res)=>{
    const id= req.params.id_horario_dia;
    const datos=req.body;
    const update = await Horadias.update({

        id_horario_dia: datos.id_horario_dia,
        id_horario: datos.id_horario,
        id_dia: datos.id_dia,
        id_sala: datos.id_sala,
        actividad: datos.actividad
        
    },
    {
        where: {
            id_horario_dia:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_horario_dia', async (req, res) => {
    const id = req.params.id_horario_dia;
    const borrar = await Horadias.destroy({
        where: {
            id_horario_dia: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;