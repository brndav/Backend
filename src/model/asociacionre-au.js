const Autor = require ('./autores');
const Registro = require ('./registro');

// Un Registro tiene muchos Autores
Registro.hasMany(Autor, {
    foreignKey: 'id_registros'
  });
  
  // Un Autor pertenece a un Registro
  Autor.belongsTo(Registro, {
    foreignKey: 'id_registros'
   
  });