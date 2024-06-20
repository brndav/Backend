const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_app","tese","1234",{
    host:"45.79.198.62",dialect:"mysql",port:"3306"});

class usuariosp extends Model{}

usuariosp.init({
    id_usuario_perfil:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false
    },
    id_usuario:{
        type:DataTypes.INTEGER
    },
    id_perfil:{
        type:DataTypes.INTEGER
    },
    id_registro:{
        type:DataTypes.INTEGER
    },
    foto:{
        type:DataTypes.INTEGER
    },
  
},{ 
   sequelize,
   modelName: "usuario_perfil",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
}
);
module.exports =usuariosp;







async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();