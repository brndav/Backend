const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../model/conexionbd');

class modexpos extends Model{}

modexpos.init({

    id_modalidad:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false,
    autoIncrement:true
    },

    descripcion:{
        type:DataTypes.STRING
    },
  
   
  
},{ 
   sequelize,
   modelName: "modalidad_exposicion",  
   timestamps: false, 
   freezeTableName: true,
   
}
);
module.exports = modexpos;







