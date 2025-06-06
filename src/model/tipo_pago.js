const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class tipo_pago extends Model{}

tipo_pago.init({
    idtipo_pago:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false,
    autoIncrement:true
    },
   
    opciones:{
        type:DataTypes.STRING
    },
  
   
  
},{ 
   sequelize,
   modelName: "tipo_pago",  
   timestamps: false, 
   freezeTableName: true,
   
});


module.exports =tipo_pago;
