const router = require ("express").Router();
const Tipo_pago = require ( "../model/tipo_pago");
const express = require('express');
const app = express();




router.get('/consulta', async (req, res) => {
    try {
        const consulta = await Tipo_pago.findAll();
        res.status(200).json(consulta);
    } catch (error) {
        console.error('Error al consultar el tipo de pago', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.get('/consulta/descrip',async(req,res)=>{
    const consulta = await Tipo_pago.findAll({
        attributes:['idtipo_pago','opciones']
    });
    res.json(consulta)
    });


router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimoTipoPago = await Tipo_pago.findOne({
            order: [['idtipo_pago', 'DESC']]
        });

        let nuevoIdTipoPago = 1; // Valor inicial si no hay linea en la base de datos

        if (ultimoTipoPago) {
            nuevoIdTipoPago = ultimoTipoPago.idtipo_pago + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevoTipoPago = await Tipo_pago.create({
            idtipo_pago: nuevoIdTipoPago,
            opciones: datos.opciones,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Tipo Pago creada correctamente',
            body: nuevoTipoPago
        });
    } catch (error) {
        console.error('Error al crear Tipo Pago', error);
        res.status(500).json({ error: 'Error interno del servidor al crear linea' });
    }
});


    router.put('/actualizar/:idtipo_pago', async (req, res) => {
        const id = req.params.idtipo_pago;
        const datos = req.body;
        try {
            const update = await Tipo_pago.update({
                opciones: datos.opciones,
            }, {
                where: {
                    idtipo_pago: id,
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Tipo Pago actualizada correctamente',
                body: update
            });
        } catch (error) {
            console.error('Error al actualizar tipo pago', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

router.delete('/eliminar/:idtipo_pago', async (req, res) => {
    const id = req.params.idtipo_pago;
    const borrar = await Tipo_pago.destroy({
        where: {
            idtipo_pago: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        message: 'tipo pago eliminada correctamente',
        body: borrar
    });
});


module.exports = router;