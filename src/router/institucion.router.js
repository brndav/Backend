const router = require ("express").Router();
const Instituciones = require ( "../model/institucion.model");
const express = require('express');
const app = express();




router.get('/consulta',async(req,res)=>{
    const consulta = await Instituciones.findAll()
    res.json(consulta)
    /* res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    }) */
})

// router.get('/consulta/:id_instituciones',async(req,res)=>{
//     const id = req.params.id_instituciones;
//     const consulta = await Instituciones.findOne({
//         where: {id_institucion:id}
        
        
        
//     })
//     res.json(consulta)
   
//     })
router.get('/consulta/nom', async (req, res) => {
    const instituciones = await Instituciones.findAll({
      attributes: ['id_institucion', 'nombreinst'] // solo necesitamos el ID y el nombre
    });
    res.json(instituciones);
  });

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Instituciones.sync();
    const crear = await Instituciones.create({

        id_institucion: datos.id_institucion,
        nombreinst: datos.nombreinst,
        logo: datos.logo,
        link: datos.link,
        
        
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_instituciones', async(req,res)=>{
    const id= req.params.id_instituciones;
    const datos=req.body;
    const update = await Instituciones.update({
        
        nombreinst: datos.nombreinst,
        logo: datos.logo,
        link: datos.link
    },
    {
        where: {
            id_institucion:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_instituciones', async (req, res) => {
    const id = req.params.id_instituciones;
    const borrar = await Instituciones.destroy({
        where: {
            id_institucion: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;
