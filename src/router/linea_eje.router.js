const router = require ("express").Router();
const Linea_eje = require ( "../model/linea_eje.model");
const Ejes= require ( "../model/ejes.model");
const Linea = require ( "../model/linea.model");
const express = require('express');
const app = express();





router.get('/consulta',async(req,res)=>{
    const consulta = await Linea_eje.findAll()
    res.json(consulta)
      
    })


router.get('/consulta/:id_linea_eje',async(req,res)=>{
    const id = req.params.id_linea_eje;
    const consulta = await Linea_eje.findOne({
        where: {id_linea_eje:id}
    })
    res.json(consulta)
       /*  ok:true,
        status:200,
        body:consulta */
    })
l=[]
    router.get('/filtrar/:id_linea', async (req, res) => {

        const idLinea = req.params.id_linea;
        const idEje = req.params.id_eje;

     try{
        const lineasEjes = await Linea_eje.findAll({
        
          // const ejes = await Ejes.findAll({
     
          where: {
            id_linea: idLinea        
      
          },
          include: [

            {
    
              model: Ejes,
    
              as: 'eje',
              attributes: [ 'descripcion_eje']
    
            }
          ]
    
        });
    
    
        // console.log(lineasEjes)
        // l= lineasEjes.eje
        // console.log(l); 
        // // const descripcionEjes = lineasEjes.toArray(lineaEje => lineaEje.eje.descripcion_eje);
        // const descripcionEjes = lineasEjes.map(lineaEje => lineaEje.eje).pluck('descripcion_eje');
        // console.log(descripcionEjes);
         res.json(lineasEjes);

        
      } catch (error) {
    
        console.error(error);
    
        res.status(500).json({ message: 'Error fetching data' });
    
      }
    
    });
   
      

router.post('/crear', async (req, res) => {
    const datos = req.body;
    await Linea_eje.sync();
    const crear = await Linea_eje.create({

        id_linea_eje: datos.id_linea_eje,
        id_eje: datos.id_eje,
        id_linea: datos.id_linea,
        idusuario: datos.idusuario,
   
        
        
    })

    res.status(200).json({
        ok:true,
        status:200,
        message:"Registro creado",
        body:crear
    })
})


router.put ('/actualizar/:id_linea_eje', async(req,res)=>{
    const id= req.params.id_linea_eje;
    const datos=req.body;
    const update = await Linea_eje.update({
        
        id_linea_eje: datos.id_linea_eje,
        id_eje: datos.id_eje,
        id_linea: datos.id_linea,
        idusuario: datos.idusuario,
    },
    {
        where: {
            id_linea_eje:id,
        },
     });
     res.status(201).json({
        ok:true,
        status:200,
        body:update

    })
});
router.delete('/eliminar/:id_linea_eje', async (req, res) => {
    const id = req.params.id_linea_eje;
    const borrar = await Linea_eje.destroy({
        where: {
            id_linea_eje: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: borrar
    });
});


module.exports = router;