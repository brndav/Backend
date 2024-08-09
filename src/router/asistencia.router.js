const router = require ("express").Router();
const Asistencias = require ("../model/asistencia.model");
const express = require ("express");
const app = express();

router.get('/consulta',async(req,res)=>{
    const consulta = await Asistencias.findAll()
    res.json(consulta)
    
})

router.get('/consulta/:id_asistencia',async(req,res)=>{
      const id = req.params.id_asistencia;
         const consulta = await Asistencias.findOne({
             where: {id_asistencia:id}
            
            
            
         })
         res.json(consulta)
       
 })

 router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Asistencias.sync();
    const crear = await Asistencias.create({

      id_asistencia: datos.id_asistencia,
      id_actividad: datos.id_actividad,
      idusuario: datos.idusuario
        
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_asistencia', async(req,res)=>{
    const id= req.params.id_asistencia;
    const datos=req.body;
    const update = await Asistencias.update({
        
        id_asistencia: datos.id_asistencia,
        id_actividad: datos.id_actividad,
        idusuario: datos.idusuario
    },
    {
        where: {
            id_asistencia:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_asistencia', async (req, res) => {
    const id = req.params.id_asistencia;
    const borrar = await Asistencias.destroy({
        where: {
            id_asistencia: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;
