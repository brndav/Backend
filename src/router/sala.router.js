const router = require ("express").Router();
const Salas = require ( "../model/sala.model");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
    const consulta = await Salas.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.get('/consulta/:id_sala',async(req,res)=>{
    const id = req.params.id_sala;
    const consulta = await Salas.findOne({
        where: {id_sala:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Salas.sync();
    const crear = await Salas.create({

        id_sala: datos.id_sala,
        descripcion: datos.descripcion,
        
       
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_sala', async(req,res)=>{
    const id= req.params.id_sala;
    const datos=req.body;
    const update = await Salas.update({
        
        id_sala: datos.id_sala,
        descripcion: datos.descripcion,
       
        
    },
    {
        where: {
            id_sala:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_sala', async (req, res) => {
    const id = req.params.id_sala;
    const borrar = await Salas.destroy({
        where: {
            id_sala: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;