const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_app","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

class actividades extends Model{}

actividades.init({
    id_actividad:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false
    },
    opciones:{
        type:DataTypes.STRING
    }
  
},{ 
   sequelize,
   modelName: "actividades",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
}
);
module.exports =actividades;







async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();