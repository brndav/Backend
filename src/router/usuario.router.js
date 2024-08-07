const express = require("express");
const router = express.Router();
const Usuarios = require("../model/usuario.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Cargar configuración del entorno

const SECRET_KEY = process.env.SECRET_KEY || 'q$L!j&WK+d*vFnWE'; 

router.get("/consulta", async (req, res) => {
  try {
    const consulta = await Usuarios.findAll();
    res.status(200).json(consulta);
  } catch (error) {
    console.error("Error al consultar RegistroUsuario", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/crear", async (req, res) => {
  const datos = req.body;

  try {
    // Obtener el último ID y sumarle 1
    const ultimoPerfil = await Usuarios.findOne({
      order: [["idusuario", "DESC"]],
    });

    let nuevoRegistro = 1; // Valor inicial si no hay RegistroUsuario en la base de datos

    if (ultimoPerfil) {
      nuevoRegistro = ultimoPerfil.idusuario + 1;
    }

    // Crear el nuevo perfil con el ID calculado
    const nuevoPerfil = await Usuarios.create({
      idusuario: nuevoRegistro,
      nombre: datos.nombre,
      paterno: datos.paterno,
      materno: datos.materno,
      telefono: datos.telefono,
      correo: datos.correo,
      contrasena: datos.contrasena,
      id_institucion: datos.id_institucion,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      message: "Perfil creado correctamente",
      body: nuevoPerfil,
    });
  } catch (error) {
    console.error("Error al crear perfil", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al crear perfil" });
  }
});

router.put("/actualizar/:idusuario", async (req, res) => {
  const id = req.params.idusuario;
  const datos = req.body;
  try {
    const update = await Usuarios.update(
      {
        RegistroUsuario: datos.RegistroUsuario,
        estatus_perfil: datos.estatus_perfil,
      },
      {
        where: {
          idusuario: id,
        },
      }
    );
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Perfil actualizado correctamente",
      body: update,
    });
  } catch (error) {
    console.error("Error al actualizar perfil", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/eliminar/:idusuario", async (req, res) => {
  const id = req.params.idusuario;
  try {
    const borrar = await Usuarios.destroy({
      where: {
        idusuario: id,
      },
    });
    res.status(204).json({
      ok: true,
      status: 204,
      message: "Perfil eliminado correctamente",
      body: borrar,
    });
  } catch (error) {
    console.error("Error al eliminar perfil", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        // Validamos si el usuario existe en la base de datos
        const usuario = await Usuarios.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(400).json({
                msg: `No existe un usuario con el correo ${correo} en la base de datos`
            });
        }

        // Validamos contraseña
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!contrasenaValida) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar token
        const token = jwt.sign({
          idusuario: usuario.idusuario, // Incluye el idusuario en el token
            correo: usuario.correo
        }, SECRET_KEY);

        // Devolver nombre completo del usuario junto con el mensaje de bienvenida y token
        const nombreCompleto = `${usuario.nombre} ${usuario.paterno} ${usuario.materno}`;
        res.json({
            msg: `Bienvenido, ${nombreCompleto}`,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
});


module.exports = router;