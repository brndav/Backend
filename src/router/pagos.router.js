const router = require ("express").Router();
const Pagos = require ("../model/pagos");
const express = require('express');
const app = express();
const moment = require('moment');


router.get('/consulta',async(req,res)=>{
    const consulta = await Pagos.findAll()
    res.json(consulta)
      
    })
   

        router.post('/crear', async (req, res) => {
          try {
            const { num_referencia, idusuario, idtipo_pago } = req.body; // Asegúrate de extraer idtipo_pago
            
            // Verificar que los campos requeridos estén presentes
            if (!num_referencia || !idusuario || !idtipo_pago) {
              return res.status(400).json({
                ok: false,
                message: 'Faltan datos requeridos.'
              });
            }
        
            // Obtener la fecha y hora actual
            const fecha_hora = moment().format('YYYY-MM-DD HH:mm:ss');
        
            // Crear un nuevo pago
            const nuevoPago = await Pagos.create({
              num_referencia,
              idusuario,
              fecha_hora,
              idtipo_pago  // Ahora se usa el valor recibido de req.body
            });
        
            // Responder con éxito
            res.status(201).json({
              ok: true,
              status: 201,
              message: 'Pago creado exitosamente',
              body: nuevoPago
            });
          } catch (error) {
            console.error('Error al crear el pago:', error);
            res.status(500).json({
              ok: false,
              message: 'Error al crear el pago'
            });
          }
        });
        
    router.put ('/actualizar/id_pagos', async(req,res)=>{
        const id= req.params.id_pagos;
        const datos=req.body;
        const update = await Pagos.update({

            id_pagos: datos.id_pagos,
            num_referencia: datos.num_referencia,
            idusuario: datos.idusuario,
            idtipo_pago:datos.idtipo_pago
       
          },
        {
            where: {
                id_pagos:id,
            },
         });
         res.status(201).json({
            ok:true,
            status:200,
            body:update
    
        })
    });
    router.delete('/eliminar/:id_pagos', async (req, res) => {
        const id = req.params.id_pagos;
        const borrar = await Pagos.destroy({
            where: {
                id_pagos: id,
            },
        });
        res.status(200).json({
            ok: true,
            status: 204,
            body: borrar
        });
    });
    
    
    router.get('/consulta/descrip', async (req, res) => {
      try {
        const pagos = await Pagos.findAll({
          include: [
            {
              model: require('../model/usuario'),
              as: 'usuario',
              attributes: ['nombre', 'paterno', 'materno'] // Atributos que quieres mostrar
            },
            {
              model: require('../model/tipo_pago'),
              as: 'tipo_pago',
              attributes: ['idtipo_pago', 'opciones']
            },
          ],
          attributes: [
            'id_pagos', 
            'num_referencia', 
            'idusuario', 
            'fecha_hora',
            'idtipo_pago'
          ]
          });
  
            if (pagos.length > 0) {
              res.status(200).json(pagos);
            }
          } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
          }
        });



        /////////pagos por usuario en componente registrar mi pago 
    router.get('/consulta/pagousu/:idusuario', async (req, res) => {
      const { idusuario } = req.params; // Obtenemos el idusuario de los parámetros de la URL
    
      try {
        const pagos = await Pagos.findAll({
          where: { idusuario: idusuario }, // Filtra por idusuario
          include: [
            {
              model: require('../model/usuario'),
              as: 'usuario',
              attributes: ['nombre', 'paterno', 'materno'] // Atributos que quieres mostrar
            },
            {
              model: require('../model/tipo_pago'),
              as: 'tipo_pago',
              attributes: ['idtipo_pago', 'opciones']
            },
          ],
          attributes: [
            'id_pagos', 
            'num_referencia', 
            'idusuario', 
            'fecha_hora',
            'idtipo_pago'
          ]
          });
  
            if (pagos.length > 0) {
              res.status(200).json(pagos);
            }
          } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
          }
        });


    module.exports = router;