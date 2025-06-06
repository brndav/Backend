const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../model/conexionbd');

class formapres extends Model{}

formapres.init({

    id_forma:{
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
   modelName: "forma_presentacion",  
   timestamps: false, 
   freezeTableName: true,
  
}
);
module.exports =formapres;







