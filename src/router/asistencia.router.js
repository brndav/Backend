const router = require ("express").Router();
const Asistencias = require ("../model/asistencia");
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

router.post("/crear", async (req, res) => {
    const datos = req.body;
  
    try {
      // Obtener el último ID y sumarle 1
      const ultimaAsistencia = await Asistencias.findOne({
        order: [["id_asistencia", "DESC"]],
      });
  
      let nuevoRegistro = 1; // Valor inicial si no hay RegistroUsuario en la base de datos
  
      if (ultimaAsistencia) {
        nuevoRegistro = ultimaAsistencia.id_asistencia + 1;
      }
  
      // Crear el nuevo perfil con el ID calculado
      const nuevaAsistencia= await Asistencias.create({
        id_asistencia: datos.id_asistencia,
        id_programa_registro: datos.id_programa_registro,
        idusuario: datos.idusuario
      });
  
      res.status(201).json({
        ok: true,
        status: 201,
        message: "Linea Eje creado correctamente",
        body: nuevaAsistencia,
      });
    } catch (error) {
      console.error("Error al crear Asistencia", error);
      res
        .status(500)
        .json({ error: "Error interno del servidor al crear Asistencia" });
    }
  });


  router.put('/actualizar/:id_asistencia', async (req, res) => {
    const id = req.params.id_asistencia;
    const datos = req.body;
    try {
        const update = await Asistencias.update({
          id_programa_registro: datos.id_programa_registro,
            idusuario: datos.idusuario
        }, {
            where: {
                id_asistencia: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Asistencia actualizado correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar Asistencia', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
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
