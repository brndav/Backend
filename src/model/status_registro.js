const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class status_registro extends Model{}

status_registro.init({
    id_status:{
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
   modelName: "status_registro",  
   timestamps: false, 
   freezeTableName: true,
  
});


module.exports =status_registro;








