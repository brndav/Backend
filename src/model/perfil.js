const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class perfiles extends Model{}

perfiles.init({
    id_perfil:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull:false
    },
    perfiles:{
        type:DataTypes.STRING
    },
    estatus_perfil: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  
},{ 
   sequelize,
   modelName: "perfiles",  
   timestamps: false, 
   freezeTableName: true,
   
}
);
module.exports =perfiles;







