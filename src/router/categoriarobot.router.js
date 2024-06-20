const router = require ("express").Router();
const Categoriarobots = require ("../model/categoriarobot.model");
const express = require ("express");
const app = express();

router.get('/consulta',async(req,res)=>{
    const consulta = await Categoriarobots.findAll()
    res.json(consulta)
    /* res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    }) */
})

router.get('/consulta/:id_categoria',async(req,res)=>{
    const id = req.params.id_categoria;
    const consulta = await Categoriarobots.findOne({
        where: {id_categoria:id}
        
        
    })
    res.json(consulta)
    /* res.status(200).json({
        ok:true,
        status:200,
        body:consulta */
    })

    router.post('/crear', async (req, res) => {
        const datos = req.body;
        await Categoriarobots.sync();
        const crear = await Categoriarobots.create({
    
            id_categoria: datos.id_categoria,
            nombre: datos.nombre,
            
            
            
        })
    
        res.status(200).json({
            ok:true,
            status:200,
            message:"Registro creado",
            body:crear
        })
    })
    router.put ('/actualizar/:id_categoria', async(req,res)=>{
        const id= req.params.id_categoria;
        const datos=req.body;
        const update = await Categoriarobots.update({
            
            nombre: datos.nombre
        },
        {
            where: {
                id_categoria:id,
            },
         });
         res.status(201).json({
            ok:true,
            status:200,
            body:update
    
        })
    });
    router.delete('/eliminar/:id_categoria', async (req, res) => {
        const id = req.params.id_categoria;
        const borrar = await Categoriarobots.destroy({
            where: {
                id_categoria: id,
            },
        });
        res.status(200).json({
            ok: true,
            status: 204,
            body: borrar
        });
    });
    
    
    module.exports = router;
    
    
