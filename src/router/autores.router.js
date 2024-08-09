const router= require ("express").Router();
const Autor = require ("../model/autores.model");
const Usuarios = require ("../model/usuario.model")
const express = require ("express");
require('../model/asociacion.model');
const app = express();

 router.get('/consulta', async ( req,res) => {
    const autores = await Autor.findAll()
      res.json(autores);
}); 

router.post("/crear", async (req, res) => { 
  try {
      const { idusuario } = req.body;

   
      
      const usuario = await Usuarios.findByPk(idusuario);
      if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Crear un nuevo autor con idusuario y nombre
      const nuevo = new Autor({ idusuario });
      await nuevo.save(); 

      res.status(201).json({ message: 'Autor agregado con éxito', autor: nuevo });
  } catch (error) {
      res.status(500).json({ message: 'Error al agregar el autor', error: error.message });
  }
});

router.delete("/:id_autores", async (req, res) => {
  try {
    
    const { id_autores } = req.params;

    
    const autor = await Autor.findByPk(id_autores);

    
    if (!autor) {
        return res.status(404).json({ msg: `No existe un autor con el id ${id_autores}`,
        });
    }

    await autor.destroy();

   
    res.json({
        msg: 'El autor fue eliminado con éxito!'
    });
} catch (error) {
    
    res.status(500).json({
        msg: 'Error al eliminar el autor',
        error: error.message
    });
}
});

router.get("/detalles", async (req, res) => {
 try {
  const autores = await Autor.findAll({
      include: [
          {
              model: Usuarios,
              attributes: ['nombre', 'paterno', 'materno']  // 
          }
      ]
  });

  res.json(autores);
} catch (error) {
  res.status(500).json({
      msg: 'Error al obtener los autores',
      error: error.message
  });
}
});

module.exports = router;