const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class contacto_evento extends Model{}

contacto_evento.init({
    id_contacto:{
    type: DataTypes.INTEGER,
  
    primaryKey: true,
    allowNull:false
    },
    telefono:{
        type: DataTypes.STRING(15),
    },
    facebook:{
        type:DataTypes.STRING
    },
   
},{ 
   sequelize,
   modelName: "contacto_evento",  
   timestamps: false, 
   freezeTableName: true,
}
);
module.exports =contacto_evento;




