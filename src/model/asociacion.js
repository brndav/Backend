const Autor = require('./autores');
const Usuarios = require('./usuario');

Usuarios.belongsTo(Autor, { foreignKey: 'idusuario' });
Autor.belongsTo(Usuarios, { foreignKey: 'idusuario' });