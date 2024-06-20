const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_app","tese","1234",{
    host:"45.79.198.62",dialect:"mysql",port:"3306"});

class dias extends Model{}

dias.init({
    id_dia:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING
    },
    id_evento:{
        type:DataTypes.INTEGER
    }

  
},{ 
   sequelize,
   modelName: "dias",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
}
);
module.exports =dias;







async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();