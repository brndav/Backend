const router = require ("express").Router();
const perfil_datosgen = require ( "../model/perfil_datosgen");
const perfiles = require ( "../model/perfil");
const Usuarios = require("../model/usuario");
const Sequelize = require('sequelize');
const express = require('express');
const app = express();


router.get('/consulta', async (req, res) => {
    try {
        const consulta = await  perfil_datosgen.findAll();
        res.status(200).json(consulta);
    } catch (error) {
        console.error('Error al consultar perfil_usuario', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
  
router.post('/crear', async (req, res) => {
    const datos = req.body;

    try {
        // Verificar si el usuario ya tiene este perfil asignado
        const perfilExistente = await perfil_datosgen.findOne({
            where: {
                idusuario: datos.idusuario,
                id_perfil: datos.id_perfil
            }
        });

        // Si el perfil ya está asignado, devuelve un error
        if (perfilExistente) {
            return res.status(400).json({
                msg: 'Este usuario ya tiene asignado este perfil'
            });
        }

        // Obtener el último ID de perfil y sumarle 1
        const ultimoPerfil_datosgen = await perfil_datosgen.findOne({
            order: [['id_perfil_datosgen', 'DESC']]
        });

        let nuevoIdPerfil_datosgen = 1; // Valor inicial si no hay perfiles en la base de datos

        if (ultimoPerfil_datosgen) {
            nuevoIdPerfil_datosgen = ultimoPerfil_datosgen.id_perfil_datosgen + 1;
        }

        // Crear el nuevo perfil con el ID calculado
        const nuevoPerfil_datosgen = await perfil_datosgen.create({
            id_perfil_datosgen: nuevoIdPerfil_datosgen,
            idusuario: datos.idusuario,
            id_perfil: datos.id_perfil
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Perfil asignado correctamente',
            body: nuevoPerfil_datosgen
        });
    } catch (error) {
        console.error('Error al asignar perfil', error);
        res.status(500).json({ error: 'Error interno del servidor al asignar perfil' });
    }
});


router.put('/actualizar/:id_perfil_datosgen', async (req, res) => {
    const id = req.params.id_perfil_datosgen;
    const datos = req.body;
    try {
        const update = await  perfil_datosgen.update({
            idusuario: datos.idusuario,
            id_perfil: datos.id_perfil
        }, {
            where: {
                id_perfil_datosgen: id,
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

router.delete('/eliminar/:id_perfil_datosgen', async (req, res) => {
    const id = req.params.id_perfil_datosgen;
    try {
        const borrar = await  perfil_datosgen.destroy({
            where: {
                id_perfil_datosgen: id,
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




////////////////// muestra los perfiles que tiene ese usuario 
router.get('/consulta/perfil', async (req, res) => {
    try {
        const userId = req.query.idusuario; // Obtener el ID de usuario desde el query parameter

        // Comprueba si se ha proporcionado un userId
        if (!userId) {
            return res.status(400).json({ msg: 'ID de usuario no proporcionado' });
        }

        // Busca los perfiles en la base de datos utilizando el ID de usuario
        const perfiles = await perfil_datosgen.findAll({
          where: { idusuario: userId }, // Filtrar por idusuario
          include: [
            {
              model: require("../model/perfil"),
              as: 'perfil',
              attributes: ['id_perfil', 'perfiles'] 
            },
            {
                model: require("../model/usuario"),
                as: 'usuario',
                attributes: ['idusuario'] 
            },
          ],
        });

       /*   if (!perfiles || perfiles.length === 0) {
             return res.status(404).json({ msg: 'No se encontraron perfiles para el usuario logueado' });
         } */
        res.json(perfiles);
    } catch (error) {
        // console.error("Error al obtener los perfiles del usuario logueado", error);
        res.status(500).json({ msg: "Error del servidor" });
    }
});


/////muestra usuarios que son asesores en el registro de concurso
router.get('/consulta/perfil-asesor', async (req, res) => {
    try {
        // Busca los usuarios que solo tengan el perfil de asesor
        const usuariosAsesor = await perfil_datosgen.findAll({
            include: [
                {
                    model: require("../model/perfil"),
                    as: 'perfil',
                    attributes: ['id_perfil', 'perfiles'],
                    where: {
                        perfiles: 'Asesor' // Filtra por el perfil de Asesor
                    }
                },
                {
                    model: require("../model/usuario"),
                    as: 'usuario',
                    attributes: ['idusuario', 'nombre', 'paterno', 'materno'] // Solo trae los campos deseados
                },
            ],
             attributes: [
              'id_perfil_datosgen']
        });

        if (!usuariosAsesor || usuariosAsesor.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron usuarios con el perfil de asesor' });
        }

        res.json(usuariosAsesor);
    } catch (error) {
        console.error("Error al obtener los usuarios con el perfil de asesor", error.message);
        res.status(500).json({ msg: `Error del servidor: ${error.message}` });
    }
});


//////////////// filtracion de registros por medio del perfil vista admin asignacion perfil 
router.get('/consulta/regperfil', async (req, res) => {
    try {
        const idPerfil = req.query.id_perfil; // Obtener el id_perfil de la consulta

        // Si no se proporciona id_perfil
        if (!idPerfil) {
            return res.status(400).json({ msg: 'ID de perfil no proporcionado' });
        }
        // Realiza la consulta en la base de datos con el id_perfil
        const asignaciones = await perfil_datosgen.findAll({
            where: { id_perfil: idPerfil },  // Filtra por id_perfil
            include: [
                {
                    model: require("../model/perfil"),
                    as: 'perfil',
                    attributes: ['id_perfil', 'perfiles'] // Incluir el perfil en la respuesta
                },
                {
                    model: require("../model/usuario"),
                    as: 'usuario',
                    attributes: ['idusuario'] // Incluir el usuario en la respuesta
                },
            ],
        });

        // Si no se encuentra ninguna asignación
        if (!asignaciones || asignaciones.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron asignaciones para el perfil' });
        }

        res.json(asignaciones); // Retorna las asignaciones encontradas
    } catch (error) {
        console.error("Error al obtener las asignaciones", error);
        res.status(500).json({ msg: "Error del servidor" });
    }
});


/////muestra usuarios que son evaluadores en vista admi evaluador
router.get('/consulta/perfil-evaluador', async (req, res) => {
    try {
        // Busca los usuarios que solo tengan el perfil de asesor
        const usuariosAsesor = await perfil_datosgen.findAll({
            include: [
                {
                    model: require("../model/perfil"),
                    as: 'perfil',
                    attributes: ['id_perfil', 'perfiles'],
                    where: {
                        perfiles: 'Evaluador' // Filtra por el perfil de Asesor
                    }
                },
                {
                    model: require("../model/usuario"),
                    as: 'usuario',
                    attributes: ['idusuario', 'nombre', 'paterno', 'materno'] // Solo trae los campos deseados
                },
            ],
             attributes: [
              'id_perfil_datosgen']
        });

        if (!usuariosAsesor || usuariosAsesor.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron usuarios con el perfil de asesor' });
        }

        res.json(usuariosAsesor);
    } catch (error) {
        console.error("Error al obtener los usuarios con el perfil de asesor", error.message);
        res.status(500).json({ msg: `Error del servidor: ${error.message}` });
    }
});

module.exports = router;