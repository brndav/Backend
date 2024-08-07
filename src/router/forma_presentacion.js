const router = require ("express").Router();
const Formapre =require ("../model/forma_presentacion");
const express = require('express');
const app = express();

router.get('/consulta',async(req,res)=>{
    const consulta = await Formapre.findAll()
    res.json(consulta)
})
router.get('/consulta/descrip', async (req, res) => {
    const descripcion  = await Formapre.findAll({
      attributes: ['id_forma', 'descripcion'] // solo necesitamos el ID y el nombre
    });
    res.json(descripcion);
  });
  router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Formapre.sync();
    const crear = await Formapre.create({

     id_forma: datos.id_forma,
     descripcion: datos.descripcion,         
     })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_forma', async(req,res)=>{
    const id= req.params.id_forma;
    const datos=req.body;
    const update = await Formapre.update({
        
     id_forma: datos.id_forma,
     descripcion: datos.descripcion,
    },
    {
        where: {
            id_forma:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_forma', async (req, res) => {
    const id = req.params.id_forma;
    const borrar = await Formapre.destroy({
        where: {
            id_forma: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;
