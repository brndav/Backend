const router = require ("express").Router();
const Pagos = require ("../model/pagos.model");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
    const consulta = await Pagos.findAll()
    res.json(consulta)
      
    })

    router.post('/crear', async (req, res) => {
        const datos = req.body;
        await Pagos.sync();
        const crear = await Pagos.create({
    
            id_pagos: datos.id_pagos,
            voucher: datos.voucher,
            num_referencia: datos.num_referencia,
            idusuario: datos.idusuario,
            idtipo_membresia: datos.idtipo_membresia,

            
            
        })
    
        res.status(200).json({
            ok:true,
            status:200,
            message:"Registro creado",
            body:crear
        })
    })
    router.put ('/actualizar/id_pagos', async(req,res)=>{
        const id= req.params.id_pagos;
        const datos=req.body;
        const update = await Pagos.update({

            id_pagos: datos.id_pagos,
            voucher: datos.voucher,
            num_referencia: datos.num_referencia,
            idusuario: datos.idusuario,
            idtipo_membresia: datos.idtipo_membresia,
        },
        {
            where: {
                id_pagos:id,
            },
         });
         res.status(201).json({
            ok:true,
            status:200,
            body:update
    
        })
    });
    router.delete('/eliminar/:id_pagos', async (req, res) => {
        const id = req.params.id_pagos;
        const borrar = await Pagos.destroy({
            where: {
                id_pagos: id,
            },
        });
        res.status(200).json({
            ok: true,
            status: 204,
            body: borrar
        });
    });
    
    
    module.exports = router;