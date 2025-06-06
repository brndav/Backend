const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');
    
class dia_evento extends Model{}

dia_evento.init({
    id_dia_evento:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull:false
    },
    id_dia:{
        type:DataTypes.INTEGER
    }, 
    id_evento:{
        type:DataTypes.INTEGER
    }, 
  
},{ 
   sequelize,
   modelName: "dia_evento",  
   timestamps: false, 
   freezeTableName: true,
   
}
);

dia_evento.belongsTo(require ('./dia'), {  as: 'dia',foreignKey: 'id_dia' });
dia_evento.belongsTo(require ('./evento'), {  as: 'evento',foreignKey: 'id_evento' });

module.exports =dia_evento;

