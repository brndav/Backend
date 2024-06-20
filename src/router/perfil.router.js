const router = require ("express").Router();
const Perfiles = require ( "../model/perfil.model");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
    const consulta = await Perfiles.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.get('/consulta/:id_perfil',async(req,res)=>{
    const id = req.params.id_perfil;
    const consulta = await Perfiles.findOne({
        where: {id_perfil:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Perfiles.sync();
    const crear = await Perfiles.create({

        id_perfil: datos.id_perfil,
        perfiles: datos.perfiles
       
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_perfil', async(req,res)=>{
    const id= req.params.id_perfil;
    const datos=req.body;
    const update = await Perfiles.update({
        
        
        id_perfil: datos.id_perfil,
        perfiles: datos.perfiles
        
    },
    {
        where: {
            id_perfil:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_perfil', async (req, res) => {
    const id = req.params.id_perfil;
    const borrar = await Perfiles.destroy({
        where: {
            id_perfil: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;