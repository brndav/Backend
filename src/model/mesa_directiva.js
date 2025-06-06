const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../model/conexionbd');
const Usuarios = require ('./usuario');

class mesadirectiva extends Model{}

mesadirectiva.init({
    id_mesadir:{
    type: DataTypes.INTEGER,
   autoIncrement: true,
    primaryKey: true,
    allowNull:false
    },
    idusuario:{
        type:DataTypes.STRING
    },
    puesto:{
        type:DataTypes.STRING
    },
    foto:{
        type: DataTypes.STRING
    }

  
},{ 
   sequelize,
   modelName: "mesa_directiva",  
   timestamps: false, 
   freezeTableName: true,

}
);
mesadirectiva.belongsTo(Usuarios, { foreignKey: "idusuario" });

module.exports = mesadirectiva;
