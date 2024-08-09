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
    // await Registros.sync();
    const crear = await Registros.create({

        id_registros: datos.id_registros,
        titulo: datos.titulo,
        resumen: datos.resumen,
        abstract: datos.abstract,
        resena_curricular: datos.resena_curricular,
        foto: datos.foto,
        idusuario: datos.id_usuario,
        id_actividad_cat: datos.id_actividad_cat,
        id_linea_eje: datos.id_linea_eje,
        id_forma: datos.id_forma,
       id_modalidad: datos.id_modalidad
        
    })

    res.status(201).json({
        ok:true,
        status:201,
        message:"Registro creado",
        body:crear
        

    })
    
})

router.put ('/actualizar/:id_registros', async(req,res)=>{
    const id= req.params.id_registros;
    const datos=req.body;
    const update = await Registros.update({
        
        id_registros: datos.id_registros,
        titulo: datos.titulo,
        resumen: datos.resumen,
        abstract: datos.abstract,
        resena_curricular: datos.resena_curricular,
        foto: datos.foto,
        idusuario: datos.id_usuario,
        id_actividad_cat: datos.id_actividad_cat,
        id_linea_eje: datos.id_linea_eje,
       id_forma: datos.id_forma,
       id_modalidad: datos.id_modalidad

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
