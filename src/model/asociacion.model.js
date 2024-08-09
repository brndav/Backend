const Autor = require('../model/autores.model');
const Usuarios = require('../model/usuario.model');

Usuarios.belongsTo(Autor, { foreignKey: 'idusuario' });
Autor.belongsTo(Usuarios, { foreignKey: 'idusuario' });