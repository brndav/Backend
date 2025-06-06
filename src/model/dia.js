const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');
    
class dias extends Model{}

dias.init({
    id_dia:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false
    },
    descripcion:{
        type:DataTypes.DATE
    }

  
},{ 
   sequelize,
   modelName: "dias",  
   timestamps: false, 
   freezeTableName: true,
   
}
);



module.exports =dias;

