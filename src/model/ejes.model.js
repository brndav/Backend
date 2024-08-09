const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_bd","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

class ejes extends Model{}

ejes.init({
    id_eje:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false,
    autoIncrement:true
    },
   
    descripcion_eje:{
        type:DataTypes.STRING
    },
  
   
  
},{ 
   sequelize,
   modelName: "ejes",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
});


module.exports =ejes;








async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();