const router = require ("express").Router();
const Usuarios = require ( "../model/usuario.model");
const express = require('express');
const app = express();




router.get('/consulta',async(req,res)=>{
    const consulta = await Usuarios.findAll()
    res.json(consulta)


        /* ok:true,
        status:200,
        body:consulta
    }) */
})

router.get('/usuario/:idusuario',async(req,res)=>{
    const id = req.params.idusuario;
    const consulta = await Usuarios.findOne({
        where: {idusuario:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
        
    })
})

router.post('/usuario', async (req, res) => {
    const datos = req.body;
    await Usuarios.sync();
    const crear = await Usuarios.create({

        idusuario: datos.idusuario,
        nombre: datos.nombre,
        paterno: datos.paterno,
        materno: datos.materno,
        telefono: datos.telefono,
        correo: datos.correo,
        contrasena: datos.contrasena,
        id_institucion: datos.id_institucion
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/usuario/:idusuario', async(req,res)=>{
    const id= req.params.idusuario;
    const datos=req.body;
    const update = await Usuarios.update({
        
        idusuario: datos.idusuario,
        nombre: datos.nombre,
        paterno: datos.paterno,
        materno: datos.materno,
        telefono: datos.telefono,
        correo: datos.correo,
        contrasena: datos.contrasena,
        id_institucion: datos.id_institucion
    },
    {
        where: {
            idusuario:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/usuario/:idusuario', async (req, res) => {
    const id = req.params.idusuario;
    const borrar = await Usuarios.destroy({
        where: {
            idusuario: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;
