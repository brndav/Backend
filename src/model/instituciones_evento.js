const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');
    
class instituciones_evento extends Model{}

instituciones_evento.init({
    id_instituciones_evento:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull:false
    },
    id_institucion:{
        type:DataTypes.INTEGER
    }, 
    id_evento:{
        type:DataTypes.INTEGER
    }, 
  
},{ 
   sequelize,
   modelName: "instituciones_evento",  
   timestamps: false, 
   freezeTableName: true,
  
}
);

instituciones_evento.belongsTo(require ('./institucion'), {  as: 'institucion',foreignKey: 'id_institucion' });
instituciones_evento.belongsTo(require ('./evento'), {  as: 'evento',foreignKey: 'id_evento' });

module.exports =instituciones_evento;

