const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');



class institucions extends Model{}

institucions.init({
    id_institucion:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false
    },
    nombreinst:{
        type:DataTypes.STRING
    },
    logo:{
        type:DataTypes.STRING
    },
    link:{
        type:DataTypes.STRING

    }
},{ 
   sequelize,
   modelName: "institucions",  
   timestamps: false, 
   freezeTableName: true,
   
}
);


module.exports = institucions;





