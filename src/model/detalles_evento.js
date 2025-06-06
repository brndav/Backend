const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class detalles_evento extends Model{}

detalles_evento.init({
    id_detalles_evento:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false
    },
    id_evento:{
        type:DataTypes.INTEGER
    },
    id_imagen:{
        type:DataTypes.INTEGER
    },
    titulo:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.TEXT
    },



  
},{ 
   sequelize,
   modelName: "detalles_evento",  
   timestamps: false, 
   freezeTableName: true,
  
}
);
module.exports =detalles_evento;


detalles_evento.belongsTo(require ('./evento'), {  as: 'evento',foreignKey: 'id_evento' });
detalles_evento.belongsTo(require ('./imagenes'), {  as: 'imagen',foreignKey: 'id_imagen' });



