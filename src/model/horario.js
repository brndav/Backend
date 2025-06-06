const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class horarios extends Model{}

horarios.init({
    id_horario:{
    type: DataTypes.INTEGER,
   autoIncrement: true,
    primaryKey: true,
    allowNull:false
    },
    horario_inicio:{
        type:DataTypes.TIME
    },
    horario_fin:{
        type:DataTypes.TIME
    }

  
},{ 
   sequelize,
   modelName: "horarios",  
   timestamps: false, 
   freezeTableName: true,
   
}
);
module.exports =horarios;







