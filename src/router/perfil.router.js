const router = require ("express").Router();
const perfiles = require ( "../model/perfil");
const express = require('express');
const app = express();


router.get('/consulta', async (req, res) => {
    try {
        const consulta = await perfiles.findAll();
        res.status(200).json(consulta);
    } catch (error) {
        console.error('Error al consultar perfiles', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.get('/consulta/:nom', async (req, res) => {
    const perfil = await perfiles.findAll({
      attributes: ['id_perfil', 'perfiles', 'estatus_perfil'] // solo necesitamos el ID y el nombre
    });
    res.json(perfil);
  });

///////////consulta registros ponencia
  router.get('/con/:id', async (req, res) => {
    const { id } = req.params;  // Obtener el id_perfil desde los parámetros
    const perfil = await perfiles.findOne({
      where: {
        id_perfil: id  // Buscar el perfil por su id_perfil
      },
      attributes: ['id_perfil', 'perfiles', 'estatus_perfil']  // Solo obtenemos id_perfil, perfiles y estatus_perfil
    });
  
    if (perfil) {
      res.json(perfil);  // Devuelve el perfil encontrado
    } else {
      res.status(404).json({ message: 'Perfil no encontrado' });
    }
  });
  


router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Obtener el último ID y sumarle 1
        const ultimoPerfil = await perfiles.findOne({
            order: [['id_perfil', 'DESC']]
        });

        let nuevoIdPerfil = 1; // Valor inicial si no hay perfiles en la base de datos

        if (ultimoPerfil) {
            nuevoIdPerfil = ultimoPerfil.id_perfil + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevoPerfil = await perfiles.create({
            id_perfil: nuevoIdPerfil,
            perfiles: datos.perfiles,
            estatus_perfil: datos.estatus_perfil
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Perfil creado correctamente',
            body: nuevoPerfil
        });
    } catch (error) {
        console.error('Error al crear perfil', error);
        res.status(500).json({ error: 'Error interno del servidor al crear perfil' });
    }
});

router.put('/actualizar/:id_perfil', async (req, res) => {
    const id = req.params.id_perfil;
    const datos = req.body;
    try {
        const update = await perfiles.update({
            perfiles: datos.perfiles,
            estatus_perfil: datos.estatus_perfil
        }, {
            where: {
                id_perfil: id,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Perfil actualizado correctamente',
            body: update
        });
    } catch (error) {
        console.error('Error al actualizar perfil', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/eliminar/:id_perfil', async (req, res) => {
    const id = req.params.id_perfil;
    try {
        const borrar = await perfiles.destroy({
            where: {
                id_perfil: id,
            },
        });
        res.status(204).json({
            ok: true,
            status: 204,
            message: 'Perfil eliminado correctamente',
            body: borrar
        });
    } catch (error) {
        console.error('Error al eliminar perfil', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = router;