const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_app","tese","1234",{
    host:"45.79.198.62",dialect:"mysql",port:"3306"});

class usuarios extends Model{}

usuarios.init({
    idusuario:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false,
    autoIncrement: true

    },
    nombre:{
        type:DataTypes.STRING
    },
    paterno:{
        type:DataTypes.STRING
    },
    materno:{
        
        type:DataTypes.STRING
    },
    telefono:{
        type:DataTypes.STRING
    },
    correo:{
        type:DataTypes.STRING
    },
    contrasena:{
        type:DataTypes.STRING,
        allowNull:true
    },
    id_institucion:{
        type:DataTypes.INTEGER
    }

},{ 
   sequelize,
   modelName: "usuarios",  
   timestamps: false, 
   freezeTableName: true,
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
}
);
module.exports = usuarios;







async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();