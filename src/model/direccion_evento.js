const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class direccion_evento extends Model{}

direccion_evento.init({
    id_direccion_evento:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false
    },
    direccion:{
        type:DataTypes.STRING
    },
    liga:{
        type:DataTypes.TEXT
    },
   
},{ 
   sequelize,
   modelName: "direccion_evento",  
   timestamps: false, 
   freezeTableName: true,
}
);
module.exports =direccion_evento;




async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();