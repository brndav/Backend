const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class perfil_datosgen extends Model{}

perfil_datosgen.init({
    id_perfil_datosgen:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull:false
    },
    idusuario:{
        type:DataTypes.STRING
    },
    id_perfil: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  
},{ 
   sequelize,
   modelName: "perfil_datosgen",  
   timestamps: false, 
   freezeTableName: true,
   
}
);

const  perfiles = require('./perfil');
perfil_datosgen.belongsTo(perfiles, { foreignKey: 'id_perfil', as: 'perfil' });

const usuarios  = require('./usuario');
perfil_datosgen.belongsTo(usuarios, { foreignKey: 'idusuario', as: 'usuario' });


module.exports =perfil_datosgen;







