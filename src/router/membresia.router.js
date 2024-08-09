const router = require ("express").Router();
const Membresias = require ("../model/membresia.model");
const express =require ("express");
const app =express();

router.get('/consulta', async (req, res) => {
    const consulta = await Membresias.findAll()
    res.json(consulta)
})

router.get('/consulta/:idtipo_membresia', async (req, res)=>{
    const id = req.params.idtipo_membresia;
    const consulta = await Membresias.findOne({
        where: {idtipo_membresia:id}
    })
    res.json(consulta)
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Membresias.sync();
    const crear = await Membresias.create({

       idtipo_membresia: datos.idtipo_membresia,
       opciones: datos.opciones
        
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:idtipo_membresia', async(req,res)=>{
    const id= req.params.idtipo_membresia;
    const datos=req.body;
    const update = await Membresias.update({
        
        idtipo_membresia: datos.idtipo_membresia,
       opciones: datos.opciones
    },
    {
        where: {
            idtipo_membresia:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:idtipo_membresia', async (req, res) => {
    const id = req.params.idtipo_membresia;
    const borrar = await Membresias.destroy({
        where: {
            idtipo_membresia: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;
