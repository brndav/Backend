const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_app","tese","1234",{
    host:"45.79.198.62",dialect:"mysql",port:"3306"});

class programasr extends Model{}

programasr.init({
    idprograma_registro:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false
    },
    id_horario_dia:{
        type:DataTypes.INTEGER
    },
    id_registro:{
        type:DataTypes.INTEGER
    }

  
},{ 
   sequelize,
   modelName: "programa_registro",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
}
);
module.exports =programasr;







async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();