const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_bd","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

class evaluadors extends Model{}

evaluadors.init({
    idevaluador:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false
    },
    id_usuario:{
        type:DataTypes.INTEGER
    },
    id_articulo:{
        type:DataTypes.INTEGER
    },
    aprobado:{
        type:DataTypes.STRING
    },
   
  
},{ 
   sequelize,
   modelName: "evaluador",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
}
);
module.exports =evaluadors;







async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();