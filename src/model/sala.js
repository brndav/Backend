const { Sequelize, DataTypes, Model } = require('sequelize');

const { sequelize } = require('./conexionbd');

class salas extends Model{}

salas.init({
    id_sala:{
    type: DataTypes.INTEGER,
  
    primaryKey: true,
    allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING
    }

  
},{ 
   sequelize,
   modelName: "salas",  
   timestamps: false, 
   freezeTableName: true,
   
}
);
module.exports =salas;







