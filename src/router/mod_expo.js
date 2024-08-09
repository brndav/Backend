const router = require ("express").Router();
const Modexpo = require ("../model/mod_expo");
const express = require ('express');
const app = express();

router.get('/consulta',async(req,res)=>{
    const consulta = await Modexpo.findAll()
    res.json(consulta)
})
router.get('/consulta/:descrip', async (req, res) => {
    const exposicion = await Modexpo.findAll({
      attributes: ['id_modalidad', 'descripcion'] // solo necesitamos el ID y el nombre
    });
    res.json(exposicion);
  });
  router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Modexpo.sync();
    const crear = await Modexpo.create({

     id_modalidad: datos.id_modalidad,
     descripcion: datos.descripcion,
     
        
        
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_modalidad', async(req,res)=>{
    const id= req.params.id_modalidad;
    const datos=req.body;
    const update = await Modexpo.update({
        
     id_modalidad: datos.id_modalidad,
     descripcion: datos.descripcion,
    },
    {
        where: {
            id_modalidad:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_modalidad', async (req, res) => {
    const id = req.params.id_modalidad;
    const borrar = await Modexpo.destroy({
        where: {
            id_modalidad: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;

