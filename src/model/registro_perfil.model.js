const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_bd","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

class registro_perfil extends Model{}

registro_perfil.init({
    id_registro_perfil:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
    allowNull:false
    },
    id_registros:{
        type:DataTypes.INTEGER
    },
    id_perfil:{
        type:DataTypes.INTEGER
    }
  
},{ 
   sequelize,
   modelName: "usuario_perfil",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
}
);
module.exports =registro_perfil;







async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();