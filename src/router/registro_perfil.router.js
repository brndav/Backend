const router = require ("express").Router();
const Registro_perfil = require ( "../model/registro_perfil.model");
const express = require('express');
const app = express();




router.get('/consulta',async(req,res)=>{
    const consulta = await Registro_perfil.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.get('/consulta/:id_registro_perfil',async(req,res)=>{
    const id = req.params.id_registro_perfil;
    const consulta = await Registro_perfil.findOne({
        where: {id_registro_perfil:id}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body:consulta
    })
})

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Registro_perfil.sync();
    const crear = await Registro_perfil.create({

        id_registro_perfil: datos.id_registro_perfil,
        id_registros: datos.id_registros,
        id_perfil: datos.id_perfil
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})

router.put ('/actualizar/:id_registro_perfil', async(req,res)=>{
    const id= req.params.id_registro_perfil;
    const datos=req.body;
    const update = await Registro_perfil.update({
        
        id_registro_perfil: datos.id_registro_perfil,
        id_registros: datos.id_registros,
        id_perfil: datos.id_perfil,
    },
    {
        where: {
            id_registro_perfil:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_registro_perfil', async (req, res) => {
    const id = req.params.id_registro_perfil;
    const borrar = await Registro_perfil.destroy({
        where: {
            id_registro_perfil: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});



router.post('/registro_perfil', async (req, res) => {
    const datos = req.body;
    try {
        // Sincroniza el modelo con la base de datos si es necesario
        await Registro_perfil.sync();
        // Crea una nueva asociación en la base de datos
        const crear = await Registro_perfil.create({
            id_registros: datos.id_registros,
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