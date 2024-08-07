const router = require ("express").Router();
const Usuariosp = require ( "../model/usuariosp.model");
const express = require('express');
const app = express();




router.get('/consulta',async(req,res)=>{
    const consulta = await Usuariosp.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.get('/consulta/:id_usuario_perfil',async(req,res)=>{
    const id = req.params.id_usuario_perfil;
    const consulta = await Usuariosp.findOne({
        where: {id_usuario_perfil:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Usuariosp.sync();
    const crear = await Usuariosp.create({

        id_usuario_perfil: datos.id_usuario_perfil,
        idusuario: datos.idusuario,
        id_perfil: datos.id_perfil
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_usuario_perfil', async(req,res)=>{
    const id= req.params.id_usuario_perfil;
    const datos=req.body;
    const update = await Usuariosp.update({
        
        id_usuario_perfil: datos.id_usuario_perfil,
        idusuario: datos.idusuario,
        id_perfil: datos.id_perfil,
    },
    {
        where: {
            id_usuario_perfil:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_usuario_perfil', async (req, res) => {
    const id = req.params.id_usuario_perfil;
    const borrar = await Usuariosp.destroy({
        where: {
            id_usuario_perfil: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});



router.post('/usuario_perfil', async (req, res) => {
    const datos = req.body;
    try {
        // Sincroniza el modelo con la base de datos si es necesario
        await Usuariosp.sync();
        // Crea una nueva asociación en la base de datos
        const crear = await Usuariosp.create({
            idusuario: datos.idusuario,
            id_perfil: datos.id_perfil
        });
        
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Perfil vinculado exitosamente",
            body: crear
        });
    } catch (error) {
        console.error('Error creando asociación:', error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error creando asociación',
            error: error.message
        });
    }
});

module.exports = router;