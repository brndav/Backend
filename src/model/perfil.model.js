const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_bd","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

class perfiles extends Model{}

perfiles.init({
    id_perfil:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull:false
    },
    perfiles:{
        type:DataTypes.STRING
    },
    estatus_perfil: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  
},{ 
   sequelize,
   modelName: "perfiles",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
}
);
module.exports =perfiles;







async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();