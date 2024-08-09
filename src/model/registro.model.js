const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_bd","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

class registros extends Model{}

registros.init({
    id_registros:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false,
    autoIncrement: true
    },
    titulo:{
        type:DataTypes.STRING
    },
    resumen:{
        type:DataTypes.STRING
    },
    abstract:{
        type:DataTypes.STRING
    },
    resena_curricular:{
        type:DataTypes.STRING
    },
    foto:{
        type:DataTypes.STRING
    },
    idusuario:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    id_actividad_cat:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    id_linea_eje:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    id_forma:{
        type:DataTypes.INTEGER   
        
    },
    id_modalidad:{
        type:DataTypes.INTEGER          
    }

},{ 
   sequelize,
   modelName: "registros",  
   timestamps: false, 
   freezeTableName: true,
   
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
 