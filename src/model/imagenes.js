const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class imagenes extends Model{}

imagenes.init({
    id_imagen:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false
    },
    id_evento:{
        type:DataTypes.INTEGER
    },
    titulo:{
        type:DataTypes.STRING
    },
    imagen:{
        type:DataTypes.STRING
    },



  
},{ 
   sequelize,
   modelName: "imagenes",  
   timestamps: false, 
   freezeTableName: true,
   
}
);
module.exports =imagenes;


imagenes.belongsTo(require ('./evento'), {  as: 'evento',foreignKey: 'id_evento' });




