const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_bd","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

class institucions extends Model{}

institucions.init({
    id_institucion:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false
    },
    nombreinst:{
        type:DataTypes.STRING
    },
    logo:{
        type:DataTypes.STRING
    },
    link:{
        type:DataTypes.STRING

    }
},{ 
   sequelize,
   modelName: "institucions",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
}
);
module.exports = institucions;



















async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();