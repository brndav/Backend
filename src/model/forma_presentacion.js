const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_app","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

class formapres extends Model{}

formapres.init({

    id_forma:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false,
    autoIncrement:true
    },

    descripcion:{
        type:DataTypes.STRING
    },
  
   
  
},{ 
   sequelize,
   modelName: "forma_presentacion",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
}
);
module.exports =formapres;







async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();