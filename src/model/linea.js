const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class lineas extends Model{}

lineas.init({
    id_linea:{
    type: DataTypes.INTEGER,
  
    primaryKey: true,
    allowNull:false,
    autoIncrement:true
    },
    descripcion_linea:{
        type:DataTypes.INTEGER
    },
  
   
  
},{ 
   sequelize,
   modelName: "lineas",  
   timestamps: false, 
   freezeTableName: true,
  
});


module.exports =lineas;







