const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_app","tese","1234",{
    host:"45.79.198.62",dialect:"mysql",port:"3306"});

class registros extends Model{}

registros.init({
    id_registros:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false
    },
    id_actividad_cat:{
        type:DataTypes.INTEGER
    },
    nom_pres:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    abstract:{
        type:DataTypes.STRING
    }
},{ 
   sequelize,
   modelName: "registros",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
}
);
module.exports =registros;







async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();