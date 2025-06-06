const router = require ("express").Router();
const Dias = require ( "../model/dia");
const express = require('express');
const app = express();


router.get('/consulta',async(req,res)=>{
  const consulta = await Dias.findAll()
  res.json(consulta)
})


router.get('/consulta/:nom', async (req, res) => {
  try {
    const dias = await Dias.findAll({
      attributes: ['id_dia', 'descripcion'],
    });

    res.json(dias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los días ', error });
  }
}); 


    router.post("/crear", async (req, res) => {
        const datos = req.body;
      
        try {
          // Obtener el último ID y sumarle 1
          const ultimoDia = await Dias.findOne({
            order: [["id_dia", "DESC"]],
          });
      
          let nuevoRegistro = 1; // Valor inicial si no hay RegistroUsuario en la base de datos
      
          if (ultimoDia) {
            nuevoRegistro = ultimoDia.id_dia + 1;
          }
      
          // Crear el nuevo perfil con el ID calculado
          const nuevoDia = await Dias.create({
            id_dia: nuevoRegistro,
            descripcion: datos.descripcion,
          });
      
          res.status(201).json({
            ok: true,
            status: 201,
            message: "Dia creado correctamente",
            body: nuevoDia,
          });
        } catch (error) {
          console.error("Error al crear dia", error);
          res
            .status(500)
            .json({ error: "Error interno del servidor al crear dia" });
        }
      });

      router.put('/actualizar/:id_dia', async (req, res) => {
        const id = req.params.id_dia;
        const datos = req.body;
        try {
            const update = await Dias.update({
                descripcion: datos.descripcion,
            }, {
                where: {
                    id_dia: id,
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Día actualizado correctamente',
                body: update
            });
        } catch (error) {
            console.error('Error al actualizar día', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
    

      router.delete("/eliminar/:id_dia", async (req, res) => {
        const id = req.params.id_dia;
        try {
          // Asegúrate de que la columna primaria sea idusuario
          const borrar = await Dias.destroy({
            where: {
              id_dia: id, // Usa solo la columna primaria para la búsqueda
            },
          });
      
          if (borrar) {
            res.status(204).json({
              ok: true,
              status: 204,
              message: "Perfil eliminado correctamente",
              body: borrar,
            });
          } else {
            res.status(404).json({
              ok: false,
              status: 404,
              message: "Usuario no encontrado",
            });
          }
        } catch (error) {
          console.error("Error al eliminar dia", error);
          res.status(500).json({ error: "Error interno del servidor" });
        }
      });

module.exports = router;