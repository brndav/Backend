const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');
  const Usuarios = require("./usuario");
 
    class autores extends Model{}

 autores.init({
    id_autores: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       allowNull: false,
       autoIncrement: true
       },   
      
      idusuario: {
        type: DataTypes.INTEGER,
         allowNull: false,
       },
      id_registros: {
        type: DataTypes.INTEGER,
      },
      },{
        sequelize,
        modelName: 'autores',
        timestamps: false, 
        freezeTableName: true,
      });
      

autores.belongsTo(Usuarios, { foreignKey: 'idusuario' });
autores.belongsTo(require('./registro'), { as: 'registro', foreignKey: 'id_registros' });
module.exports=autores;

