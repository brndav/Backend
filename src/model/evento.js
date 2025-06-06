const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class eventos extends Model{}

eventos.init({
    id_evento:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false
    },
    nombre:{
        type:DataTypes.STRING
    },
    id_direccion_evento:{
        type:DataTypes.INTEGER
    },
    id_contacto:{
        type:DataTypes.INTEGER
    },
    status:{
        type:DataTypes.INTEGER
    },


  
},{ 
   sequelize,
   modelName: "evento",  
   timestamps: false, 
   freezeTableName: true,
   
}
);
module.exports =eventos;



eventos.belongsTo(require ('./direccion_evento'), {  as: 'direccion',foreignKey: 'id_direccion_evento' });
eventos.belongsTo(require ('./contacto_evento'), {  as: 'contacto',foreignKey: 'id_contacto' });


