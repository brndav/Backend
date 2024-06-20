const router = require ("express").Router();
const Evaluadors = require ( "../model/evaluador.model");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
    const consulta = await Evaluadors.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.get('/consulta/:idevaluador',async(req,res)=>{
    const id = req.params.idevaluador;
    const consulta = await Evaluadors.findOne({
        where: {idevaluador:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Evaluadors.sync();
    const crear = await Evaluadors.create({
        idevaluador: datos.idevaluador,
        id_usuario: datos.id_usuario,
        id_articulo: datos.id_articulo,
        aprobado: datos.aprobado
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:idevaluador', async(req,res)=>{
    const id= req.params.idevaluador;
    const datos=req.body;
    const update = await Evaluadors.update({
        
        idevaluador: datos.idevaluador,
        id_usuario: datos.id_usuario,
        id_articulo: datos.id_articulo,
        aprobado: datos.aprobado
        
    },
    {
        where: {
            idevaluador:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:idevaluador', async (req, res) => {
    const id = req.params.idevaluador;
    const borrar = await Evaluadors.destroy({
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