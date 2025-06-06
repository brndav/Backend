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

    try {
        // Obtener el último ID y sumarle 1
        const ultimaForma = await Formapre.findOne({
            order: [['id_forma', 'DESC']]
        });

        let nuevoIdForma = 1; // Valor inicial si no hay linea en la base de datos

        if (ultimaForma) {
            nuevoIdForma = ultimaForma.id_forma + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevaForma = await Formapre.create({
            id_forma: nuevoIdForma,
            descripcion: datos.descripcion,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Forma creada correctamente',
            body: nuevaForma
        });
    } catch (error) {
        console.error('Error al crear forma', error);
        res.status(500).json({ error: 'Error interno del servidor al crear linea' });
    }
});


router.put('/actualizar/:id_forma', async (req, res) => {
    const id = req.params.id_forma;
    const datos = req.body;
    try {
        const update = await Formapre.update({
            descripcion: datos.descripcion,
        }, {
            where: {
                id_forma: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Forma actualizada correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar forma', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
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
