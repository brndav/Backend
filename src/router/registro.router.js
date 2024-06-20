const router = require ("express").Router();
const Registros = require ( "../model/registro.model");
const express = require('express');
const app = express();




router.get('/consulta',async(req,res)=>{
    const consulta = await Registros.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.get('/consulta/:id_registros',async(req,res)=>{
    const id = req.params.id_registros;
    const consulta = await Registros.findOne({
        where: {id_registros:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Registros.sync();
    const crear = await Registros.create({

        id_registros: datos.id_registros,
        id_actividad_cat: datos.id_actividad_cat,
        nom_pres: datos.nom_pres,
        descripcion: datos.descripcion,
        abstract: datos.abstract
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_registros', async(req,res)=>{
    const id= req.params.id_registros;
    const datos=req.body;
    const update = await Registros.update({
        
        id_registros: datos.id_registros,
        id_actividad_cat: datos.id_actividad_cat,
        nom_pres: datos.nom_pres,
        descripcion: datos.descripcion,
        abstract: datos.abstract
    },
    {
        where: {
            id_registros:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_registros', async (req, res) => {
    const id = req.params.id_registros;
    const borrar = await Registros.destroy({
        where: {
            id_registros: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;
