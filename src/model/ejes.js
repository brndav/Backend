const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class ejes extends Model{}

ejes.init({
    id_eje:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false,
    autoIncrement:true
    },
   
    descripcion_eje:{
        type:DataTypes.STRING
    },
  
   
  
},{ 
   sequelize,
   modelName: "ejes",  
   timestamps: false, 
   freezeTableName: true,
  
});


module.exports =ejes;








